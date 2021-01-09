import React from "react";
import { Link } from "react-router-dom";
import "../movie/Row.css";

class Row extends React.Component {
  render() {
    return this.props.array.map((tv) => {
      return (
        <div>
          <div className="row">
            <Link to={`/tvshow/${tv._id}`} key={tv._id}>
              <img
                key={tv._id}
                src={tv.photos.url}
                className="row_poster"
                alt="images"
                width="150"
                height="150"
              />
            </Link>
          </div>
        </div>
      );
    });
  }
}
export default Row;
