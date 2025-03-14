import { Roles } from "@/types/globals";

export type NewUser = {
    clerkid: string;
    username: string;
    fullname: string;
    email?: string;
    authProvider?: string; // e.g., 'oauth_google'
    profileImage?: string;
    role: Roles;
};

export enum Plan {
    BASIC = 'basic',
    PRO = 'personal',
    ENTERPRISE = 'enterprise'
}


export type NewClient = {
    userid: string;
    plan:Plan
}