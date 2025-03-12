import { Query } from "appwrite";
import { client, ID, } from "./appwrite";
import { CHATS_COLLECTION, DATABASE_ID, databases, PROJECTS_COLLECTION, USER_COLLECTION } from "./database";
import { NewUser } from "@/lib/interfaces";


/**
 * find a specific user
 * 
 * @param clerkid
 */


export async function findUser(clerkid:string){

    try {
        
        const results = await databases.listDocuments(DATABASE_ID, USER_COLLECTION,[
            Query.equal('clerkid', clerkid)
        ]);

        if(results.documents.length > 0){
            const user = results.documents[0]
            return user
        }else{
            return {
                success:false,
                message:'User does not exist'

            }
        }

    } catch (error) {
        throw error
    }

}

/**
 * get total projects for user
 * @param clerkid
 */


export async function getTotalProjectsForUser(clerkid:string){

    const results = await databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION, [
        Query.equal('userid', clerkid)
    ])

    if(results){
        return results
    }
    return Error('Error accessing db')
}

/**
 * get total user chats
 * @param clerkid
 * @returns 
 * - documents = array containing all documents fitting this
 * 
 * - total = total records count
 */

export async function getTotalChatsForUser(clerkid:string){
    const results = await databases.listDocuments(DATABASE_ID, CHATS_COLLECTION, [
        Query.equal('userid', clerkid)
    ])

    if(results){
        return results
    }
    return Error('Error accessing db')
}

/**
 * GET ALL USERS REGISTERED CURRENLT CLIENTS
 */


export async function getAllUsers(){

    const results = await databases.listDocuments(DATABASE_ID, USER_COLLECTION)

    return results;
}

/**
 * 
 * create a new User
 * 
 * @param data
 * 
 * @type NewUser 
 * 
 * @returns appwrite creation success
 */
export async function AddUser(data:NewUser){
    const fn = await databases.createDocument(DATABASE_ID, USER_COLLECTION, ID.unique(),
    data
    )

    if(fn.$id){
        return {
            success:true,
            result:fn
        }
    }
    return {
        success:false,
        result:fn
    }
}