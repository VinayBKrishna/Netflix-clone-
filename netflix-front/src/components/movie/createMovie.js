import React from "react";
import {connect} from "react-redux";
import {startAddMovie} from "../../actions/moviesAction";
import Form from "./form";

function NewMovie(props) {
  const handleSubmit = (formData) => {
    const redirect = () => props.history.push("/movies");
    props.dispatch(startAddMovie(formData, redirect));
  };
  return (
    <div
      className="form_Background"
      style={{
        color: "whitesmoke",
        height: "91vh",
      }}
    >
      <Form name="Add Movie" handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(NewMovie);
