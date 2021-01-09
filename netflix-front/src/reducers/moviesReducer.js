const moviesInitial = [];

const moviesReducer = (state = moviesInitial, action) => {
  switch (action.type) {
    case "ADD_MOVIE": {
      return [action.payload, ...state];
    }

    case "SET_MOVIES": {
      return [...action.payload];
    }

    case "REMOVE_MOVIE": {
      return state.filter((movie) => movie._id != action.payload);
    }

    case "UPDATE_MOVIE": {
      return state.map((movie) => {
        console.log("update reducers part");
        if (movie._id == action.payload._id) {
          console.log(movie._id, action.payload._id, movie, action.payload);
          return {...movie, ...action.payload};
        } else {
          return {...movie};
        }
      });
    }

    default: {
      return [...state];
    }
  }
};

export default moviesReducer;
