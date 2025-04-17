// components/CalendarHeader.tsx
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import React from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Lock, LogIn, LogOut, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayClick: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onTodayClick,
}) => {
  const monthNames: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const { user } = useUser();
  const { signOut } = useAuth();
  const { openUserProfile, openSignIn } = useClerk();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center mb-8"
    >
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <motion.h1 
          className="text-5xl font-light text-gray-100 flex items-center gap-3"
          key={`${currentDate.getMonth()}-${currentDate.getFullYear()}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Calendar className="h-8 w-8 text-violet-400" />
          <span>{monthNames[currentDate.getMonth()]}</span>
          <span className="text-violet-400">{currentDate.getFullYear()}</span>
        </motion.h1>
      </motion.div>

      <div className="flex items-center space-x-4">
        <motion.div 
          className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-full flex overflow-hidden shadow-lg shadow-violet-500/20"
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onTodayClick}
            className="px-5 py-2 text-white font-medium"
          >
            TODAY
          </motion.button>
        </motion.div>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#312e81" }}
            whileTap={{ scale: 0.9 }}
            onClick={onPrevMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-900/50 text-gray-300 border border-indigo-800/50 hover:bg-indigo-800 transition-all shadow-md shadow-indigo-900/20"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#312e81" }}
            whileTap={{ scale: 0.9 }}
            onClick={onNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-900/50 text-gray-300 border border-indigo-800/50 hover:bg-indigo-800 transition-all shadow-md shadow-indigo-900/20"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>

        <div className="w-[fit]] bg-indigo-900/40 border border-indigo-800/50 rounded-lg block lg:hidden shadow-lg shadow-indigo-900/20">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex cursor-pointer items-center gap-2 rounded p-1 bg-indigo-900/40"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.imageUrl || "GU"}
                    alt={user?.fullName || "GU"}
                  />
                  <AvatarFallback className="rounded-lg bg-violet-800">GU</AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-slate-900 border border-violet-800/50"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.imageUrl}
                      alt={user?.fullName || "GU"}
                    />
                    <AvatarFallback className="rounded-lg bg-violet-800">GU</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-violet-100">
                      {user?.fullName || "Guest User"}
                    </span>
                    <span className="truncate text-xs text-violet-300">
                      {user?.primaryEmailAddress?.emailAddress || ""}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <SignedIn>
                <DropdownMenuSeparator className="bg-violet-800/30" />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => openUserProfile()} className="text-violet-100 hover:bg-violet-900/50 cursor-pointer">
                    <Lock className="mr-2 text-violet-400" />
                    Manage Clerk
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-violet-800/30" />
                <DropdownMenuItem onClick={() => signOut()} className="text-violet-100 hover:bg-violet-900/50 cursor-pointer">
                  <LogOut className="mr-2 text-violet-400" />
                  Log out
                </DropdownMenuItem>
              </SignedIn>
              <SignedOut>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => openSignIn()} className="text-violet-100 hover:bg-violet-900/50 cursor-pointer">
                    <LogIn className="mr-2 text-violet-400" />
                    Log In
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarHeader;