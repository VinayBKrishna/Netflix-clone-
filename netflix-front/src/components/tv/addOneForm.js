import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {StartAddSingleShow} from "../../actions/tvShowsAction";

class AddSingle extends React.Component {
  constructor() {
    super();
    this.state = {
      file: "",
    };
  }

  handleFile = (e) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append("netflix", this.state.file);
    const redirect = () => this.props.history.push("/tv");
    this.props.dispatch(
      StartAddSingleShow(formData, this.props.match.params.id, redirect)
    );
  };

  render() {
    console.log(this.props, "forms one", this.state.file);
    return (
      <div>
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <label style={{color: "white"}}>Upload File</label>
          <input
            style={{color: "white"}}
            type="file"
            onChange={this.handleFile}
          />

          <input type="submit" value="Add Episode" />
        </form>
      </div>
    );
  }
}

export default withRouter(connect()(AddSingle));
