import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {startRegister} from "../../actions/userAction";
import "./register/register.css";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
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
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
    };
    const redirect = () => {
      return this.props.history.push("/user/login");
    };
    console.log("formData", formData);
    this.props.dispatch(startRegister(formData, redirect));
  };

  render() {
    return (
      <div>
        <div className="back-image" style={{filter: "blur(4px)"}}></div>
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
            filter: "drop-shadow(10px 10px 10px rgba(0,0,0,0.9))",
          }}
        >
          <div>
            <div class="form-group">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <h1
                  className="context-title"
                  style={{
                    marginBottom: "20px",
                    color: "white",
                    paddingTop: "5%",
                  }}
                >
                  Sign up
                </h1>
                <br />
                <lable for="exampleInputEmail1">
                  <span style={{color: "white"}}>Name</span>
                  <input
                    placeholder="Enter User Name"
                    class="form-control"
                    type="username"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  />
                  <small
                    id="emailHelp"
                    class="form-text "
                    style={{color: "rgba(255,255,255,0.6)"}}
                  >
                    We'll never share your email with anyone else.
                  </small>
                </lable>
                <br />

                <lable htmlFor="email">
                  <span style={{color: "white"}}>Email</span>
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

                <lable htmlFor="password">
                  <span style={{color: "white"}}>Password</span>
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
                    value="Sign-Up"
                    style={{marginRight: "10px"}}
                  />
                  <div>
                    <Link to="/user/login" style={{textDecoration: "none"}}>
                      <div class="btn btn-primary">Login</div>
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

export default connect()(Register);
