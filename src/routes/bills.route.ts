import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import BillController from '@/controllers/bills.controller';
import multer from 'multer';
import validateFile from '@/middlewares/validationCsv.middleware';

class TasksRoute implements Routes {
  public path = '/bills';
  public router = Router();
  public billController = new BillController();
  public upload = multer({ dest: 'uploads/csv/' });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.billController.createBill);
    this.router.post(`${this.path}/uploadcsv`, this.upload.single('file'), validateFile, this.billController.addDataCsv);
    this.router.get(`${this.path}`, this.billController.getBillData);
    this.router.get(`${this.path}/:lable`, this.billController.searchByText);
    this.router.get(`${this.path}/:from/:to`, this.billController.searchByDate);
    this.router.put(`${this.path}/:id`, this.billController.updateBill);
    this.router.delete(`${this.path}/:id`, this.billController.deleteBill);
  }
}

export default TasksRoute;
