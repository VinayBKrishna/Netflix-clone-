import React from "react";
import Row from "../movie/row";
import {connect} from "react-redux";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchElement: "",
    };
  }

  handleSearch = (e) => {
    const searchElement = e.target.value;
    this.setState({searchElement});
  };

  render() {
    console.log(this.state.searchElement);
    const searchResult = this.props.tvShows.filter((show) =>
      show.tvTitle
        .toLowerCase()
        .includes(this.state.searchElement.toLowerCase())
    );
    console.log(searchResult);
    return (
      <div>
        {this.props.tvShows && (
          <div>
            <input
              style={{
                marginLeft: "85vw",
                position: "relative",
              }}
              type="text"
              name="searchElement"
              value={this.state.searchElement}
              placeholder="Search"
              onChange={this.handleSearch}
            />
            <div
              style={
                this.state.searchElement
                  ? {display: "inherit"}
                  : {display: "none"}
              }
            >
              {searchResult.length === 0 ? (
                <div>
                  <div className="set_margin">
                    <h1 className="name">Search Results</h1>
                    <div className="row_posters">
                      <h1
                        style={{
                          textTransform: "upperCase",
                          letterSpacing: "2px",
                          color: "#869189",
                          marginTop: "20px",
                          marginBottom: "20px",
                          marginLeft: "40%",
                          fontSize: "50px",
                        }}
                      >
                        No result
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="set_margin">
                    <h1 className="name">Search Results</h1>
                    <div className="row_posters">
                      <Row array={searchResult} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tvShows: state.tvShows,
  };
};

export default connect(mapStateToProps)(Search);
