"use server";
import { CompanyDatabaseHandler } from "@/lib/prisma/CompanyService";
import { Company, Goal, GoalFrequency, GoalStatus, GoalType } from "@prisma/client";
import { NextMiddlewareResult } from "next/dist/server/web/types";
// Corrected code with named exports for each HTTP method
import { NextMiddleware, NextRequest, NextResponse } from "next/server";
import { useContext } from "react";

async function findByUUID(uuid: string): Promise<Company | null> {
    const companies = await CompanyDatabaseHandler.findCompany({ id: uuid })
    return companies[0]
}

async function findCompanyBy(by: string, value: string): Promise<Company | null> {
    if (by === "uuid") {
        return await findByUUID(value)
    }
    return null
}

const hardcodedGoals: Goal[] = [
    {
      id: "1",
      title: "Increase Quarterly Sales",
      description: "Boost sales by 20% in Q1",
      type: GoalType.SALES,
      status: GoalStatus.PLANNED,
      targetValue: 20,
      currentValue: 0,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-03-31"),
      frequency: GoalFrequency.DAILY,
      userId: "user1",
      companyId: "company1",
      departmentId: "department1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Improve Customer Satisfaction",
      description: "Achieve a customer satisfaction score of 90%",
      type: GoalType.CUSTOMER_SATISFACTION,
      status: GoalStatus.IN_PROGRESS,
      targetValue: 90,
      currentValue: 75,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      frequency: GoalFrequency.ANNUALLY,
      userId: "user2",
      companyId: "company2",
      departmentId: "department2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Reduce Operational Costs",
      description: "Lower costs by 10% in the next 6 months",
      type: GoalType.OPERATIONAL,
      status: GoalStatus.PARTIALLY_COMPLETED,
      targetValue: 10,
      currentValue: 5,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-06-30"),
      frequency: GoalFrequency.SEMESTRALLY,
      userId: "user3",
      companyId: "company3",
      departmentId: "department3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      title: "Launch New Product",
      description: "Introduce a new product line in Q2",
      type: GoalType.INNOVATION,
      status: GoalStatus.IN_PROGRESS,
      targetValue: 1,
      currentValue: 0,
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-06-30"),
      frequency: GoalFrequency.ANNUALLY,
      userId: "user4",
      companyId: "company4",
      departmentId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      title: "Achieve Sustainability Certification",
      description: "Obtain ISO 14001 certification by year-end",
      type: GoalType.SUSTAINABILITY,
      status: GoalStatus.PLANNED,
      targetValue: 1,
      currentValue: 0,
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-12-31"),
      frequency: GoalFrequency.ANNUALLY,
      userId: "user5",
      companyId: "company5",
      departmentId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
export async function POST(req: NextRequest, context: any) {            
    const { slug, type, frequency } = await context.params
    console.log("NOTE: returning harcoded data", slug, type, frequency)

    
    return NextResponse.json({ goals: hardcodedGoals });
}
