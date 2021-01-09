import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  userReducer  from '../reducers/userReducer'
import moviesReducer from '../reducers/moviesReducer'
import tvShowsReducer from '../reducers/tvShowsReducer'

const configureStore = () =>{
    const store = createStore(combineReducers({
        user:userReducer,
        movies:moviesReducer,
        tvShows:tvShowsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore