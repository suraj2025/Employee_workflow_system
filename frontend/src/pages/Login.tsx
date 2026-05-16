import { useState } from "react";

import { useNavigate }
  from "react-router-dom";

import { toast }
  from "react-toastify";

import { loginUser }
  from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showSessionPopup, setShowSessionPopup] =
    useState(false);

  const [pendingCredentials, setPendingCredentials] =
    useState({
      email: "",
      password: "",
    });

  const handleLogin = async (
    forceLogin = false
  ) => {

    try {

      const response =
        await loginUser({

          email,
          password,
          forceLogin,
        });

        console.log(response);

      if (
        response.alreadyLoggedIn
      ) {

        setPendingCredentials({
          email,
          password,
        });

        setShowSessionPopup(true);

        return;
      }

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );

      localStorage.setItem(
        "loginTime",
        Date.now().toString()
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        "Invalid credentials"
      );
    }
  };

 const handleForceLogin =
  async () => {

    try {

      const response =
        await loginUser({

          email:
            pendingCredentials.email,

          password:
            pendingCredentials.password,

          forceLogin: true,
        });

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "refreshToken",
        response.refreshToken
      );

      localStorage.setItem(
        "loginTime",
        Date.now().toString()
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      toast.success(
        "Login successful"
      );

      setShowSessionPopup(false);

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        "Force login failed"
      );
    }
  };

  return (

    <div className="h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">

          Employee Workflow System

        </h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={() => handleLogin()}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >

          Login

        </button>
      </div>
        {
          showSessionPopup && (

            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

              <div className="bg-white p-8 rounded-2xl w-96">

                <h2 className="text-2xl font-bold mb-4">

                  Active Session Found

                </h2>

                <p className="mb-6">

                  User already logged in.
                  Continue and logout previous session?

                </p>

                <div className="flex justify-end gap-4">

                  <button
                    onClick={() =>
                      setShowSessionPopup(false)
                    }
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg"
                  >

                    Cancel

                  </button>

                  <button
                    onClick={handleForceLogin}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >

                    Continue Login

                  </button>

                </div>

              </div>

            </div>
          )
        }

    </div>
  );
}

export default Login;