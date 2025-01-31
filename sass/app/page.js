import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  FlagIcon } from "lucide-react"

import Link from "next/link"
import QueryInterface from "@/components/dashboard/QueryInterface"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <FlagIcon className="h-6 w-6" />
          <span> Dashboard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            data 
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Schedule
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Teams
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <h1 className="text-3xl font-bold"> Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Intelligence Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <QueryInterface />
          </CardContent>
        </Card>

        </div>
      </main>
    </div>
  )
}

