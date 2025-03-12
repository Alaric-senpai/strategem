import {Client, Account} from 'appwrite'

export const client = new Client()
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!)
    


export const account = new Account(client)

export {ID} from 'appwrite'