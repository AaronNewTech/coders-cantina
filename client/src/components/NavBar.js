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
        {/* <li>
          {" "}
          <NavLink to="/users-with-drinks"> List of Users Favorites </NavLink>
        </li> */}
        <li>
          <NavLink to="/Random"> Random Drink </NavLink>
        </li>
        <li>
          <NavLink to="/create_drink"> Create Drink </NavLink>
        </li>
        <li>
          <NavLink to="/create_user"> Create Account </NavLink>
          </li>
          <li>
          <NavLink to="/drinks"> See All Drinks </NavLink>
        </li>
        
      </nav>
    </div>
  );
}

export default NavBar;