let newArr=[];
const checkForPublic =  (data)=>{
    newArr=[];
for (let index = 0; index < data.length; index++) {
    if(data[index].visibility === 'public'){
        
        newArr.push(data[index])
    };;
}
return newArr;
}

module.exports= checkForPublic;