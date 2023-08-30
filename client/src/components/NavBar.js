import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav className="navbarStyles">
        <li>
          {" "}
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          {" "}
          <NavLink to="/LogIn"> Log In </NavLink>
        </li>
        <li>
          <NavLink to="/Random"> Not Sure? Click Here for a Random Drink </NavLink>
        </li>
        <li>
          <NavLink to="/Create"> Create Your Own Drink </NavLink>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;