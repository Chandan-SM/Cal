// components/CalendarHeader.tsx
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Lock, LogIn, LogOut } from "lucide-react";
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
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const { user } = useUser();
  const { signOut } = useAuth();
  const { openUserProfile, openSignIn } = useClerk();

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-5xl font-light text-gray-100">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h1>

      <div className="flex items-center space-x-4">
        <div className="bg-indigo-600 rounded-full flex overflow-hidden">
          <button
            onClick={onTodayClick}
            className="px-5 py-2 bg-indigo-600 text-white font-medium"
          >
            MONTH
          </button>
          {/* <button 
            className="px-5 py-2 bg-transparent text-white font-medium opacity-50"
          >
            YEAR
          </button> */}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onPrevMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={onNextMonth}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          {/* </div> */}
        </div>

        <div className="w-[fit]] bg-gray-800 border-white rounded-lg block lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center gap-2 rounded border border-white p-1 bg-gray-800">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.imageUrl || "GU"}
                    alt={user?.fullName || "GU"}
                  />
                  <AvatarFallback className="rounded-lg">GU</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-gray-900"
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
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.fullName || "Guest User"}
                    </span>
                    <span className="truncate text-xs">
                      {user?.primaryEmailAddress?.emailAddress || ""}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <SignedIn>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => openUserProfile()}>
                    <Lock />
                    Manage Clerk
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </SignedIn>
              <SignedOut>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => openSignIn()}>
                    <LogIn />
                    Log In
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </SignedOut>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
