import React from "react";
import { FaEnvelope, FaList, FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosHome } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  MdOutlineConnectWithoutContact,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="flex gap-5">
      <div className="w-64 min-h-screen bg-orange-700 p-4">
        <ul>
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/adminHome"
                >
                  {" "}
                  <IoIosHome className="text-xl mr-2" /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/cart"
                >
                  {" "}
                  <FaCartShopping className="text-xl mr-2" /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/addItems"
                >
                  <IoFastFoodOutline className="text-xl mr-2" /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/paymentHistory"
                >
                  {" "}
                  <MdOutlineManageAccounts className="text-xl mr-2" />
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/manageItem"
                >
                  {" "}
                  <FaList className="text-xl mr-2" />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/users"
                >
                  {" "}
                  <FaUsers className="text-xl mr-2" /> all users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/cart"
                >
                  {" "}
                  <MdOutlineConnectWithoutContact className="text-xl mr-2" />{" "}
                  Contact
                </NavLink>
              </li>
              <div className="divider"></div>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/"
                >
                  <IoIosHome className="text-xl mr-2" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/menus"
                >
                  <RiMenuSearchLine className="text-xl mr-2" />
                  menus
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/menus"
                >
                  <FaEnvelope className="text-xl mr-2" />
                  Contact
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/"
                >
                  <IoIosHome className="text-xl mr-2" />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/dashboard/userHome"
                >
                  <IoIosHome className="text-xl mr-2" />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/menus"
                >
                  <RiMenuSearchLine className="text-xl mr-2" />
                  menus
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center text-white  p-3 rounded-md"
                  to="/menus"
                >
                  <FaEnvelope className="text-xl mr-2" />
                  Contact
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
