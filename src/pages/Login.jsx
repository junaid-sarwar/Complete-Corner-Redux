import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login } from "../redux/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [passKey, setPassKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (username === "admin" && passKey === "admin@corner") {
      const adminData = { name: "Admin", role: "admin", token: "admin-token-123" };
      
      localStorage.setItem("accessToken", adminData.token);
      localStorage.setItem("user", JSON.stringify(adminData));
  
      dispatch(login(adminData));
      navigate("/adminDash");
      return;
    } else {
      await userCredential(username, passKey);
    }
  };  

  const userCredential = async (user, password) => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user,
          password: password,
          expiresInMins: 30,
        }),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (response.ok && data.accessToken) {  
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("username", data.username); 
  
        dispatch(
          login({
            user: { name: data.username, role: data.role || "user" },
            token: data.accessToken,
          })
        );
  
        navigate("/");
        window.location.reload();
      } else {
        throw new Error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      Swal.fire({
        icon: "error",
        text: error.message,
      });
    }
  };  

  return (
    <div className="container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border"
              placeholder="Enter Password"
              value={passKey}
              onChange={(e) => setPassKey(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="w-full bg-amber-300 text-black py-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
