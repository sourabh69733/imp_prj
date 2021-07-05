import React from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "./use-auth.js";

export default function Navbar(props) {
  // const auth = useAuth();
  console.log(props);
  return (
      <div class="container-fluid">
        <div  id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
  );
}
