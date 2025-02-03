"use server"
import { findUsers } from "@/lib/prisma/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
    const { userId } = await context.params

    try {
        const user = await (await findUsers({id: userId})).pop()
        if(!user) 
            return NextResponse.json({error: "invalid user"})
                
        // @ts-ignore
        delete user.password
                
        return NextResponse.json({user: user})
    } catch(error: any) {
        console.error(`[SERVER ERROR]: ${error}`)

        return NextResponse.json({error: "failed to fetch user"})
    }
}