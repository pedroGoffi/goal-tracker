"use server";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: any) {
  const { slug } = await context.params;

  // Optional: destroy session if it's part of the logout logic
  // @ts-ignore
  req?.session?.destroy();

  // Construct the absolute URL using the request context
  const redirectUrl = new URL('/', req.url); // Ensure the URL is correctly formed

  // Redirect the user to the homepage (or any other page you want)
  return NextResponse.json({
    message: "Company successfuly logged out"
  });
}
