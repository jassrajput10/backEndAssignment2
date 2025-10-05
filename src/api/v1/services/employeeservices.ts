import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Employee } from "../models/employees";
import { employees } from '../../../data/employees';
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

//reference to the firestore collection name
const COLLECTION: string = "employees";

/**
 * Retrieves all employees
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try{
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: Number(doc.id),
                ...data,
            
            } as Employee;
        });

        return structuredClone(employees);
    } catch (error: unknown) {
        throw error;
    }
    
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
    try {
        const newEmployee: Partial<Employee> = {
            ...data,
        };

        const newId: number = Number(await createDocument(COLLECTION, newEmployee));
        newEmployee.id = newId;

        return structuredClone(newEmployee as Employee);
    } catch (error: unknown) {
        throw error;
    }

    
};




/**
 * Updates (replaces) an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - this will update the given fields in employeedata 
 * @returns The updated employee
 * @throws Error if employee with given ID is not found
 */
export const updateEmployee = async (
    id: number,
    employeedata: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee> => {
    const index: number = employees.findIndex((employee: Employee) => employee.id === id)

    if (index === -1) {
        throw new Error(`Employee with this Id ${id} not found`);

    }
    employees[index] = {
        ...employees[index],
        ...employeedata,
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes a branch from storage
 * @param id - The ID of the branch to delete
 * @throws Error if branch with given ID is not found
 */
export const deleteEmployee = async (id:number): Promise<void> => {
    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1) {
        throw new Error(`Employee with this Id ${id} not found`);

    }

    employees.splice(index, 1);
};

//export const getEmployeeById = async (
  //  id: number
//): Promise<Employee