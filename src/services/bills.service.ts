import BillDeo from "@/deo/bill.deo";
import {Task} from "@/interfaces/bills.interface";


class BillService{
    private BillDeo = new BillDeo();


/**
 * createData in database
 * @param lable 
 * @param amount 
 * @returns {Promise<>}
 */
public async createData(lable:string, amount:number):Promise<Task>{
    return await this.BillDeo.createBill(lable, amount);
}

/**
 * get all data from database
 * @param page 
 * @param limit 
 * @returns 
 */
public async getTask(page:number,limit:number):Promise<Task[]>{
    return await this.BillDeo.getAllData(page,limit)
}

/**
 * delete data using particuler id
 * @param id 
 * @returns 
 */
public async deleteData(id:string):Promise<Task>{
    return await this.BillDeo.findAndDelete(id)
}


/**
 * search by text
 * @param lable 
 * @returns 
 */
public async searchData(lable:string):Promise<Task>{
 return await this.BillDeo.searchByText(lable)
}

/**
 * search by date
 * @param from 
 * @param to 
 * @returns 
 */
public async searchDate(from:string, to:string):Promise<Task>{
    return await this.BillDeo.searchByDate(from, to)
}


/**
 * update by using id
 * @param id 
 * @param lable 
 * @param amount 
 * @returns 
 */
public async updateBill(id:string, lable:string, amount:number):Promise<Task>{
    return await this.BillDeo.findAndUpdate(id,lable,amount);
}

/**
 * handle the csv file data
 * @param data 
 * @returns 
 */
public async createCsv(data:Object[]):Promise<Task[]>{
    return await this.BillDeo.storeToDb(data);
}

}
export default BillService





   












