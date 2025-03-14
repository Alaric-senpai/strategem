import { Query } from "appwrite";
import { ID } from "./appwrite";
import { CHATS_COLLECTION, CLIENTS_COLLECTION, DATABASE_ID, databases, PROJECTS_COLLECTION, USER_COLLECTION } from "./database";
import { NewClient, NewUser } from "@/lib/interfaces";

export async function findUser(clerkid: string) {

  try {
    const results = await databases.listDocuments(DATABASE_ID, USER_COLLECTION, [
      Query.equal("clerkid", clerkid)
    ]);
    if (results.documents.length > 0) {
      return { success: true, user: results.documents[0] };
    } else {
      return { success: false, message: "User does not exist" };
    }
  } catch (error) {
    return { success: false, message: "Database query failed", error };
  }
}

export async function findClient(userid: string) {
  try {
    const results = await databases.listDocuments(DATABASE_ID, CLIENTS_COLLECTION, [
      Query.equal("userid", userid)
    ]);

    if (results.documents.length > 0) {
      return { success: true, user: results.documents[0] };
    } else {
      return { success: false, message: "User does not exist" };
    }
  } catch (error) {
    return { success: false, message: "Database query failed", error };
  }
}

export async function getTotalProjectsForUser(clerkid: string) {
  try {
    const results = await databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION, [
      Query.equal("userid", clerkid)
    ]);

    return { success: true, projects: results.documents };
  } catch (error) {
    return { success: false, message: "Failed to fetch projects", error };
  }
}

export async function getTotalChatsForUser(clerkid: string) {
  try {
    const results = await databases.listDocuments(DATABASE_ID, CHATS_COLLECTION, [
      Query.equal("userid", clerkid)
    ]);

    return { success: true, chats: results.documents };
  } catch (error) {
    return { success: false, message: "Failed to fetch chats", error };
  }
}

export async function getAllUsers() {
  try {
    const results = await databases.listDocuments(DATABASE_ID, USER_COLLECTION);
    return { success: true, users: results.documents };
  } catch (error) {
    return { success: false, message: "Failed to fetch users", error };
  }
}

export async function AddUser(data: NewUser) {
  try {
    const fn = await databases.createDocument(DATABASE_ID, USER_COLLECTION, ID.unique(), data);



    // console.log("form add User function")
    // console.log("User added Return", fn)

    if (fn.$id) {
      return { success: true, result: fn };
    }


    return { success: false, message: "Failed to create user", result: fn };
  } catch (error) {
    return { success: false, message: "Database error while creating user", error };
  }
}
export async function AddClient(data: NewClient) {
  try {
    const fn = await databases.createDocument(DATABASE_ID,  CLIENTS_COLLECTION ,ID.unique(), data);



    // console.log("form add User function")
    // console.log("User added Return", fn)

    if (fn.$id) {
      return { success: true, result: fn };
    }


    return { success: false, message: "Failed to create user", result: fn };
  } catch (error) {
    return { success: false, message: "Database error while creating user", error };
  }
}
