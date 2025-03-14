import { Databases } from 'appwrite'
import {client} from './appwrite'

const DATABASE_ID = process.env.NEXT_PUBLIC_DB_ID!
const USER_COLLECTION =process.env.NEXT_PUBLIC_USERS_COLLECTION!
const PROJECTS_COLLECTION = process.env.NEXT_PUBLIC_PROJECTS_COLLECTION!
const CHATS_COLLECTION=process.env.NEXT_PUBLIC_CHATS_COLLECTION!
const CLIENTS_COLLECTION=process.env.NEXT_PUBLIC_CLIENTS_COLLECTION!
const API_KEY  = process.env.NEXT_PUBLIC_APPWRITE_API_KEY!
const databases = new Databases(client)


export { databases, DATABASE_ID, USER_COLLECTION, CHATS_COLLECTION, API_KEY, PROJECTS_COLLECTION, CLIENTS_COLLECTION }