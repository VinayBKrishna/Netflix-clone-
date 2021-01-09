import axios from "../config/axios";

export const setMovies = (movies) => {
  return {
    type: "SET_MOVIES",
    payload: movies,
  };
};

export const startSetMovie = () => {
  return (dispatch) => {
    axios
      .get("/movie", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const movies = response.data;
        dispatch(setMovies(movies));
      });
  };
};

export const addMovie = (movie) => {
  return {
    type: "ADD_MOVIE",
    payload: movie,
  };
};

export const startAddMovie = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/addmovie", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          const movie = response.data;
          dispatch(addMovie(movie));

          redirect();
        }
      });
  };
};

export const removeMovie = (id) => {
  return {
    type: "REMOVE_MOVIE",
    payload: id,
  };
};

export const startRemoveMovie = (id, redirect) => {
  return (dispatch) => {
    axios
      .delete(`/delete/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const movie = response.data;
        dispatch(removeMovie(movie._id));
        redirect();
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const updateMovie = (movie) => {
  return {
    type: "UPDATE_MOVIE",
    payload: movie,
  };
};

export const startUpdateMovie = (formData, id, public_id, redirect) => {
  console.log(id, public_id, "actions");
  return (dispatch) => {
    axios
      .put(`/updatemovie/${id}/${public_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const movie = response.data;
        console.log(
          movie,
          "askjdbaskjbdjkasbdkjabsdkjbakjsdbkjasbdkjabsdkjabkjdbkjasbdj"
        );

        dispatch(updateMovie(movie));
        redirect();
      })
      .catch((err) => {
        alert(err);
      });
  };
};
