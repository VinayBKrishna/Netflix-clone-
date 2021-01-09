import React from "react";
import {connect} from "react-redux";
import {startAddTv} from "../../actions/tvShowsAction";
import Form from "./form";

function CreateTv(props) {
  const handleSubmit = (formData) => {
    console.log("2");
    const redirect = () => props.history.push("/tv");
    props.dispatch(startAddTv(formData, redirect));
  };
  return (
    <div
      className="form_Background"
      style={{
        color: "whitesmoke",
        height: "91vh",
      }}
    >
      <Form name="Create Tv-Show" handleSubmit={handleSubmit} />
    </div>
  );
}

export default connect()(CreateTv);
