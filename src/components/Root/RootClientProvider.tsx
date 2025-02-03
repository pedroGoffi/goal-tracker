// app/components/ClientSessionProvider.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ClientSessionProviderProps {
  children: ReactNode;
}

export default function RootClientSessionProvider({ children }: ClientSessionProviderProps){
  return <SessionProvider>{children}</SessionProvider>;
};

