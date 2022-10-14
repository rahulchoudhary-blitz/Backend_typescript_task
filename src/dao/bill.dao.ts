import billModel from '@models/bill.model';
import { Task } from '@/interfaces/controller.interface';

class BillDao {
  public bills = billModel;
  /**
   * create a new task 
   * @param lable
   * @param amount
   * @returns {Promise<Task>}
   */
  public createBill = async (lable: string, amount: number): Promise<Task> => {
    return await this.bills.create({
      lable: lable,
      amount: amount,
    });
  };
 /**
   * Get all require data
   * @param page
   * @param limit
   * @returns {Promise<Task[]>}
   */
  public getAllData = async (page: number, limit: number): Promise<Task[]> => {
    const skip = page * limit;
    return await this.bills.find({ is_deleted: false }).limit(limit).skip(skip).lean()
  };
 /**
   * Delete useing id and delete
   * @param id
   * @returns {Promise<Task>}
   */
  public findAndDelete = async (id: string): Promise<Task> => {
    return await this.bills.findByIdAndUpdate(id, { is_deleted: true }).lean();
  };
 /**
   * search by text
   * @param lable
   * @returns {Promise<Task>}
   */
  public searchByText = async (lable: string): Promise<Task> => {
    return await this.bills.find({ lable }).lean();
  };
 /**
   * search by date
   * @param start_date
   * @param to
   * @returns {Promise<Task[]>}
   */
  public searchByDate = async (start_date: string, end_date: string): Promise<Task[]> => {
    return await this.bills.find({
      createdAt: {
        $gte: start_date,
        $lte: end_date
      },
    }).lean();
  };
  /**
   * update by using id
   * @param id
   * @param lable
   * @param amount
   * @returns {Promise<Task>}
   */
  public async findAndUpdate(id: string, lable: string, amount: number): Promise<Task> {
    return await this.bills.findByIdAndUpdate(id, {
      lable,
      amount,
    },{new:true}
    ).lean()
  }
  /**
   * upload csv file
   * @param data
   * @returns {Promise<Task[]>}
   */
  public async storeToDb(data: Object[]): Promise<Task[]> {
    return await this.bills.create(data);
  }
  //delete all data
// public async deleteAll():Promise<any>{
//   return await this.bills.deleteMany()
// }

 
}

export default BillDao;

