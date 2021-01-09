import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";
import {startLogout} from "./actions/userAction";
import {connect} from "react-redux";

function Nav(props) {
  function handleLogout() {
    props.dispatch(startLogout());
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-brand">Watcher</div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <Link class="nav-link active" to="/movies">
              Movies
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" to="/tv">
              Tv Show
            </Link>
          </li>

          <li class="nav-item">
            <Link
              class="nav-link active"
              to="/addmovie"
              tabindex="-1"
              aria-disabled="true"
            >
              Add Movie
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class="nav-link active"
              to="/addtv"
              tabindex="-1"
              aria-disabled="true"
            >
              Add Tv Show
            </Link>
          </li>
        </ul>

        <button
          class="btn btn-light my-2 my-sm-0"
          onClick={() => handleLogout()}
          type="submit"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default connect()(Nav);
