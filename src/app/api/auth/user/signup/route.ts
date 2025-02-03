"use server";

import { authOptions } from '@/lib/AuthOptions';
import { CompanyDatabaseHandler } from '@/lib/prisma/CompanyService';
import { createUser, findUsers } from '@/lib/prisma/UserService';
import { User } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';

import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
  const { name, email, password, companyKey } = await req.json();

  try {
    // Validate user existence
    const user = await findUsers({ email });
    if (user.length !== 0) {
      return NextResponse.json(
        { message: "Usuario com email já cadastrado" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // Validate company existence
    const company = await CompanyDatabaseHandler.findCompany({ id: companyKey });
    if (!company.length) {
      return NextResponse.json(
        { message: "Invalid company key" },
        { status: HttpStatusCode.BadRequest }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser: any = {
      name,
      email,
      password: hashedPassword,
      companyId: companyKey || null, // Nullable if no company key provided
      createdAt: new Date(),
      departmentId: null, // Set explicitly to null
      role: "EMPLOYEE",
    };

    const savedUser = await createUser(newUser);

    // Start a new session with NextAuth
    const session = await getServerSession(authOptions);
    console.log(session)
    if (session) {
      // @ts-expect-error
      session.userId = savedUser.id;
      // @ts-expect-error
      session.role = savedUser.role;
      // @ts-expect-error
      await session.save();
    }

    return NextResponse.json({ message: "Signup successful!" });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}