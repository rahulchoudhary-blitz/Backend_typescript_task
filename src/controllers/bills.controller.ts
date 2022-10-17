import { Request, Response, NextFunction } from 'express';
import BillService from '@/services/bills.service';
import { Task } from '@/interfaces/controller.interface';
import { MulterRequest } from '@/interfaces/multer.interface';



class BillsController {
private billServices = new BillService();
  /**
 * Create Bill controller
 * @param {Request} req includes lable, amount 
 * @param {Response} res will be an Object of type Task
 * @param {NextFunction} next will pass erro into errorhandler
 * @returns {Promise<Response>}
 */

  public createBill = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      // const { name, age }: { name: string; age: number } = body.value
      const { lable, amount } : Task = req.body;
      const createdData : Task = await this.billServices.createData(lable, amount);
      return res.status(201).json(createdData);
    } catch (error) {
      next(error);
    }
  };
 /**
   * get all bill data
   * @param {Request} req includes page and page_size
   * @param {Response} res will be an Object of type Task
   * @param {NextFunction} next will pass erro into errorhandler 
   * @returns {Promise<Response>}
   */
  public getBillData = async (req : any, res : Response, next : NextFunction) : Promise<Response> => {
    try {
      const  page : number = parseInt(req.query.page);
      const page_size : number = parseInt(req.query.page_size);
      const billData : Task[] = await this.billServices.getTask(page, page_size);
      console.log(page, page_size);
      
      return res.status(200).json({billData,
      meta :{
        page_no : page + 1,
        page_size : billData.length,
        has_more : billData.length === page_size
      }
    });
    } catch (err) {
      next(err);
    }
  };
 /**
   * delete controller
   * @param {Request} req includes fields as query params and an id
   * @param {Response} res will be an Object of type Task
   * @param {NextFunction} next will pass erro into errorhandler
   * @returns {Promise<Response>}
   */
 public deleteBill = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
    try {
      const tempId : string  = req.params.id;
      const deleteData : Task = await this.billServices.deleteData(tempId);
      return res.status(200).json(deleteData);
    } catch (err) {
      next(err);
    }
  };
 /**
   * searchByText
   * @param {Request} req includes fields as query params and an lable
   * @param {Response} res will be an Object of type Task
   * @param {NextFunction} next will pass erro into errorhandler
   * @returns {Promise<Response>}
   */
  public searchByText = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
    try {
      const  tempLable : string  = req.params.lable;
      const searchData : Task = await this.billServices.searchData(tempLable);
      return res.status(200).json(searchData);
    } catch (err) {
      next(err);
    }
  };
 /**
   * searchByDate
   * @param {Request} req includes start_date, end_date
   * @param {Response} res will be an Object of type Task
   * @param {NextFunction} next will pass erro into errorhandler
   * @returns {Promise<Response>}
   */
  public searchByDate = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
    try {
      const searchData : Task[] = await this.billServices.searchDate(req.params.start_date, req.params.end_date);
      return res.status(200).json({ success: true, searchData });
    } catch (err) {
      next(err);
    }
  };
  /**
   * update the bill controller
   * @param {Request} req includes lable and amount and query params and an id
   * @param {Response} res will be an Object of type Task
   * @param {NextFunction} next will pass erro into errorhandler
   * @returns {Promise<Response>}
   */
  public updateBill = async (req : Request, res : Response, next : NextFunction) : Promise<Response> => {
    try {
      const id : string = req.params.id;
      const { lable, amount } : Task = req.body;
      const updatedValue : Task = await this.billServices.updateBill(id, lable, amount);
      return res.status(200).json(updatedValue);
    } catch (error) {
      next(error);
    }
  };
 /**
   * Csv file data controller
   * * @param {Request} req includes stuctruedTasks which is validated and structured to json
   * @param {Response} res wil be an object of type Task
   * @param {NextFunction} next will pass erro into errorhandler
   * @returns {Promise<Response>}
   */
  public addDataCsv = async (req : MulterRequest, res : Response, next : NextFunction) : Promise<Response> => {
    try {
      const stucturedTasks : Object[] = req.stuctruedTasks;
      const addData : Task[] = await this.billServices.createCsv(stucturedTasks);
      return res.status(200).json(addData);
    } catch (err) {
      next(err);
    }
  };
//delete all data
// public deletetask = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
//   try{
//   const deleted: Task = await this.billServices.deleteAllData();
//   return res.status(200).json(deleted);
// } catch(err){
//   next(err);
// }
// }


}

export default BillsController;
