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

const COLLECTION: string = "branchData";

/**
 * gets all branches
 * @returns a full list of the branches
 */
export const getAllBranches = async(): Promise<branches[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const branchData: branches[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
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

        const newId: string = await createDocument(COLLECTION, branchnew);
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
        id: doc.id,
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
    id: string,
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
 * this deletes the branch by id.
 * @param id this is the branch id number.
 * this finds the branch by id and removes it .
 * if the id is not found it throws a error.
 */
export const deleteBranch = async (id:string): Promise<void> => {
    try {
        const branch: branches = await getBranchById(id.toString());
        if (!branch) {
            throw new Error(`Branch with ID ${id} not found`);
        }
   
        await deleteDocument(COLLECTION, id.toString());
    } catch (error: unknown) {
        throw error;
    }
};
