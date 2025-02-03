"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from "next-auth/react";
import { 
  Home, 
  Info, 
  Mail, 
  LogIn, 
  UserPlus, 
  LogOut, 
  User, 
  Loader2, 
  Menu, 
  X, 
  SettingsIcon} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFindUserCompany } from '@/hooks/useFindUserCompany';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Company } from '@prisma/client';
import { Session } from 'next-auth';

interface MobileMenuProps {
  session: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const NavbarLogo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 text-2xl font-bold tracking-tighter transition-opacity hover:opacity-80"
  >
    <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
      Objetivo-Fácil
    </span>
  </Link>
);



interface INavUserItem {
  href:       string
  icon:       React.ReactElement
  text:       string
}
                    
const NavUserDropdownItems =  (companyData: Company): INavUserItem[] => {
  return (
    [
      {
        href:   `/my-company/${companyData.id}`,
        icon:   <User className="h-5 w-5" />,
        text:   `Empresa: ${companyData.nomeEmpresa}`
      },
      {
        href:   '/settings',
        icon:   <SettingsIcon className="h-5, w-5"/>,
        text:   "Configurações"
      },      
    ]
  );
}
const MobileMenu = ({ session, isOpen, setIsOpen }: MobileMenuProps) => {
  const { data: companyData, isLoading } = useFindUserCompany(session?.user?.id);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute left-0 top-full w-full bg-gradient-to-b from-indigo-800/95 to-purple-900/95 backdrop-blur-xl md:hidden"
        >
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <div className="container space-y-4 px-6 py-8">
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-2">
                  <NavItem href="/" icon={<Home className="h-5 w-5" />} label="Início" />
                  <NavItem href="/about" icon={<Info className="h-5 w-5" />} label="Sobre" />
                  
                  {session ? (
                    <>
                      {isLoading ? (
                        <li className="flex items-center justify-center p-3">
                          <Loader2 className="animate-spin h-5 w-5" />
                        </li>
                      ) : (
                        companyData && (
                          NavUserDropdownItems(companyData).map((item: INavUserItem) => (
                            <NavItem
                                key={`ITEM_KEY_REL(${item.href})`}
                                href={item.href}
                                icon={item.icon}
                                label={item.text}
                              />
                          ))                          
                        )
                      )}
                      <NavAction 
                        onClick={() => signOut()} 
                        icon={<LogOut className="h-5 w-5" />} 
                        label="Sair" 
                        variant="destructive"
                      />
                    </>
                  ) : (
                    <>
                      <NavItem href="/contact" icon={<Mail className="h-5 w-5" />} label="Contato" />
                      <NavItem href="/auth/login" icon={<LogIn className="h-5 w-5" />} label="Login" />
                      <NavItem 
                        href="/auth/signup" 
                        icon={<UserPlus className="h-5 w-5" />} 
                        label="Cadastrar"
                        variant="highlight"
                      />
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </Collapsible>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const UserDropdown = ({ session }: { session: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: companyData, isLoading } = useFindUserCompany(session.user?.id);

  return (
    <div className="relative" key='root-user-dropdown'>
      <button
        key='root-user-dropdown-btn'
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-full p-1.5 transition-colors hover:bg-white/10"
        aria-label="User menu"
      >
        <Avatar 
          key='root-user-dropdown-avatar'
          className="h-8 w-8">
        
          <AvatarImage 
            key='root-user-dropdown-avatar'
            src={session.user?.image} />
          <AvatarFallback 
            key='root-user-dropdown-avatar-fallback'
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            {session.user?.name?.[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span 
          key='root-user-dropdown-span'
          className="hidden lg:block font-medium">{session.user?.name}</span>
      </button>

      <AnimatePresence
        key='user-dropdown-animation-presence'
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            key='user-dropdown-animation-div'
            className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-indigo-800/95 backdrop-blur-xl shadow-lg"
          >
            <div 
              className="p-2 space-y-1"
              key='user-dropdown-animation-div1'
            >
              {isLoading ? (
                <div 
                  className="flex items-center justify-center p-4"
                  key='user-dropdown-animation-div2'>
                  <Loader2 
                    key='user-dropdown-animation-loaderIcon'
                    className="animate-spin h-5 w-5" />
                </div>
              ) : (
                companyData && (
                  NavUserDropdownItems(companyData).map((item: INavUserItem) => (
                    <Link
                      key={`user-dropdown-animation-link::${item.text}`}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/10"
                    >
                      {item.icon}
                      <span 
                        key='user-dropdown-animation-span'
                        className="truncate">{item.text}</span>
                    </Link>
                  ))                  
                )
              )}
              <Button
                onClick={() => signOut()}
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive text-red-300"
              >
                <LogOut className="h-5 w-5" />
                Sair
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ href, icon, label, variant }: { 
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: 'highlight';
}) => (
  <li>
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-white/10",
        variant === 'highlight' && "bg-white/10 hover:bg-white/20"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  </li>
);

const NavAction = ({ onClick, icon, label, variant }: { 
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  variant?: 'destructive';
}) => (
  <li>
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-lg transition-colors hover:bg-white/10",
        variant === 'destructive' && "hover:bg-red-500/10 text-red-300"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  </li>
);
export function RootNavLayout({session}: {session: Session | null}){  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-indigo-900/95 backdrop-blur-xl shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <NavbarLogo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link href="/" className="hover:text-indigo-300 transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-300 transition-colors">
                Sobre
              </Link>
            </li>
            {!session && (
              <li>
                <Link href="/contact" className="hover:text-indigo-300 transition-colors">
                  Contato
                </Link>
              </li>
            )}
          </ul>
          
          <div className="ml-4 flex items-center gap-4">
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <>
                <Button asChild variant="ghost" className="hover:text-indigo-300">
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-white/10 hover:bg-white/20 hover:text-white"
                >
                  <Link href="/auth/signup">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg p-2 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <MobileMenu
        session={session}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />      
    </header>
  );
}
export default function RootNavbar() {
  const { data: session } = useSession(); 
  const navMemo = useMemo(() => (
    <RootNavLayout 
      session={session}
      key='root-nav-bar-layout'/>
  ), [session])

  return navMemo
}