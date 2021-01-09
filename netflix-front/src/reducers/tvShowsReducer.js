const tvShowsInitial = [];

const tvShowsReducer = (state = tvShowsInitial, action) => {
  switch (action.type) {
    case "SET_TVSHOWS": {
      return [...action.payload];
    }

    case "ADD_TV": {
      return [action.payload, ...state];
    }

    case "UPDATE_SHOW": {
      return state.map((show) => {
        if (show._id == action.payload._id) {
          return { ...show, ...action.payload };
        } else {
          return { ...show };
        }
      });
    }

    case "ADD_SINGLE": {
      return state.map((tv) => {
        if (tv._id == action.payload._id) {
          return { ...tv, ...action.payload };
        } else {
          return { ...tv };
        }
      });
    }

    case "REMOVE_SINGLE": {
      return state.map((tv) => {
        if (tv._id == action.payload._id) {
          return { ...tv, ...action.payload };
        } else {
          return { ...tv };
        }
      });
    }

    case "REMOVE_SHOW": {
      return state.filter((tv) => tv._id != action.payload);
    }

    default: {
      return [...state];
    }
  }
};

export default tvShowsReducer;
