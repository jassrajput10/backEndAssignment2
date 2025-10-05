import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";

import type { branches } from "../../../api/v1/models/branches";
import { branchData } from "../../../data/branches";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "branches";

/**
 * gets all branches
 * @returns a full list of the branches
 */
export const getAllBranches = async(): Promise<branches[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const branches: branches[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: Number(doc.id),
                ...data,
            } as branches;
        });
         return structuredClone(branchData);
    } catch (error: unknown) {
        throw error;
    }
    
};


/**
 *  this is to create a new branch
 * @param newBranchData this is the information about the new branch
 * @returns this will return a new branch
 */
export const createBranch = async (newBranchData: {
    name: string;
    address: string;
    phone: string;
    }
): Promise<branches> => {
    try{
        const branchnew: Partial<branches> = {
            ...newBranchData,
        };

        const newId: number = Number(await createDocument(COLLECTION, branchnew));
        branchnew.id = newId;

        return structuredClone(branchnew as branches);
    } catch (error: unknown) {
        throw error;
    }

    
};



/**
 * Retrieves branch by ID from the database
 * @param id - This ID of the branch to retrieve
 * @returns The branch if found
 */
export const getBranchById = async (id: string): Promise<branches> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const branchId: branches = {
        id: Number(doc.id),
        ...data,
    } as branches;

    return structuredClone(branchId);
};

/**
 * updates an branch
 * @param id the id of hte branch to update
 * @param branchData this is the fields to update
 * @returns the updates branch
 * @throws error if branch with given id is not found
 */
export const updateBranch = async (
    id: number,
    branchData: Pick<branches, "name" | "address"| "phone"> 
): Promise<branches> => {
   try {
           const Branch: branches = await getBranchById(id.toString());
           if(!Branch) {
               throw new Error(`Branch with ${id} not found`);
           }
   
           const updateBranch: branches = {
               ...Branch,
           };
   
           // this will update only provided employee fields
   
           if (branchData.name !== undefined) 
               updateBranch.name = branchData.name;
           if (branchData.address !== undefined)
               updateBranch.address = branchData.address;
           if (branchData.phone !== undefined) 
               updateBranch.phone = branchData.phone;
           
           
   
           await updateDocument<branches>(COLLECTION, id.toString(), updateBranch);
           
           return structuredClone(updateBranch);
       
       } catch (error:unknown) {
           throw error;
       }
};

/**
 *get branch by id
 * @param id the id of the branch
 */
export const getBranchesById =  async (id:number): Promise<void> => {
    const index: number = branchData.findIndex((emp: branches) => emp.id === id);
    
    if (index === -1) {
        throw new Error("Branch with this ID is not found")
    }

};


/**
 * this deletes the branch by id.
 * @param id this is the branch id number.
 * this finds the branch by id and removes it .
 * if the id is not found it throws a error.
 */
export const deleteBranch = async (id:number): Promise<void> => {
    const index: number = branchData.findIndex((b: branches) => b.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} is not found`)
    }

    branchData.splice(index,1);
};
