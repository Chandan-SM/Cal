// components/nav-user.tsx
import React from "react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsUpDown, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

interface User {
  name: string;
  email: string;
  avatar: string;
  guest: boolean;
}

interface NavUserProps {
  user: User;
}

export const NavUser: React.FC<NavUserProps> = ({ user }) => {
  const { signOut } = useAuth();
  const { openUserProfile, openSignIn } = useClerk();

  return (
    <div className="flex items-center justify-between w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-slate-800/70 transition-all border border-indigo-900/20 w-full"
          >
            <Avatar className="h-8 w-8 mr-2 ring-2 ring-violet-500/30">
              <AvatarImage 
                src={user.avatar} 
                alt={user.name} 
              />
              <AvatarFallback className="bg-violet-800 text-white">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-100">{user.name}</span>
              {user.email && (
                <span className="text-xs text-slate-400 truncate max-w-[150px]">
                  {user.email}
                </span>
              )}
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </motion.div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent
          className="min-w-56 rounded-lg bg-slate-900 border border-violet-800/30 backdrop-blur-sm"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 p-3 text-left border-b border-indigo-900/30">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-700 to-indigo-800">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="font-medium text-violet-100">
                  {user.name}
                </span>
                {user.email && (
                  <span className="text-xs text-violet-300 truncate max-w-[180px]">
                    {user.email}
                  </span>
                )}
              </div>
            </div>
          </DropdownMenuLabel>
          
          <SignedIn>
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem 
                onClick={() => openUserProfile()} 
                className="text-violet-100 hover:bg-violet-900/40 focus:bg-violet-900/40 cursor-pointer rounded-md"
              >
                <User className="mr-2 h-4 w-4 text-violet-400" />
                Account Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-violet-800/30" />
            <div className="p-1">
              <DropdownMenuItem 
                onClick={() => signOut()} 
                className="text-rose-300 hover:bg-rose-900/30 focus:bg-rose-900/30 cursor-pointer rounded-md"
              >
                <LogOut className="mr-2 h-4 w-4 text-rose-400" />
                Log out
              </DropdownMenuItem>
            </div>
          </SignedIn>
          
          <SignedOut>
            <div className="p-1">
              <DropdownMenuItem 
                onClick={() => openSignIn()} 
                className="text-violet-100 hover:bg-violet-900/40 focus:bg-violet-900/40 cursor-pointer rounded-md"
              >
                <LogIn className="mr-2 h-4 w-4 text-violet-400" />
                Log In
              </DropdownMenuItem>
            </div>
          </SignedOut>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};