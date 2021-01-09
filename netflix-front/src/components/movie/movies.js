import React from "react";

import {connect} from "react-redux";
import {startSetMovie} from "../../actions/moviesAction";
import Row from "./row";

import Search from "./search";
import "./search.css";

class Movie extends React.Component {
  componentDidMount() {
    console.log("cdm");
    if (this.props.movies.length === 0) {
      this.props.dispatch(startSetMovie());
    }
  }

  render() {
    // console.log(this.state.actions, "sctions");
    let topRated = this.props.movies.filter((movie) => movie.rating >= 7);

    let action = this.props.movies.filter((movie) => {
      if (movie.genre.includes("Action")) {
        return movie;
      }
    });

    let thriller = this.props.movies.filter((movie) => {
      if (movie.genre.includes("Thriller")) {
        return movie;
      }
    });

    let comedy = this.props.movies.filter((movie) => {
      if (movie.genre.includes("Comedy")) {
        return movie;
      }
    });

    let sliceOfLife = this.props.movies.filter((movie) => {
      if (movie.genre.includes("Slice of Life")) {
        return movie;
      }
    });

    return (
      <div>
        {this.props.movies ? (
          <div>
            <div className="search-section">
              <Search />
            </div>
            <div className="set_margin">
              <h1 className="name">Latest Movies</h1>
              <div className="row_posters">
                <Row array={this.props.movies} />
              </div>
              <div>
                <h1 className="name">Top Rated</h1>
                <div className="row_posters">
                  <Row array={topRated} />
                </div>
              </div>
              <div>
                <h1 className="name">Action Movies</h1>
                <div className="row_posters">
                  <Row array={action} />
                </div>
              </div>
              <div>
                <h1 className="name">Thrillers</h1>
                <div className="row_posters">
                  <Row array={thriller} />
                </div>
              </div>
              <div>
                <h1 className="name">Comedy </h1>
                <div className="row_posters">
                  <Row array={comedy} />
                </div>
              </div>
              <div>
                <h1 className="name">Slice of Life</h1>
                <div className="row_posters">
                  <Row array={sliceOfLife} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>...Loading</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

export default connect(mapStateToProps)(Movie);
