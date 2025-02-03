import { NextRequest, NextResponse } from "next/server";

export const ProtectedRoutes: Set<string> = new Set([
    "my-company",     
])

export default async function middleware(req: NextRequest) {
    console.log(req.nextUrl)

    return NextResponse.next()
}