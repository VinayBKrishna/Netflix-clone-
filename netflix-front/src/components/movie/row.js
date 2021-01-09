import React from "react";
import {Link} from "react-router-dom";
import "./Row.css";

class Row extends React.Component {
  render() {
    console.log("row");
    return this.props.array?.map((movie) => {
      return (
        <div>
          <div className="row">
            <Link to={`/showmovie/${movie._id}`} key={movie._id}>
              <img
                key={movie._id}
                className="row_poster"
                src={movie.photos.url}
                alt="images"
              />
            </Link>
          </div>
        </div>
      );
    });
  }
}

export default Row;
