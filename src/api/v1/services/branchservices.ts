import type { branches } from "../../../api/v1/models/branches";
import { branchData } from "../../../data/branches";


/**
 * gets all branches
 * @returns a full list of the branches
 */
export const getAllBranches = async(): Promise<branches[]> => {
    return structuredClone(branchData);
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
    const newBranch: branches = {
        id: Date.now(),
        name: newBranchData.name,
        address: newBranchData.address,
        phone: newBranchData.phone,
    };
    
    branchData.push(newBranch)

    return structuredClone(newBranch)


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
    branch: Pick<branches, "name" | "address"| "phone"> 
): Promise<branches> => {
    const index: number = branchData.findIndex((b: branches) => b.id === id);

    if (index === -1) {
        throw new Error(`Branch with ID ${id} is not found`)
    }

    branchData[index] = {
        ...branchData[index],
        ...branch
    };

    return structuredClone(branchData[index]);


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
