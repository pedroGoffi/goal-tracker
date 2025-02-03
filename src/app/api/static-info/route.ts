"use server";

import { CompanyDatabaseHandler } from "@/lib/prisma/CompanyService";
import { Company } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface EnvInfo {
    OWNER_NAME:      string
    OWNER_NUMBER:    string
    OWNER_EMAIL:     string
    FACEBOOK_URL:    string
    INSTAGRAM_URL:   string
    TWITTER_URL:     string
    LINKEDIN_URL:    string
    APP_VERSION:     string
}
export async function POST(req: NextRequest) {    
    try {   
        const envData: EnvInfo = {     
            OWNER_NAME:     process.env.OWNER_NAME!,
            OWNER_NUMBER:   process.env.OWNER_NUMBER!,
            OWNER_EMAIL:    process.env.OWNER_EMAIL!,
            FACEBOOK_URL:   process.env.FACEBOOK_URL!,
            INSTAGRAM_URL:  process.env.INSTAGRAM_URL!,
            TWITTER_URL:    process.env.TWITTER_URL!,
            LINKEDIN_URL:   process.env.LINKEDIN_URL!,
            APP_VERSION:    process.env.APP_VERSION!
        }
        return NextResponse.json({ data: envData })
    } catch (error) {
        console.log(error)        
        return NextResponse.json({ error: 'Failed get static data' }, { status: 500 });
    }
}
