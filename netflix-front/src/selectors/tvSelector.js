export const findTvShow = (tv,id)=>{
    return tv.find(tv =>tv._id == id)
}