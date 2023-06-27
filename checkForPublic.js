const newArr=[];
const checkForPublic =  (data)=>{
for (let index = 0; index < data.length; index++) {
    if(data[index].private === false){
        newArr.push(data[index])
    };;
}
return newArr;
}

module.exports= checkForPublic;