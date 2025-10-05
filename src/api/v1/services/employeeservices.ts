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
import { number } from "node_modules/joi/lib";
import { error } from "console";

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
 * Retrieves a single employee by ID from the database
 * @param id - This ID of the employee to retrieve
 * @returns The employee if found
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const employeeId: Employee = {
        id: Number(doc.id),
        ...data,
    } as Employee;

    return structuredClone(employeeId);
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
        
    try {
        const employee: Employee = await getEmployeeById(id.toString());
        if(!employee) {
            throw new Error(`Employee with ${id} not found`);
        }

        const updateEmployee: Employee = {
            ...employee,
        };

        // this will update only provided employee fields

        if (employeedata.name !== undefined) 
            updateEmployee.name = employeedata.name;
        if (employeedata.position !== undefined)
            updateEmployee.position = employeedata.position;
        if (employeedata.department !== undefined) 
            updateEmployee.department = employeedata.department;
        if (employeedata.email !== undefined)
            updateEmployee.email = employeedata.email;
        if (employeedata.phone !== undefined)
            updateEmployee.phone = employeedata.phone;
        if (employeedata.branchId !== undefined)
            updateEmployee.branchId = employeedata.branchId;
        

        await updateDocument<Employee>(COLLECTION, id.toString(), updateEmployee);
        
        return structuredClone(updateEmployee);
    
    } catch (error:unknown) {
        throw error;
    }
    
};

/**
 * Deletes a employee from storage
 * @param id - The ID of the employee to delete
 * @throws Error if employee with given ID is not found
 */
export const deleteEmployee = async (id:number): Promise<void> => {
    try {
        const employee: Employee = await getEmployeeById(id.toString());
        if (!employee) {
            throw new Error(`Employee with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id.toString());
    } catch (error: unknown) {
        throw error;
    }
};

