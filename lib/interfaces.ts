import { Roles } from "@/types/globals";

export type NewUser = {
    clerkid:string;
    username:string;
    fullname:string;
    role:Roles;
    email?:string;
}   