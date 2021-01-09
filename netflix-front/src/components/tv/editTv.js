import React from "react";
import {connect} from "react-redux";
import Form from "./form";
import {startUpdateShow} from "../../actions/tvShowsAction";

function EditShow(props) {
  const handleSubmit = (formData) => {
    const id = props.match.params.id;
    const public_id = props.match.params.public_id;
    const redirect = () => props.history.push("/tv");
    props.dispatch(startUpdateShow(id, public_id, formData, redirect));
  };

  return (
    <div
      className="form_Background"
      style={{
        color: "whitesmoke",
        height: "100vh",
      }}
    >
      <Form name="Edit Tv-Show" handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(EditShow);
