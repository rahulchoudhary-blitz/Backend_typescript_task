

const checkRequiredFields = (lable:string,amount:number)=>{
    if(!lable|| lable.length<3 || !amount || amount < 1 ){
       return true;
    }
    return false;
};

const checkNameLength = (lable:string)=>{
    if(lable.length >20){
        return true
    }
    return false;
};




 
export {checkRequiredFields, checkNameLength}