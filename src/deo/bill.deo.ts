import billModel from '@models/bill.model';
import {Task} from '@/interfaces/bills.interface';


class BillDeo {

    public bills = billModel;
    /**
     * create a new task dao
     * @param lable 
     * @param amount 
     * @returns {Promise<Task>}
     */
     public createBill = async (lable:string,amount:number): Promise<any> => {
        return await this.bills.create({
            lable: lable,
            amount: amount
        });
    };
    
   /**
    * Get all require data
    * @param page 
    * @param limit 
    * @returns {Promise<Task[]>}
    */
   public getAllData = async (page:number, limit:number): Promise<any> => {
        const skip = page*limit 
    return await this.bills.find({ isDeleted: false }).limit(limit).skip(skip);
   }


  
   /**
    * Delete useing id and delete
    * @param id 
    * @returns {Promise<>}
    */
public findAndDelete = async (id:string): Promise<any> =>{
    return await this.bills.findByIdAndUpdate(id, {isDeleted: true});
}

/**
 * search by text
 * @param lable 
 * @returns {Promise<>}
 */
public searchByText = async (lable:string): Promise<any> =>{
    return await this.bills.find({lable}).lean();

};

/**
 * search by date
 * @param from 
 * @param to 
 * @returns {Promise<>}
 */
public searchByDate = async (from:string, to:string): Promise<any> =>{
    return await this.bills.find({
        createdAt: {
            $gte: from,
            $lte: to
        }
    });
}

/**
 * update by using id
 * @param id 
 * @param lable 
 * @param amount 
 * @returns {Promise<>}
 */
public async findAndUpdate (id:string,lable:string, amount:number):Promise<Task> {
    await this.bills.findByIdAndUpdate(id, {
        lable,
        amount
     });
    return await this.bills.findById(id).lean();
};

/**
 * upload csv file
 * @param data 
 * @returns {Promise<Object>}
 */
public async storeToDb(data:Object[]):Promise<Task[]>{
    return await this.bills.create(data)
}


}

export default BillDeo;