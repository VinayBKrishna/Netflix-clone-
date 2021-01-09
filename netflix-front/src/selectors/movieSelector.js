export const findMovie = (movies,id)=>{
    return movies.find(movies =>movies._id ==id)
}

