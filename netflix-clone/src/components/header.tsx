import React, { useEffect, useState } from "react";
import netflixLogo from "../assets/Netflix_Logo_RGB.png";
import { NavLink, Link } from "react-router-dom";
import NotificationIcon from "@heroicons/react/24/outline/BellIcon";
import SearchBar from "./search-bar";
import ProfileMenu from "./profile-menu";

export default function Header() {
  const [fixed, setFixed] = useState(false);
  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : "undefined";
  }

  function onWindowScroll() {
    if (window.scrollY > 8) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);
    () => window.removeEventListener("scroll", onWindowScroll);
  });

  return (
    <header
      className={`z-10 py-2 pr-16 ${
        fixed ? "fixed top-0 bg-dark" : "relative bg-transparent"
      } w-full transition-colors duration-300 ease-linear`}
    >
      <nav className="grid grid-cols-[200px_auto_auto] items-center gap-4">
        <section className="h-14">
          <Link to="/browse">
            <img
              className="h-full w-full object-contain"
              src={netflixLogo}
              alt="netflix logo"
            />
          </Link>
        </section>
        <section className="text-base font-normal text-gray-300">
          <ul className="flex gap-8">
            <li>
              <NavLink className={isActiveLink} to="/browse">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/genre">
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/genre/movies">
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/latest">
                New and Popular
              </NavLink>
            </li>
          </ul>
        </section>
        <section className="flex items-center gap-4 justify-self-end">
          <SearchBar />
          <NotificationIcon className="h-8 w-8" />
          <ProfileMenu />
        </section>
      </nav>
    </header>
  );
}
