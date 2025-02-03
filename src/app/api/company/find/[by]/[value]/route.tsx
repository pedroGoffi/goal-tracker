"use server";
import { CompanyDatabaseHandler } from "@/lib/prisma/CompanyService";
import { Company } from "@prisma/client";
import { NextMiddlewareResult } from "next/dist/server/web/types";
// Corrected code with named exports for each HTTP method
import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { useContext } from "react";

async function findByUUID(uuid: string): Promise<Company | null> {
    const companies = await CompanyDatabaseHandler.findCompany({ id: uuid })
    return companies[0]
}
async function findByUserId(userId: string): Promise<Company | null> {
    const companies = await CompanyDatabaseHandler.findCompany(
        {
            users: { some: { id: userId  } } 
        },
        {
            users: true
        }
    )    
    return companies[0]
}

async function findCompanyBy(by: string, value: string): Promise<Company | null> {
    switch(by){
        case "uuid":    return await findByUUID(value);
        case "userId":  return await findByUserId(value);
    }
    
    return null
}

export async function POST(req: NextRequest, { params }: any) {            
    const { by, value } = await params
    // Check for missing params
    if (!by || !value) {
        return NextResponse.json({ 
            status: 400, error: "'by' and 'value' query parameters are required." 
        });
    }

    const company: Company | null = await findCompanyBy(by, value)
    if(company){
        return NextResponse.json({ company: company })
    }
    
    return NextResponse.json({ message: "company not found" }, { status: 404 });
}
