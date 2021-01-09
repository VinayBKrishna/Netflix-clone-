import React from "react";
import {connect} from "react-redux";
import {startUpdateMovie} from "../../actions/moviesAction";
import Form from "./form";

function MovieEdit(props) {
  console.log(props, "from edmtie movie");
  const handleSubmit = (formData) => {
    const id = props.match.params.id;
    const public_id = props.match.params.public_id;
    const redirect = () => props.history.push("/movies");
    props.dispatch(startUpdateMovie(formData, id, public_id, redirect));
  };
  return (
    <div
      className="form_Background"
      style={{
        color: "whitesmoke",
        height: "91vh",
      }}
    >
      <Form name="Edit Movie" handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(MovieEdit);
