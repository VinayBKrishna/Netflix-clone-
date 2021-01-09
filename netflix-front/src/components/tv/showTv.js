import React from "react";
import {connect} from "react-redux";
import {findTvShow} from "../../selectors/tvSelector";
import {Link} from "react-router-dom";
import {startRemoveSingle} from "../../actions/tvShowsAction";
import {startRemoveShow} from "../../actions/tvShowsAction";
import AddSingle from "./addOneForm";
import axios from "axios";
import {compare} from "./compare";

import "./showTv.css";

class ShowTv extends React.Component {
  constructor() {
    super();
    this.state = {
      episodes: false,
    };
  }

  handleSingleDelete = (id, public_id) => {
    this.props.dispatch(startRemoveSingle(id, public_id));
  };

  handleDelete = (id) => {
    console.log(id);
    const redirect = () => this.props.history.push("/tv");
    this.props.dispatch(startRemoveShow(id, redirect));
  };

  handleDownload = (url) => {
    console.log(url, "url");
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      console.log(url, link);
      link.href = url;
      link.setAttribute("download", "Show.mp4");
      document.body.appendChild(link);
      link.click();
    });
  };

  handleAddEpisode = () => {
    this.setState((prevState) => {
      return {
        episodes: !prevState.episodes,
      };
    });
  };

  render() {
    const episodes = [].concat(this.props.tvShow?.videos);
    compare(episodes);

    return (
      <div>
        <div
          class="container"
          style={{
            border: "1px solid white",
            marginTop: "20px",
          }}
        >
          <div style={{position: "absolute", backgroundColor: "transparent"}}>
            <img
              src="https://res.cloudinary.com/drhewzpgi/image/upload/v1606235447/logo/letter-w-logo-design_26638-3_d0fp7x.jpg"
              height="40px"
            />
          </div>
          <div
            style={{
              backgroundColor: "white",
              marginLeft: "-15px",
              padding: "10px",
              marginRight: "-15px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <span style={{marginLeft: "90px"}}>
              {this.props.tvShow?.tvTitle}
            </span>
          </div>
          {this.props.tvShow && (
            <div style={{margin: "20px", display: "flex"}}>
              <img
                src={this.props.tvShow.photos.url}
                width="360px"
                height="450"
              />
              <div style={{marginLeft: "30px"}}>
                <h2>{this.props.tvShow.tvTitle}</h2>
                <h4>
                  <span className="info">Rating-</span>
                  {this.props.tvShow.rating}/10
                </h4>
                <h4>
                  <span className="info">Genre-</span>{" "}
                  {this.props.tvShow.genre.join(",")}
                </h4>
                <h5>
                  <span className="info">Show Description-</span>{" "}
                  {this.props.tvShow.description}
                </h5>
                <h5>
                  <span className="info">Number of Episodes- </span>
                  {this.props.tvShow.videos.length}
                </h5>
                <button
                  class="btn btn-light edit"
                  onClick={() => {
                    this.props.history.push();
                  }}
                >
                  Edit Image
                </button>
                <button
                  class="btn btn-danger edit"
                  onClick={() => {
                    this.handleDelete(this.props.tvShow._id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          class="container"
          style={{
            border: "1px solid white",
            marginTop: "20px",
          }}
        >
          <div style={{position: "absolute", backgroundColor: "transparent"}}>
            <img
              src="https://res.cloudinary.com/drhewzpgi/image/upload/v1606235447/logo/letter-w-logo-design_26638-3_d0fp7x.jpg"
              height="40px"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "white",
              marginLeft: "-15px",
              padding: "10px",
              marginRight: "-15px",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <span style={{marginLeft: "90px"}}>Episodes</span>
          </div>
          <div>
            {this.props.tvShow?.videos.map((episode) => {
              return (
                <div>
                  {" "}
                  <div
                    classname="episode_card"
                    style={{
                      display: "flex",
                      maxWidth: "95%",
                      backgroundColor: "rgb(51, 52, 54)",
                      marginTop: "10px",
                      marginLeft: "25px",
                      padding: "10px 140px 10px 30px",
                    }}
                  >
                    <Link
                      style={{textDecoration: "none"}}
                      to={`/tvplay/${this.props.tvShow._id}/${episode.public_id}`}
                    >
                      <div style={{display: "flex"}}>
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <img
                            style={{
                              maxHeight: "100px",
                              width: "120px",
                            }}
                            key={this.props.tvShow._id}
                            className="poster"
                            src={this.props.tvShow.photos.url}
                            alt="images"
                          />{" "}
                          <div
                            style={{
                              textDecoration: "none",
                              color: "white",
                              marginLeft: "10px",
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                          >
                            Episode {episode.original_filename.split(" ")[1]}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        marginLeft: "600px",
                        color: "white",
                      }}
                    >
                      <div>{this.props.tvShow.createdAt.split("T")[0]}</div>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          marginLeft: "-20px",
                        }}
                      >
                        <button
                          className="btn btn-danger edit"
                          onClick={() =>
                            this.handleSingleDelete(
                              this.props.tvShow._id,
                              episode.public_id
                            )
                          }
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-light edit"
                          onClick={() => {
                            this.props.history.push(
                              `/editshow/${this.props.tvShow._id}/${episode.public_id}`
                            );
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-light edit"
                          onClick={() => {
                            this.handleDownload(episode.url);
                          }}
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
          <div
            style={{
              maxWidth: "95%",
              backgroundColor: "rgb(51, 52, 54)",
              marginTop: "10px",
              marginLeft: "25px",
              padding: "10px 140px 10px 30px",
              textAlign: "center",
              color: "white",

              marginBottom: "10px",
            }}
            onClick={this.handleAddEpisode}
          >
            <div
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: "30px",
                display: this.state.episodes ? "none" : "inherit",
              }}
            >
              Add Episode
            </div>
            <div
              style={{
                display: this.state.episodes ? "inherit" : "none",
              }}
            >
              <AddSingle />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    tvShow: findTvShow(state.tvShows, id),
  };
};

export default connect(mapStateToProps)(ShowTv);
