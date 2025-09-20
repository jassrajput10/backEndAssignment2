import { Employee } from "../models/employees";
import { employees } from "src/data/employees";

 

/**
 * Retrieves all employees
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
}


/**
 * Creates a new employee
 * @param employeedata - this is for the data of new employee(name, pposition,department,
 * email,phone, branchId)
 * id: Date.now - this will generate the new id 
 * @returns The created employee with generated ID
 */
export const createEmployee = async (data: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
}): Promise<Employee> => {
    const newdata: Employee = {
        id: Date.now(),
        name: data.name,
        position: data.position,
        department: data.department,
        email: data.email,
        phone: data.phone,
        branchId: data.branchId,
    };

    employees.push(newdata);

    return structuredClone(newdata);
};