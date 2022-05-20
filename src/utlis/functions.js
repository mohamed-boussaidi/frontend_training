export function getProductListFromArray(data){
    var dataString=""
    data.map((item,index)=>{
        if(data.length===index+1){
            dataString+=item.nom

        }else{
            dataString+=item.nom+", "
        }
    })
    return dataString
}