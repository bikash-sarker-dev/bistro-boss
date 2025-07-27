import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCarts from "../../hooks/useCarts";
import useAdmin from "./../../hooks/useAdmin";

const Navbar = () => {
  const navigate = useNavigate();
  const [cart] = useCarts();
  const { user, LogOutAccount } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  const handleLogout = () => {
    LogOutAccount()
      .then(() => {
        navigate("/");
        console.log("logout");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Links = (
    <>
      <li>
        <NavLink className="uppercase" to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className="uppercase" to="/contact">
          CONTACT US
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/dashboard">
          DASHBOARD
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/menus">
          Our Menu
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/order/salad">
          Our Order
        </NavLink>
      </li>
      <li>
        <NavLink className="uppercase" to="/secret">
          secret
        </NavLink>
      </li>
      {user && isAdmin && (
        <li>
          <NavLink className="uppercase" to="/dashboard/adminHome">
            Admin Home
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink className="uppercase" to="/dashboard/userHome">
            User Home
          </NavLink>
        </li>
      )}
      <li>
        <NavLink className="uppercase" to="/name">
          {user && user?.displayName}
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-opacity-30  bg-black text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bistro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{Links}</ul>
      </div>
      <div className="navbar-end">
        <Link to="/dashboard/cart">
          <button className="btn btn-sm">
            <FaShoppingCart className="text-lg" />
            <div className="badge">+{cart.length}</div>
          </button>
        </Link>
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className="uppercase btn  btn-sm btn-secondary"
              to="/login"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              className="uppercase btn  btn-sm btn-secondary"
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className="uppercase btn  btn-sm btn-secondary"
              to="/signup"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
