"use server";

import { authOptions } from '@/lib/AuthOptions';
import { findUsers } from '@/lib/prisma/UserService';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, context: any) {  
  const { email, password } = await req.json();
  try { 
    // Find user in the database
    const user = await findUsers({ email });
    console.log("USER ", user);

    if (user.length === 0) {
      return NextResponse.json({ message: "User not found" });
    }

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" });
    }

    // Log session details by passing req to getServerSession
    const session = await getServerSession()
    
    console.log("FOUND", session);

    // If session exists, save the user data to the session
    if (session) {
      /* @ts-ignore */
      req.session.userId = user[0].id;    
      /* @ts-ignore */ 
      req.session.role = user[0].role;
      /* @ts-ignore */ 
      await req.session.save();
      return NextResponse.json({ message: "Login successful" });
    } else {
      return NextResponse.json({ message: "Session not found" });
    }
  } catch (err: any) {
    console.error("Error: ", err);
    return NextResponse.json({ message: "Internal server error" });  
  }
}
