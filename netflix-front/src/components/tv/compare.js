export const compare = (arr)=>{
   

     return arr?.sort(comp)

     
   
}

function comp(a,b){
    return (a.original_filename.split("_")[1]-b.original_filename.split("_")[1])
}