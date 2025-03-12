'use client'

import { useAuth, useUser } from "@clerk/nextjs"
import { AddUser, findUser } from "./documents"
import { currentUser, User } from "@clerk/nextjs/server"
import { NewUser } from "@/lib/interfaces"

export  async function getUser(){
    const  {user} = useUser()
    return user
}

/**
 * checks if user is already registered in the appwrite database
 */
export async function ValidateUser(){
    const {userId } =  useAuth()


    const  user = await currentUser()

    const data:NewUser = {
        clerkid: user?.id!,
        username: user?.username!,
        fullname: user?.fullName!,
        role: "client"
    }

    const validate = await findUser(userId!)

    if(!validate?.success){
        const addUser = await AddUser(data)

        return addUser.success ? { addUser }: {...addUser, failed:true}
    }
    return validate
}   