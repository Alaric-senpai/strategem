'use client'
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Link from 'next/link';
import { SignInButton, SignOutButton, SignUpButton, useAuth } from '@clerk/nextjs';
import { LogOutIcon } from 'lucide-react';

interface NavBarProps {
  isAdmin: boolean;
}

export default function NavBar({ isAdmin }: NavBarProps) {
  const { isSignedIn } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full flex flex-row items-center justify-between px-4 py-4"
    >
      <div className="logo bg-gradient-to-r text-transparent bg-clip-text from-blue-700 via-purple-500 to-blue-400">
        StrateGem
      </div>
      {isSignedIn ? (
        <div className="flex items-center gap-4 flex-row">
          <Button asChild variant="outline" className="p-4 bg-blue-400  hover:bg-blue-600 text-white">
            <SignOutButton >
              <LogOutIcon size={25}  color='#ffffff'  className='text-white'/>
            </SignOutButton>
          </Button>
          <Button asChild className="p-4 bg-purple-600 text-white hover:bg-purple-900">
            <Link href={isAdmin ? "/admin" : "/client"}>Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4 flex-row">
          <Button
            variant="outline"
            asChild
            className="hover:text-white font-bold hover:bg-gradient-to-l cursor-pointer hover:duration-1000 ease-in-out transition-all duration-200  p-4 bg-gradient-to-br text-white from-blue-700 via-purple-700 to-blue-400"
          >
            <SignUpButton>Get Started</SignUpButton>
          </Button>
          <Button
            variant="default"
            asChild
            className="p-4 cursor-pointer bg-purple-600 text-white hover:text-white hover:bg-purple-700"
          >
            <SignInButton>Login</SignInButton>
          </Button>
        </div>
      )}
    </motion.nav>
  );
}
