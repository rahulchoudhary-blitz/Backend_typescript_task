import { MulterRequest } from "@/interfaces/multer.interface";
import { NextFunction, Request, Response } from "express";
import csv from 'csvtojson'
import { JsonCsv } from "@/interfaces/jsonCsvFile.interface";
// import { checkNameLength, checkRequiredFields } from "@/helpers/validation.helpers";

const validateFile = async (req:MulterRequest, res:Response, next:NextFunction) => {
try{
    const jsonData:JsonCsv[] = await csv().fromFile(req.file.path);
   		let allTasks:Object[] = [];
		jsonData.forEach((element) => {
            let lable:string = element.lable.trim();
			let amount:number = element.amount;
			
            // if(!checkRequiredFields){
            //     return res.status(401).json({message: 'All feilds are required'})
            // }
            // if(!checkNameLength){
            //     return res.status(401).json({message: 'Name should not be more than 20 letters  '})
            // }
          const billData:Object = {
				lable,
                amount
			};
			allTasks.push(billData);
		});
        req.stuctruedTasks = allTasks;
		next();
}catch(err){
    next(err)
}

}
export default validateFile;





