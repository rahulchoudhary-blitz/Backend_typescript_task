import BillDao from '@/dao/bill.dao';
import { Task } from '@/interfaces/controller.interface';
import billModel from '@models/bill.model';

class BillService {
  private BillDao = new BillDao();
  /**
   * create new task service
   * @param {String} lable
   * @param {number} amount
   * @returns {Promise<Task>}
   */
  public async createData(lable: string, amount: number): Promise<Task> {
    return await this.BillDao.createBill(lable, amount);
  }
  /**
   * get service
   * get all data from database
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Task[]>}
   */
  public async getTask(page: number, limit: number): Promise<Task[]> {
    return await this.BillDao.getAllData(page, limit);
  }
  /**
   * Delete task service
   * delete data using particuler id
   * @param {String} id
   * @returns {Promise<Task>}
   */
  public async deleteData(id: string): Promise<Task> {
    return await this.BillDao.findAndDelete(id);
  }
  /**
   * search services
   * search by text
   * @param {String} lable
   * @returns {Promise<Task>}
   */
  public async searchData(lable: string): Promise<Task> {
    return await this.BillDao.searchByText(lable);
  }
  /**
   * search by date
   * @param {String} start_date
   * @param {String} end_date
   * @returns {Promise<Task>}
   */
  public async searchDate(start_date: string, end_date: string): Promise<Task[]> {
    return await this.BillDao.searchByDate(start_date, end_date);
  }
  /**
   * update by using id
   * @param {String} id
   * @param {String} lable
   * @param {Number} amount
   * @returns {Promise<Task>}
   */
  public async updateBill(id: string, lable: string, amount: number): Promise<Task> {
    return await this.BillDao.findAndUpdate(id, lable, amount);
  }
  /**
   * csv file services
   * handle the csv file data
   * @param {Object} data
   * @returns {Promise<Task[]>}
   */
  public async createCsv(data: Object[]): Promise<Task[]> {
    return await this.BillDao.storeToDb(data);
  }
//delete all
// public async deleteAllData():Promise<any>{
//   return await this.BillDao.deleteAll();
// }


}
export default BillService;
