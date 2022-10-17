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
 * check the lable and amount data 
 * @param {String} str 
 * @returns {Boolean}
 */
const checkChar = (str:string)=>{
	if (str.match("[a-zA-Z]+$")){
        return true
    }
    return false;
};

/**
 * check the specialChar included or not
 * @param {Boolean} str 
 * @returns {Boolean} 
 */
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

