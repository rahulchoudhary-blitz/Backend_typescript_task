import { Request, Response, NextFunction } from 'express';
import BillService from '@/services/bills.service';
import { Task } from '@/interfaces/controller.interface';
import { MulterRequest } from '@/interfaces/multer.interface';
import { nextDay } from 'date-fns';
import { stream } from '@utils/logger';


class BillController {
private billServices = new BillService();
  /**
 * Create Bill controller
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 */

  public createBill = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { lable, amount }:Task = req.body;
      const createdData: Task = await this.billServices.createData(lable, amount);
      return res.status(201).json(createdData);
    } catch (error) {
      next(error);
    }
  };
 /**
   * get all bill data
   * * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  public getBillData = async (req: any, res: Response, next: NextFunction): Promise<Response> => {
    try {
      let page: number = parseInt(req.query.page);
      let limit: number = parseInt(req.query.limit);
      const paginatedData: Task[] = await this.billServices.getTask(page, limit);
      return res.status(200).json(paginatedData);
    } catch (err) {
      next(err);
    }
  };
 /**
   * delete controller
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
 public deleteBill = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const tempId:string  = req.params.id;
      const deleteData: Task = await this.billServices.deleteData(tempId);
      return res.status(200).json(deleteData);
    } catch (err) {
      next(err);
    }
  };
 /**
   * searchByText
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  public searchByText = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const  tempLable:string  = req.params.lable;
      const searchData:Task = await this.billServices.searchData(tempLable);
      return res.status(200).json(searchData);
    } catch (err) {
      next(err);
    }
  };
 /**
   * searchByDate
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  public searchByDate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const searchData:Task[] = await this.billServices.searchDate(req.params.start_date, req.params.end_date);
      return res.status(200).json({ success: true, searchData });
    } catch (err) {
      next(err);
    }
  };
  /**
   * update the bill controller
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  public updateBill = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const id: string = req.params.id;
      const { lable, amount }:Task = req.body;
      const updatedValue: Task = await this.billServices.updateBill(id, lable, amount);
      return res.status(200).json(updatedValue);
    } catch (error) {
      next(error);
    }
  };
 /**
   * Csv file data controller
   * * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>}
   */
  public addDataCsv = async (req: MulterRequest, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const stucturedTasks: Object[] = req.stuctruedTasks;
      const addData: Task[] = await this.billServices.createCsv(stucturedTasks);
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

export default BillController;
