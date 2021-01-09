import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {findTvShow} from "../../selectors/tvSelector";
import "../movie/form.css";
import Select from "react-select";
import {FaCloudUploadAlt} from "react-icons/fa";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvTitle: props.tvShow ? props.tvShow.tvTitle : "",
      genre: props.tvShow
        ? props.tvShow.genre.map((ele) => {
            return {value: ele, label: ele};
          })
        : [],
      rating: props.tvShow
        ? {value: props.tvShow.rating, label: props.tvShow.rating}
        : {value: null, label: null},
      description: props.tvShow ? props.tvShow.description : "",
      files: "",
      options: [
        {value: "Thriller", label: "Thriller"},
        {value: "Comedy", label: "Comedy"},
        {value: "Action", label: "Action"},
        {value: "Slice of Life", label: "Slice of Life"},
      ],
      ratingOptions: [
        {value: "1", label: "1"},
        {value: "2", label: "2"},
        {value: "4", label: "4"},
        {value: "5", label: "5"},
        {value: "6", label: "6"},
        {value: "7", label: "7"},
        {value: "8", label: "8"},
        {value: "9", label: "9"},
        {value: "10", label: "10"},
      ],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelect = (value) => {
    this.setState({rating: value});
  };

  handleSelectGenre = (value) => {
    this.setState({genre: value});
  };

  handleFile = (e) => {
    this.setState({
      files: e.target.files,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("tvTitle", this.state.tvTitle);
    for (const genre of this.state.genre) {
      formData.append("genre", genre.value);
    }
    formData.append("rating", this.state.rating.value);
    formData.append("description", this.state.description);
    for (const files of this.state.files) {
      formData.append("netflix", files);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log("1");
    this.props.handleSubmit(formData);
  };

  onSelect = (selectedList, selectedItem) => {
    console.log("form multiple", selectedList);
    this.setState({genre: selectedList});
  };

  handleBackground = (e) => {
    e.target.style.color = "whitesmoke";
  };

  handleBackgroundReverse = (e) => {
    e.target.style.color = "#ff4655";
  };

  render() {
    console.log(this.state.genre, this.state.tvTitle);
    const customStyles = {
      option: (provided, state) => ({
        ...provided,

        color: state.isFocused ? "black" : "white",
        backgroundColor: state.isFocused ? "white" : "#111",
      }),
      control: (provided) => ({
        ...provided,
        backgroundColor: "rgba(68, 67, 67, 0.788)",
        border: "none",
        margin: "0px 10px 0px 10px",
      }),
      singleValue: (base) => ({
        ...base,
        color: "white",
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: "black",
      }),
    };

    const inputStyle = {
      height: "2rem",
      borderRadius: "3px",
      backgroundColor: "rgba(68, 67, 67, 0.788)",
      margin: "0px 10px 10px 10px",
      color: "aliceblue",
      fontSize: "1.4rem",
    };

    const labelStyle = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      marginLeft: "10px",
      marginBottom: "5px",
    };

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "450px",
              height: "520px",
              backgroundColor: " rgba(0, 0, 0, 0.7)",
              color: "white",
              marginTop: "45px",
            }}
          >
            <div>
              <h1
                style={{
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
              >
                {this.props.name}
              </h1>
            </div>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              encType="multipart/form-data"
              onSubmit={this.handleSubmit}
            >
              <label style={labelStyle}>
                Show Name{" "}
                <input
                  style={inputStyle}
                  type="text"
                  required
                  name="tvTitle"
                  value={this.state.tvTitle}
                  onChange={this.handleChange}
                />
              </label>

              <label style={labelStyle}>
                Rating{" "}
                <Select
                  defaultValue={this.state.rating}
                  options={this.state.ratingOptions}
                  onChange={this.handleSelect}
                  required
                  styles={customStyles}
                />
              </label>
              <label style={labelStyle}>
                Description{" "}
                <input
                  style={inputStyle}
                  type="textarea"
                  required
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label style={labelStyle}>
                Genre{" "}
                <Select
                  isMulti
                  defaultValue={this.state.genre}
                  required
                  options={this.state.options}
                  onChange={this.handleSelectGenre}
                  styles={customStyles}
                />
              </label>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",

                  justifyContent: "space-around",
                  marginTop: "20px",
                  marginLeft: "10px",
                }}
              >
                Upload Files{" "}
                <input
                  type="file"
                  required
                  onChange={this.handleFile}
                  multiple={true}
                />
              </label>
              <div style={{display: "flex", justifyContent: "center"}}>
                <input type="submit" class="btn btn-primary" />
              </div>
            </form>
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

export default withRouter(connect(mapStateToProps)(Form));
