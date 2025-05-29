
import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(backendUrl + '/api/user/admin', {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 p-4">
      <div className="bg-gradient-to-br from-white via-purple-50 to-purple-200 shadow-xl rounded-xl px-10 py-8 max-w-md w-full border-t-4 border-purple-500 transition-all duration-500 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-purple-700 hover:text-indigo-500 transition-colors duration-300">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Email Address
            </p>
            <input
              type="email"
              placeholder="admin@doddle.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gradient-to-r from-gray-200 to-gray-300 
                         placeholder-gray-700 text-gray-800 border border-gray-300 outline-none 
                         focus:ring-2 focus:ring-purple-500 transition duration-300 hover:shadow-md"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Password</p>
            <input
              type="password"
              placeholder="Enter your secure password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gradient-to-r from-gray-200 to-gray-300 
                         placeholder-gray-700 text-gray-800 border border-gray-300 outline-none 
                         focus:ring-2 focus:ring-purple-500 transition duration-300 hover:shadow-md"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 
                       hover:from-purple-600 hover:via-blue-500 hover:to-indigo-600 
                       transition-all duration-500 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            🚀 Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
