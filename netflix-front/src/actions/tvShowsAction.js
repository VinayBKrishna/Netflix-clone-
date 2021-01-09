import axios from "../config/axios";

export const setTvShows = (tvShows) => {
  return {
    type: "SET_TVSHOWS",
    payload: tvShows,
  };
};

export const startSetTvShows = () => {
  return (dispatch) => {
    axios
      .get("/tvshow", {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const tvShows = response.data;
        dispatch(setTvShows(tvShows));
      });
  };
};

export const addTv = (tv) => {
  return {
    type: "ADD_TV",
    payload: tv,
  };
};

export const startAddTv = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/addtvshow", formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          const tv = response.data;
          dispatch(addTv(tv));
          redirect();
        }
      });
  };
};

export const updateShow = (show) => {
  return {
    type: "UPDATE_SHOW",
    payload: show,
  };
};

export const startUpdateShow = (id, public_id, formData, redirect) => {
  return (dispatch) => {
    axios
      .put(`/updatetvshow/${id}/${public_id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const show = response.data;
        console.log(show, "shiahdnsdkjasdnbjkasdnlkajsdnkjn");
        dispatch(updateShow(show));
        redirect();
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const removeShow = (id) => {
  return {
    type: "REMOVE_SHOW",
    payload: id,
  };
};

export const startRemoveShow = (id, redirect) => {
  return (dispatch) => {
    axios
      .delete(`/deletetvshow/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const show = response.data;
        console.log(show, "from delelt action");
        dispatch(removeShow(id));
        redirect();
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const removeSingle = (show) => {
  return {
    type: "ADD_SINGLE",
    payload: show,
  };
};

export const startRemoveSingle = (id, public_id) => {
  return (dispatch) => {
    axios
      .delete(`/deleteone/${id}/${public_id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const show = response.data;
        console.log(show, "from single remove");
        dispatch(removeSingle(show));
      })
      .catch((err) => {
        alert(err);
      });
  };
};

export const addSingle = (show) => {
  return {
    type: "REMOVE_SINGLE",
    payload: show,
  };
};

export const StartAddSingleShow = (formData, id, redirect) => {
  console.log(formData, "addone", id);
  return (dispatch) => {
    axios
      .post(`/addone/${id}`, formData, {
        headers: {
          "x-auth": localStorage.getItem("authToken"),
        },
      })
      .then((response) => {
        const show = response.data;
        console.log(show, "asdasdasjkdbsvdjh");
        dispatch(addSingle(show));
        redirect();
      })
      .catch((err) => {
        alert(err);
      });
  };
};
