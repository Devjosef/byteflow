import Link from "next/link"
import React from "react"
import { Button } from "../ui/button"
import { FaXTwitter } from "react-icons/fa6";
import LoginForm from "./loginForm";

export default function Navbar () {
 return  (
    <nav className="flex items-center justify-between">
      <div className="group">
       <Link href="/" className="text-3xl font-semibold"> byteFlow </Link>
       <div className="h-1 w-0 group-hover:w-full transition all bg-yellow-400"> </div>
       </div>
      
      <LoginForm />
    
    </nav>
 )
}