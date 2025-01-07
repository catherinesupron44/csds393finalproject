import React, { useState, useEffect } from "react";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import logotext from "../images/SearchOwl.webp";

const Header = () => {
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("overflow-hidden", !isActive);
  };


  useEffect(() => {
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setActive(false);
        document.body.classList.remove("overflow-hidden");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-10 px-4 py-1 bg-[#1e4b6e]">
        <div className="mx-auto flex items-center justify-center">
          <Link to="/home" className="flex-shrink-0">
            <img
              src={logotext}
              alt="navigation bar"
              className="w-56 opacity-100"
            />
          </Link>

          <nav className="flex flex-grow justify-end items-center">
            <ul className="flex gap-2 rounded-lg px-4 py-3">
              <li className="hidden lg:block">
                <Link
                  to="/work"
                  className="px-3 py-2 text-1xl md:text-1xl lg:text-2xl text-[#ffffff]"
                >
                  Work
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link
                  to="/about"
                  className="px-3 py-2 text-1xl md:text-1xl lg:text-2xl text-[#ffffff]"
                >
                  About
                </Link>
              </li>
              <li className="hidden lg:block">
                <Link
                  to="/contact"
                  className="px-3 py-2 text-1xl md:text-1xl lg:text-2xl text-[#ffffff]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center">
            <button
              className="lg:hidden opacity-100 mr-4"
              onClick={handleToggle}
            >
              {isActive ? (
                <VscClose className="w-8 h-8 text-[#ffffff]" />
              ) : (
                <VscGrabber className="w-8 h-8 text-[#ffffff]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Side Panel */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
            isActive ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-end border-b">
              <button onClick={handleToggle}>
                <VscClose className="w-8 h-8 text-[#ccccff]" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="py-2">
                <li className="px-4 py-2">
                  <Link
                    to="/home"
                    onClick={handleToggle}
                    className="block text-xl text-[#ffffff]"
                  >
                    Home
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    to="/quiz"
                    onClick={handleToggle}
                    className="block text-xl text-[#ffffff]"
                  >
                    Quiz
                  </Link>
                </li>
                <li className="px-4 py-2">
                  <Link
                    to="/about"
                    onClick={handleToggle}
                    className="block text-xl text-[#ffffff]"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {isActive && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-40"
            onClick={handleToggle}
          ></div>
        )}
      </header>
    </>
  );
};

export default Header;