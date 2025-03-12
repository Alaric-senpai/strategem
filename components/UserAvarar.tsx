'use client'

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default  function AvatarComponent(){
    const { user} = useUser()
    return(
        <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback >
                {user?.username}
            </AvatarFallback>
        </Avatar>
    )
}