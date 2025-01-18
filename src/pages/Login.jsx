import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ redirectTo = "/" }) => {
  const [username, setUsername] = useState("");
  const [passKey, setPassKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // Access location state

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "admin" && passKey === "admin@corner") {
      localStorage.setItem("username", "admin");
      localStorage.setItem("password", "admin@corner");
      navigate("/adminDash");
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

      if (data.accessToken) {
        localStorage.setItem("username", user);
        localStorage.setItem("password", password);
        localStorage.setItem("accessToken", data.accessToken);

        // Determine redirection path
        const redirectPath = location.state?.redirectTo || redirectTo;
        navigate(redirectPath);
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
        Swal.fire({
          icon: "error",
          text: "Login failed. Please check your credentials!",
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      Swal.fire({
        icon: "error",
        text: "An error occurred. Please try again.",
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
