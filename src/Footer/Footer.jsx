import React, { useState, useEffect } from "react";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";

const Footer = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  
  const getUserAttributes = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      setEmail(userAttributes.email);
    }
    catch (err) { 
      console.log(err); 
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    setActive(!isActive);
    document.body.classList.toggle("overflow-hidden", !isActive);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  // const handleFavorite = () => {
  //   navigate("/favorites");
  // };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('success');
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserAttributes();
    fetchCurrentUser();
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
      <header
        className={`fixed-top top-0 z-10 px-4 py-1 transition-all duration-300 ease-in-out ${
          isActive ? "active h-screen" : ""
        }`}
        style={{
          borderBottom: '1px solid #f0f0f0', // This adds the line at the bottom
          background: '#272827'
          //spacing: '1rem'
        }}
        >
        <div className="mx-auto w-11/12 flex items-center justify-between">
          <Link to="/home" className="flex-shrink-0">
            <img
              src={""}
              alt="navigation bar"
              className="w-64 opacity-100"
            />
          </Link>
          <nav className="hidden lg:flex items-center justify-center flex-grow">
            <ul className="flex gap-10 xl:gap-16 whitespace-nowrap rounded-lg px-10 py-3">
              <li>
                <Link
                  to="/home"
                  className="text-1xl md:text-1xl lg:text-1xl xl:text-2xl text-[#ffffff]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-1xl md:text-1xl lg:text-1xl xl:text-2xl text-[#ffffff]"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/foryou"
                  className="text-1xl md:text-1xl lg:text-1xl xl:text-2xl text-[#ffffff]"
                >
                  Your Picks
                </Link>
              </li>
              <li className="active">
                <Link
                  to="/quiz"
                  className="text-1xl md:text-1xl lg:text-1xl xl:text-2xl text-[#ffffff]"
                >
                  Quiz
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-1xl md:text-1xl lg:text-1xl xl:text-2xl text-[#ffffff]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center">
            <button className="lg:hidden opacity-100 mr-4" onClick={handleToggle}>
              {isActive ? (
                <VscClose className="w-8 h-8 text-[#ccccff]" />
              ) : (
                <VscGrabber className="w-8 h-8 text-[#ccccff]" />
              )}
            </button>
            
            {!currentUser && 
              <div className="hidden lg:flex items-center gap-4 whitespace-nowrap">
                <Link
                  to="/login"
                  className="px-3 py-2 whitespace-nowrap bg-indigo-800 rounded-lg text-1xl md:text-1xl lg:text-2xl text-[#ffffff]"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="px-3 py-2 whitespace-nowrap bg-[#ccccff] rounded-lg text-1xl md:text-1xl lg:text-2xl text-[#000000]"
                >
                  Sign Up
                </Link>
              </div>
            }
            {currentUser && 
              <div className="hidden lg:flex items-center gap-4 whitespace-nowrap ">
                <Dropdown placement="bottom-end" backdrop="blur">  
                  <DropdownTrigger>
                    <Avatar 
                      showFallback 
                      src='https://images.unsplash.com/broken' 
                      isBordered
                      as="button"
                      className="transition-transform"
                      size="sm"
                      style={{ backgroundColor: 'white', color: '#1a202c' }}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="solid" className="bg-violet-100 rounded-lg p-2">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{email}</p>
                    </DropdownItem>
                    {/* <DropdownItem key="settings" onClick={handleFavorite}>My Favourites</DropdownItem> */}
                    <DropdownItem key="settings" onClick={handleProfile}>My Skin Profile</DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={handleSignOut}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            }
          </div>
        </div>
        <div
          className={`lg:hidden ${
            isActive ? "flex" : "hidden"
          } items-baseline justify-center h-full`}
        >
          <ul className="text-center py-10">
            <li className="mb-5">
              <Link
                to="/home"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Home
              </Link>
            </li>
            <li className="mb-5">
              <Link
                to="/search"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Search
              </Link>
            </li>
            {currentUser &&  <li className="mb-5">
              <Link
                to="/foryou"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Your Picks
              </Link>
            </li>}
            {!currentUser &&  <li className="mb-5">
              <Link
                to="/login"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Login
              </Link>
            </li>}
            {!currentUser &&  <li className="mb-5">
              <Link
                to="/signup"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Sign Up
              </Link>
            </li>}
            {currentUser &&  <li className="mb-5">
              <Link
                to="/profile"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                My Skin Profile
              </Link>
            </li>}
            {/* {currentUser &&  <li className="mb-5">
              <Link
                to="/favorites"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7"
              >
                My Favourites
              </Link>
            </li>} */}
            <li className="mb-5">
              <Link
                to="/quiz"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Quiz
              </Link>
            </li>
            <li className="mb-5">
              <Link
                to="/contact"
                onClick={handleToggle}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Contact
              </Link>
            </li>
            {currentUser &&  <li className="mb-5">
              <Link
                to="/"
                onClick={handleSignOut}
                className="text-2xl sm:text-3xl md:text-4xl pt-7 text-[#ffffff]"
              >
                Sign Out
              </Link>
            </li>}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Footer