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
          <NavLink to="/Random"> Not Sure? Click Here for a Random Drink </NavLink>
        </li>
        <li>
          <NavLink to="/create_drink"> Create Your Own Drink </NavLink>
        </li>
        <li>
          <NavLink to="/create_user"> New Here? Create an Account </NavLink>
          <li>
          <NavLink to="/drinks"> See all drinks </NavLink>
        </li>
        </li>
      </nav>
    </div>
  );
}

export default NavBar;