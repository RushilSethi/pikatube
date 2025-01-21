import React from "react";
import PropTypes from "prop-types";
import PikachuLogo from "../assets/pikachu-logo.svg";
import avatar from "../assets/avatars/1.svg";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Navbar = ({toggleSidebar}) => {
  const signedIn = false;
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full hover:bg-hover p-2 m-2 cursor-pointer" onClick={toggleSidebar}>
            {/* Menu Icon */}
            <svg
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 12.32H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M2 18.32H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M2 6.32001H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </div>

          {/* pikatube logo */}
          <div className="flex items-center bg-textPrimary rounded-full px-3 py-1 m-1 cursor-pointer">
            <img src={PikachuLogo} className="w-8 h-8" />
            <span className="text-background font-bold text-lg">PikaTube</span>
          </div>
        </div>

        {/* search bar */}
        <div className="flex items-center">
          <input
            className="searchbar w-96 bg-card border-border border-2 text-textPrimary p-1.5 rounded-full focus:outline-none focus:border-accentBlue"
            placeholder="Search"
          />
          <style>{`
        .searchbar::placeholder {
          color: #aaaaaa; 
        }
      `}</style>
          {/* search icon */}
          <div className="rounded-full bg-hover p-2 m-2 cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#aaaaaa"
              className="w-6 h-6"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M17 17L21 21"
                  stroke="#aaaaaa"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#aaaaaa"
                  strokeWidth={2}
                />{" "}
              </g>
            </svg>
          </div>
        </div>

        {/* sign in / add video and account */}
        <div>
          {signedIn ? (
            <div className="flex items-center">
              <div className="flex items-center text-textPrimary gap-1 bg-card px-2 py-1.5 m-2 rounded-full cursor-pointer hover:bg-hover">
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12H20M12 4V20"
                        stroke="#ffffff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                </>
                Create
              </div>
              <div className="mx-2 h-12 w-12 cursor-pointer bg-card rounded-full">
                <img src={avatar} className="w-[118%] h-[118%]" />
              </div>
            </div>
          ) : (
            <div className="flex items-center rounded-full py-1 px-2 m-2 text-textPrimary bg-card gap-2 cursor-pointer hover:bg-accentBlue duration-300">
              <div className="rounded-full border-textPrimary border-2 p-1.5">
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  className="w-5 h-5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                      fill="#ffffff"
                    />{" "}
                  </g>
                </svg>
              </div>
              Sign In
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
