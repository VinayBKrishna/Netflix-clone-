import React from "react";
import {connect} from "react-redux";

import {startSetTvShows} from "../../actions/tvShowsAction";

import Row from "./tvRow";

import Search from "./search";

class Tv extends React.Component {
  componentDidMount() {
    if (this.props.tvShows.length === 0) {
      this.props.dispatch(startSetTvShows());
    }
  }

  render() {
    let actions = this.props.tvShows.filter((tv) => {
      if (tv.genre.includes("Action")) {
        return tv;
      }
    });

    let thriller = this.props.tvShows.filter((tv) => {
      if (tv.genre.includes("Thriller")) {
        return tv;
      }
    });

    let comedy = this.props.tvShows.filter((tv) => {
      if (tv.genre.includes("Comedy")) {
        return tv;
      }
    });

    let sliceOfLife = this.props.tvShows.filter((tv) => {
      if (tv.genre.includes("Slice of Life")) {
        return tv;
      }
    });

    return (
      <div>
        {this.props.tvShows ? (
          <div>
            <Search />
            <div className="set_margin">
              <h1 className="name">Latest Tv Shows</h1>
              <div className="row_posters">
                <Row array={this.props.tvShows} />
              </div>

              <div>
                <h1 className="name">Action</h1>
                <div className="row_posters">
                  <Row array={actions} />
                </div>
              </div>
              <div>
                <h1 className="name">Thriller</h1>
                <div className="row_posters">
                  <Row array={thriller} />
                </div>
              </div>
              <div>
                <h1 className="name">Comedy</h1>
                <div className="row_posters">
                  <Row array={comedy} />
                </div>
              </div>
              <div>
                <h1 className="name">Slice Of Life</h1>
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
    tvShows: state.tvShows,
  };
};

export default connect(mapStateToProps)(Tv);
