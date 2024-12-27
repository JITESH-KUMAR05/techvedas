import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/auth/signin`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.error("There was an error signing in!", error);
    }
  };

  return (
    <section className="bg-gray-1 py-20 text-black lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <a href="/#" className="mx-auto inline-block max-w-[160px]">
                  <img
                    src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-primary.svg"
                    alt="logo"
                  />
                </a>
              </div>
              <form onSubmit={handleSubmit}>
                <InputBox
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                  placeholder="Email"
                />
                <InputBox
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  name="password"
                  placeholder="Password"
                />
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary px-5 py-3 text-base font-medium  transition hover:bg-opacity-90"
                  />
                </div>
              </form>
              <a
                href="/#"
                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline "
              >
                Forget Password?
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Not a member yet?</span>
                <a href="/signup" className="text-primary hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

const InputBox = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-6">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
      />
    </div>
  );
};