import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {startLogin} from "../../actions/userAction";

import "./login.css";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      password: this.state.password,
      email: this.state.email,
    };
    const redirect = () => this.props.history.push("/movies");
    this.props.dispatch(startLogin(formData, redirect));
  };

  render() {
    return (
      <div>
        <div className="back-image-login" style={{filter: "blur(4px)"}}></div>
        <div
          class="container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            border: "1px solid white",
            borderRadius: "6px",
          }}
        >
          <div>
            <div class="form-group">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <div>
                  <h1
                    style={{
                      marginBottom: "20px",
                      color: "white",
                      paddingTop: "5%",
                    }}
                  >
                    Login In
                  </h1>
                </div>

                <lable htmlFor="email" style={{color: "white"}}>
                  Email
                  <input
                    placeholder="Enter Email"
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                  />
                </lable>
                <br />

                <lable htmlFor="password" style={{color: "white"}}>
                  Password
                  <input
                    placeholder="Password"
                    type="password"
                    id="password"
                    class="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required
                  />
                </lable>

                <br />
                <div style={{display: "flex"}}>
                  <input
                    type="submit"
                    class="btn btn-primary"
                    value="LogIn"
                    style={{marginRight: "10px"}}
                  />
                  <div>
                    <span style={{color: "black"}}>New User...?</span>
                    <Link to="/" style={{textDecoration: "none"}}>
                      <div class="btn btn-primary">Register</div>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
