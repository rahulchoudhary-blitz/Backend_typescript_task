import {Request, Response, NextFunction} from 'express';
import BillService from "@/services/bills.service";
import { Task } from "@/interfaces/bills.interface";
import { MulterRequest } from "@/interfaces/multer.interface";
// import { defaultMaxListeners } from 'events';

/**
 * Create Bill controller
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
class BillController {
    private services  = new BillService();
    
    public createBill = async (req:Request,res:Response, next:NextFunction) => {
        try{
            const {lable, amount} = req.body;
            const createdData:Task = await this.services.createData(lable, amount);
            res.status(201).json(createdData);
        } catch (error) {
            next(error)
        }
    }
   

/**
 * get all bill data
 * @param req 
 * @param res 
 * @param next 
 */
 public getBillData = async (req:Request, res:Response, next:NextFunction)=>{
    try{
  let page:number =parseInt(req.query.page.toString());
     let limit:number =parseInt(req.query.limit.toString());
    const paginatedData:Task[] = await this.services.getTask(page, limit);
    res.status(200).json(paginatedData)
    }catch(err){
        next(err);
    }
 }


/**
 * delete controller 
 * @param req 
 * @param res 
 * @param next 
 */
public deleteBill = async (req:Request, res:Response, next:NextFunction)=>{
try{
            const {id} = req.params;
            const deleteData:Task = await this.services.deleteData(req.params.id);
            res.status(200).json(deleteData);
}catch(err){
    next(err);
}
}


/**
 * searchByText
 * @param req 
 * @param res 
 * @param next 
 */
public searchByText = async (req:Request, res:Response, next:NextFunction)=>{
  try{
   
        const { lable } = req.params;
        const searchData = await this.services.searchData(req.params.lable);
        res.status(200).json({ success: true, searchData });
  }catch(err){
    next(err);
  }

}

/**
 * searchByDate 
 * @param req 
 * @param res 
 * @param next 
 */
public searchByDate = async (req:Request, res:Response, next:NextFunction)=>{
    try{
       const searchData = await this.services.searchDate(req.params.from, req.params.to)
        res.status(200).json({ success: true, searchData });
    }catch(err){
         next(err)
    }
  
	
}
/**
 * update the bill controller
 * @param req 
 * @param res 
 * @param next 
 */
public updateBill = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const id:string = req.params.id;
        const { lable, amount } = req.body;
       const updatedValue:Task = await this.services.updateBill(id,lable,amount);
        res.status(200).json(updatedValue);
    } catch (error){
        next(error)
    }
}

/**
 * Csv file data controller
 * @param req 
 * @param res 
 * @param next 
 */
public addDataCsv = async (req:MulterRequest,res:Response, next:NextFunction) => {
    try{
        const stucturedTasks:Object[] = req.stuctruedTasks;
        const addData:Task[] = await this.services.createCsv(stucturedTasks)
        res.status(200).json(addData);
    }catch(err){
        next(err)
    }
}
}

export default BillController;

