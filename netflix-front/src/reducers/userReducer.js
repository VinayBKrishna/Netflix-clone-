const userInitial = {}

const userReducer = (state = userInitial,action)=>{
    switch(action.type){
        case 'SET_USER':{
            return {...action.payload}
        }
        case 'REMOVE_USER':{
            return userInitial
        }
        default:{
            return {...state}
        }
    }
}

export default userReducer