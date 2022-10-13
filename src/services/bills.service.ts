import BillDeo from '@/deo/bill.deo';
import { Task } from '@/interfaces/bills.interface';

class BillService {
  private BillDeo = new BillDeo();
  /**
   * create new task service
   * @param {String} lable
   * @param {number} amount
   * @returns {Promise<Task>}
   */
  public async createData(lable: string, amount: number): Promise<Task> {
    return await this.BillDeo.createBill(lable, amount);
  }
  /**
   * delete service
   * get all data from database
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Task[]>}
   */
  public async getTask(page: number, limit: number): Promise<Task[]> {
    return await this.BillDeo.getAllData(page, limit);
  }
  /**
   * Delete task service
   * delete data using particuler id
   * @param {String} id
   * @returns {Promise<Task>}
   */
  public async deleteData(id: string): Promise<Task> {
    return await this.BillDeo.findAndDelete(id);
  }
  /**
   * search services
   * search by text
   * @param {String} lable
   * @returns {Promise<Task>}
   */
  public async searchData(lable: string): Promise<Task> {
    return await this.BillDeo.searchByText(lable);
  }
  /**
   * search by date
   * @param {String} from
   * @param {String} to
   * @returns {Promise<Task>}
   */
  public async searchDate(from: string, to: string): Promise<Task[]> {
    return await this.BillDeo.searchByDate(from, to);
  }
  /**
   * update by using id
   * @param {String} id
   * @param {String} lable
   * @param {Number} amount
   * @returns {Promise<Task>}
   */
  public async updateBill(id: string, lable: string, amount: number): Promise<Task> {
    return await this.BillDeo.findAndUpdate(id, lable, amount);
  }
  /**
   * csv file services
   * handle the csv file data
   * @param {Object} data
   * @returns {Promise<Task[]>}
   */
  public async createCsv(data: Object[]): Promise<Task[]> {
    return await this.BillDeo.storeToDb(data);
  }
}
export default BillService;
