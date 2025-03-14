'use server'

import { currentUser } from "@clerk/nextjs/server";
import { AddClient, AddUser, findClient, findUser } from "./documents";
import { NewClient, NewUser, Plan } from "@/lib/interfaces";

export async function getUser() {
  return await currentUser();
}


export async function ValidateUser() {
  // console.log('invoked')
  const user = await currentUser();


  if (!user) return { success: false, message: "User not authenticated" };

const data: NewUser = {
    clerkid: user.id,
    username: user.username || "unknown",
    fullname: user.firstName + (user.lastName ? ` ${user.lastName}` : "") || "unknown",
    email: user.emailAddresses?.[0]?.emailAddress || undefined,
    authProvider: user.externalAccounts?.[0]?.provider || "username and password",
    profileImage: user.imageUrl || undefined,
    role: "client",
};


  const validate = await findUser(user.id);


  if (!validate?.success) {
    const addUser = await AddUser(data);
    return addUser.success ? { addUser } : { ...addUser, failed: true };
  }

  if(data.role === "client") {

    console.log('User is a client')

      const clientData:NewClient = {
          userid: user.id,
          plan: Plan.BASIC
      }

      if (validate.success) {
        const checkClient = await findClient(user.id);
        if (!checkClient.success) {
          const addClient = await AddClient(clientData);

          if(addClient.success) {
            return { success: true, message: "User is a client" };
          }
          else {    
          return { success: false, message: "User is not a client" };
        }
  }
  }

  return validate;
  }
}