const TSSigAPIV2 = require("tls-sig-api-v2");
const axios = require("axios");
const User = require("../models/userModel");

// Navigate function for generate User

const generateUserSig = (userId) => {
  const SDKAppID = parseInt(process.env.TRTC_APP_ID);
  const SDKSecretKey = process.env.TRTC_SECRET_KEY;
  if (!SDKAppID || !SDKSecretKey) {
    throw new Error("SDK configuration missing in env");
  }

  const api = new TSSigAPIV2.Api({ SDKAppID, SDKSecretKey });
  return api.genSig(userId, 15552000);
};

// helper function to create tencent server
const importUserToTencent = async (userId, nickName) => {
  try {
    const SDKAppID = parseInt(process.env.TRTC_APP_ID);
    const adminSig = generateUserSig("administrator");
    const random = Math.floor(Math.random() * 100000000);

    const url = `https://console.tim.qq.com/v4/im_open_login_svc/account_import?sdkappid=${SDKAppID}&identifier=administrator&usersig=${adminSig}&random=${random}&contenttype=json`;

    const response = await axios.postt(url, {
      UserID: userId,
      Nick: nickName || userId,
      FaceUrl: "",
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(`importUserToTencent failed: ${error.message} `);
  }
};

const loginAndGenerateUserSig = async (req, res) => {
  try {
    const { userID, nickName } = req.body;
    if (!userID)
      return res
        .status(400)
        .json({ success: false, message: "userID is required." });

    let user = await User.findOne({ userID });
    const freshSig = generateUserSig(userID);
    if (!freshSig) {
      user = await User.create({
        userID,
        userSig: freshSig,
        lastlogin: new Date(),
      });

      //2 Tecent server per import
      await importUserToTencent(userID, nickName);
    } else {
      user.userSig = freshSig;
      user.lastlogin = new Data();
      await user.save();
    }

    return res.status(200).json({
      success: true,
      user: {
        userID: user.userID,
        userSig: user.userSig,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {loginAndGenerateUserSig, }