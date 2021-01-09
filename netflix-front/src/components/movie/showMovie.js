import React from "react";
import {connect} from "react-redux";
import {findMovie} from "../../selectors/movieSelector";
import {startRemoveMovie} from "../../actions/moviesAction";
import "./showMovie.css";
import axios from "axios";

class ShowMovie extends React.Component {
  handleDelete = (id) => {
    const redirect = () => this.props.history.push("/movies");
    this.props.dispatch(startRemoveMovie(id, redirect));
  };

  handleDownload = (url) => {
    console.log(url, "from show");
    axios({
      url,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      console.log(response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.mp4");
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    console.log(this.props.movie);
    return (
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
            {this.props.movie?.movieTitle}
          </span>
        </div>
        {this.props.movie && (
          <div style={{margin: "20px", display: "flex"}}>
            <img src={this.props.movie.photos.url} width="360px" />
            <div style={{marginLeft: "30px"}}>
              <h2>{this.props.movie.movieTitle}</h2>
              <h4>
                <span className="info">Rating-</span>
                {this.props.movie.rating}/10
              </h4>
              <h4>
                <span className="info">Genre-</span>{" "}
                {this.props.movie.genre.join(",")}
              </h4>
              <h5>
                <span className="info">Movie Description-</span>{" "}
                {this.props.movie.description}
              </h5>
              <h5>
                <span className="info">Duration- </span>
                {Math.floor(this.props.movie.videos.duration) / 120}Mins
              </h5>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  maxWidth: "210px",
                  marginTop: "20px",
                }}
              >
                <button
                  class="btn btn-light"
                  onClick={() => {
                    this.props.history.push(`/player/${this.props.movie._id}`);
                  }}
                >
                  Play
                </button>
                <button
                  class="btn btn-light"
                  onClick={() => {
                    this.handleDownload(this.props.movie.videos.url);
                  }}
                >
                  Download
                </button>
              </div>
              <div style={{maxWidth: "500px"}}>
                <button
                  class="btn btn-light edit "
                  onClick={() => {
                    this.props.history.push(
                      `/editmovie/${this.props.movie._id}/${this.props.movie.photos.public_id}`
                    );
                  }}
                >
                  Edit Image
                </button>
                <button
                  class="btn btn-light edit"
                  onClick={() => {
                    this.props.history.push(
                      `/editmovie/${this.props.movie._id}/${this.props.movie.videos.public_id}`
                    );
                  }}
                >
                  Edit Video
                </button>

                <button
                  class="btn btn-danger edit"
                  onClick={() => this.handleDelete(this.props.movie._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.match.params.id;
  return {
    movie: findMovie(state.movies, id),
  };
};

export default connect(mapStateToProps)(ShowMovie);
