import axios from "../config/axios";

export const startRegister = (formData, redirect) => {
  return () => {
    axios.post("/user/register", formData).then((response) => {
      if (response.data.hasOwnProperty("errors")) {
        alert(response.data.message);
      } else {
        redirect("/");
        alert("successful register");
      }
    });
  };
};

export const setUser = (user) => {
  return { type: "SET_USER", payload: user };
};

export const startSetUser = () => {
  return (dispatch) => {
    axios
      .get("/user/account", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const user = response.data;
        dispatch(setUser(user));
      });
  };
};

export const startLogin = (formData, redirect) => {
  return (dispatch) => {
    axios.post("/user/login", formData).then((response) => {
      if (response.data.hasOwnProperty("error")) {
        alert(response.data.error);
      } else {
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data);
        axios
          .get("/user/account", {
            headers: {
              "x-auth": localStorage.getItem("authToken"),
            },
          })
          .then((response) => {
            const user = response.data;
            dispatch(setUser(user));
          });
        redirect("/");
      }
    });
  };
};

export const removeUser = () => {
  return { type: "REMOVE_USER" };
};

export const startLogout = () => {
  return () => {
    console.log("logout in actions");
    localStorage.removeItem("authToken");

    window.location.href = "/user/login";
  };
};
