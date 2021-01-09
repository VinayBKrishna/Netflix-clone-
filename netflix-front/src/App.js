import React from "react";
import {BrowserRouter, Route, Link, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {startLogout} from "./actions/userAction";

import Register from "./components/auth/register";
import Login from "./components/auth/login";

import Movie from "./components/movie/movies";
import NewMovie from "./components/movie/createMovie";
import Account from "./components/auth/Account";
import Player from "./components/Player/moviePlayer";
import ShowMovie from "./components/movie/showMovie";
import MovieEdit from "./components/movie/editMovie";

import Tv from "./components/tv/tv";
import createTv from "./components/tv/createTv";
import ShowTv from "./components/tv/showTv";
import TvPlay from "./components/Player/tvPlayer";
import EditShow from "./components/tv/editTv";
import AddShow from "./components/tv/addOneForm";
import Nav from "./nav";

class App extends React.Component {
  render() {
    console.log("props", this.props);

    return (
      <div>
        <BrowserRouter>
          <div>
            {localStorage.getItem("authToken") ? <Nav /> : null}

            <Switch>
              <Route path="/" component={Register} exact={true} />
              <Route path="/user/login" component={Login} exact={true} />
              <Route path="/users/account" component={Account} />

              <Route path="/movies" component={Movie} exact={true} />
              <Route path="/addmovie" component={NewMovie} exact={true} />
              <Route path="/showmovie/:id" component={ShowMovie} />
              <Route path="/player/:id" component={Player} exact={true} />
              <Route
                path="/editmovie/:id/:public_id"
                component={MovieEdit}
                exact={true}
              />

              <Route path="/tv" component={Tv} exact={true} />
              <Route path="/addtv" component={createTv} exact={true} />
              <Route path="/tvshow/:id" component={ShowTv} exact={true} />
              <Route
                path="/tvplay/:id/:public_id"
                component={TvPlay}
                exact={true}
              />
              <Route
                path="/editshow/:id/:public_id"
                component={EditShow}
                exact={true}
              />
              <Route path="/addone/:id" component={AddShow} exact={true} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
