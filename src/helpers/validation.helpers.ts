/**
 * Checking the require fields
 * @param {String} lable 
 * @param {Number} amount 
 * @returns {Boolean} 
 */
const checkRequiredFields = (lable:string,amount:number)=>{
    if(lable === ''|| lable.length<1 || !amount || amount < 1 ){
       return true;
    }
    return false;
};
/**
 * check the lable data
 * @param lable 
 * @returns {Boolean}
 */
const checkChar = (str:string)=>{
	if (str.match("[a-zA-Z]+$")){
        return true
    }
    return false;
};

const checkSpecialChars = (str:string) => {
	const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;
	const lable = specialChars.split('').some((specialChars) => {
		if (str.includes(specialChars)) {
			return true;
		}
		return false;
	});
	return lable;
};
export {checkRequiredFields, checkSpecialChars, checkChar}

/**
 * lable--> not no, empty string 
 * amount --> not string , no < 1, 
 * 
 */