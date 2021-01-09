import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {findMovie} from "../../selectors/movieSelector";
import "./form.css";
import Select from "react-select";

import {FaCloudUploadAlt, FaThemeco} from "react-icons/fa";

class Form extends React.Component {
  constructor(props) {
    console.log("movie from constructors", props);
    console.log(props.movie);

    super(props);
    this.state = {
      movieTitle: props.movie ? props.movie.movieTitle : "",
      genre: props.movie
        ? props.movie.genre.map((ele) => {
            return {value: ele, label: ele};
          })
        : [],
      rating: props.movie
        ? {value: props.movie.rating, label: props.movie.rating}
        : {value: null, label: null},
      description: props.movie ? props.movie.description : "",
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
      genreEdit: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelect = (value) => {
    console.log("raitng set value ", value);
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

  handleOption = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      genre: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("movieTitle", this.state.movieTitle);
    for (const genre of this.state.genre) {
      formData.append("genre", genre.value);
      console.log(genre.value, "fomrfata");
    }

    formData.append("rating", this.state.rating.value);

    formData.append("description", this.state.description);
    for (const files of this.state.files) {
      formData.append("netflix", files);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

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
    console.log(this.props?.movie, "movies props");

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
                  marginTop: "20px",
                  marginBottom: "20px",
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
                Movie Name{" "}
                <input
                  style={inputStyle}
                  type="text"
                  required
                  name="movieTitle"
                  value={this.state.movieTitle}
                  onChange={this.handleChange}
                />
              </label>

              <label style={labelStyle}>
                Rating{" "}
                <Select
                  defaultValue={this.state.rating}
                  options={this.state.ratingOptions}
                  onChange={this.handleSelect}
                  styles={customStyles}
                  required
                />
              </label>
              <label style={labelStyle}>
                Description{" "}
                <input
                  style={inputStyle}
                  type="textarea"
                  name="description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label style={labelStyle}>
                Genre{" "}
                <Select
                  isMulti
                  defaultValue={this.state.genre}
                  options={this.state.options}
                  required
                  onChange={this.handleSelectGenre}
                  styles={customStyles}
                />
              </label>
              <label style={labelStyle}>
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
    movie: findMovie(state.movies, id),
  };
};

export default withRouter(connect(mapStateToProps)(Form));
