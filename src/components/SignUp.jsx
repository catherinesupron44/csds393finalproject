//signup
import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithRedirect } from "aws-amplify/auth";
import { signUp } from 'aws-amplify/auth';
import { motion } from "framer-motion";

export default function SignUp() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    givenName: "",
    email: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, newPassword, givenName } = formData;

    if (newPassword !== formData.passwordConfirmation) {
      console.error("Passwords do not match");
      setError('Error signing up: Passwords do not match');
      return;
    }

    try {
      await signUp({
        username: email, // Use the email as the username
        password: newPassword,
        options: {
          userAttributes: {
            email: email,
            name: givenName,
          },
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });

      navigate("/home", { state: { email: email } });
    } catch (error) {
      console.log('error signing up:', error);
      setError('Error signing up: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      <div className="flex flex-col flex-1 min-h-full justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center justify-center">
          <a href="/">
            <h2 className="mt-4 leading-9 text-center text-2xl font-bold tracking-tight text-black">
              Sign Up
            </h2>
          </a>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[520px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-3xl sm:px-12">
            <form className="space-y-6" onSubmit={handleSignUp}>
              <div>
                <label
                  htmlFor="givenName" // Match the id of the input
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={formData.givenName}
                    onChange={handleChange}
                    className="block sm:text-sm sm:leading-6 w-full rounded-full py-1.5 text-black shadow-sm ring-1 ring-owl-purple border-0
                          focus:ring-2 focus:ring-inset ring-inset focus:ring-owl-purple"
                    type="text"
                    id="givenName" // Ensure this matches the htmlFor above
                    name="givenName"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    className="block sm:text-sm sm:leading-6 w-full rounded-full py-1.5 text-black shadow-sm ring-1 ring-owl-purple border-0
                          focus:ring-2 focus:ring-inset ring-inset focus:ring-owl-purple"
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-center">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium leading-6 text-black"
                  >
                    Create Password
                  </label>
                </div>

                <div className="mt-2">
                  <input
                    value={formData.newPassword}
                    onChange={handleChange}
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block sm:text-sm sm:leading-6 w-full rounded-full py-1.5 text-black shadow-sm ring-1 ring-owl-purple border-0
                      focus:ring-2 focus:ring-inset ring-inset focus:ring-owl-purple"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block sm:text-sm sm:leading-6 w-full rounded-full py-1.5 text-black shadow-sm ring-1 ring-owl-purple border-0
                focus:ring-2 focus:ring-inset ring-inset focus:ring-owl-purple"
                  />
                </div>
              </div>
              <div>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <button
                  type="submit"
                  className="flex w-full rounded-full justify-center bg-violet-500 px-3 py-1.5 text-sm text-white font-semibold leading-6 shadow-sm hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-owl-purple"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div>
              <div className=" mt-10">
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>

                  <div className="relative flex justify-center text-sm font-medium leading-6">
                    <span className="bg-white px-6 text-gray-900">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <span className="text-sm font-semibold leading-10 text-black flex items-center justify-center">
                  <button
                    onClick={() => signInWithRedirect({ provider: "Google" })}
                    className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                  >
                    Google
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="leading-6 font-semibold text-sm text-violet-500 hover:text-violet-600"
          >
            Login
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
