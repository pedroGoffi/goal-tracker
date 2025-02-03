import { NextRequest } from "next/server";

export async function POST(req: NextRequest, context: any) {
    const { formdata } = await context.params   

    console.log(formdata)
}