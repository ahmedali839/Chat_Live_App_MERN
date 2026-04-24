import "./App.css";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
// import ChatWindow from "./components/ChatWindow.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const userToken = localStorage.getItem("trtc_userID");
  return userToken ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Dashboard />
              </ProtectedRouter>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
