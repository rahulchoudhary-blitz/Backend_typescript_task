import billModel from '@models/bill.model';
import { Task } from '@/interfaces/bills.interface';

class BillDeo {
  public bills = billModel;
  /**
   * create a new task dao
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
    return await this.bills.find({ isDeleted: false }).limit(limit).skip(skip);
  };
 /**
   * Delete useing id and delete
   * @param id
   * @returns {Promise<Task>}
   */
  public findAndDelete = async (id: string): Promise<Task> => {
    return await this.bills.findByIdAndUpdate(id, { isDeleted: true });
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
   * @param from
   * @param to
   * @returns {Promise<Task[]>}
   */
  public searchByDate = async (from: string, to: string): Promise<Task[]> => {
    return await this.bills.find({
      createdAt: {
        $gte: from,
        $lte: to,
      },
    });
  };
  /**
   * update by using id
   * @param id
   * @param lable
   * @param amount
   * @returns {Promise<Task>}
   */
  public async findAndUpdate(id: string, lable: string, amount: number): Promise<Task> {
    await this.bills.findByIdAndUpdate(id, {
      lable,
      amount,
    });
    return await this.bills.findById(id).lean();
  }
  /**
   * upload csv file
   * @param data
   * @returns {Promise<Task[]>}
   */
  public async storeToDb(data: Object[]): Promise<Task[]> {
    return await this.bills.create(data);
  }
}

export default BillDeo;
