const API_BASE_URL = process.env.REACT_APP_API_URI;

console.log(API_BASE_URL);

export const loginAndGenerateUserSig = async (userID, nickName) => {
  try {
    console.log("before services");

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID, nickName }),
    });
    console.log("after services", response);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${data.error || "login Failed"}`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
