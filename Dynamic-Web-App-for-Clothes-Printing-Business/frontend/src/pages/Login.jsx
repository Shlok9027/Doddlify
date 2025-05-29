import React, { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const [currState, setCurrState] = useState("Login");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        // console.log(response.data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          // navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        // console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          // navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-10 via-purple-200 to-indigo-200 text-white shadow-xl">
      <form
        onSubmit={onSubmitHandler}
        className="border-t-4 border-purple-600 p-8 sm:p-10 bg-gradient-to-br from-white via-purple-50 to-purple-200 shadow-xl 
        rounded-lg transition-all duration-500 ease-in-out hover:bg-gradient-to-br from-purple-400 via-indigo-300 to-purple-400 hover:shadow-2xl flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-14 gap-4 text-gray-900"
      >
        <div className="inline-flex items-center gap-2 mt-10">
          <p className="serif text-3xl font-bold text-purple-700 hover:text-indigo-400 transition-colors duration-300">
            {currState}
          </p>
          <hr className="border-none h-[2px] w-8 bg-gray-800 hover:w-12 transition-all duration-300" />
        </div>

        {currState !== "Login" && (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 bg-gradient-to-r from-gray-200 to-gray-400 rounded-md text-gray-900 placeholder-gray-700 
            focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-md"
            placeholder="Your Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className="w-full px-4 py-3 border border-gray-300 bg-gradient-to-r from-gray-200 to-gray-400 rounded-md text-gray-900 placeholder-gray-700 
          focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-md"
          placeholder="Email Address"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="w-full px-4 py-3 border border-gray-300 bg-gradient-to-r from-gray-200 to-gray-400 rounded-md text-gray-900 placeholder-gray-700 
          focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-indigo-400 transition-all duration-300 hover:shadow-md"
          placeholder="Password"
          required
        />

        <div className="w-full flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-indigo-500 transition duration-300">
            Forgot Password?
          </p>
          <p
            onClick={() =>
              setCurrState(currState === "Login" ? "Sign Up" : "Login")
            }
            className="cursor-pointer hover:text-green-500 transition duration-300"
          >
            {currState === "Login" ? "Create Account" : "Back to Login"}
          </p>
        </div>

        <button
          className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white font-semibold px-10 py-3 rounded-md shadow-md transition-all duration-500 
          hover:scale-110 hover:shadow-lg hover:from-purple-600 hover:via-blue-500 hover:to-indigo-500 hover:text-yellow-300 active:scale-95 active:shadow-inner flex items-center gap-2"
        >
          🚀 {currState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
