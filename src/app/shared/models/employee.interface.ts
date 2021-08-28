/**
 * Title: employee.interface.ts
 * Author: Richard Krasso
 * Modified By: James Pinson
 * Date: 28 August 2021
 * Description: This is our employee interface which is created for reusability.
 */

//This is our import statements.
import { Item } from './item.interface';

//This exports our employee interface which consist of three variables the empId variable which has a string value, the todo variable which has an item array and the done variable which has an item array.
export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
