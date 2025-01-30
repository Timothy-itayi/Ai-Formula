import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableIcon, BarChartIcon, FlagIcon, UsersIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import QueryInterface from "@/components/dashboard/QueryInterface"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <FlagIcon className="h-6 w-6" />
          <span>F1 Dashboard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Standings
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
        <h1 className="text-3xl font-bold">Formula 1 Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Next Race</CardTitle>
              <FlagIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Monaco Grand Prix</div>
              <p className="text-xs text-muted-foreground">May 28, 2023</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Championship Leader</CardTitle>
              <UsersIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Max Verstappen</div>
              <p className="text-xs text-muted-foreground">119 points</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Constructors Leader</CardTitle>
              <BarChartIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Red Bull Racing</div>
              <p className="text-xs text-muted-foreground">224 points</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Races</CardTitle>
              <TableIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">in 2023 season</p>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle className="text-xl font-bold">F1 Intelligence Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <QueryInterface />
          </CardContent>
        </Card>


        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Driver Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Max Verstappen", "Sergio Perez", "Fernando Alonso"].map((driver, index) => (
                  <div key={driver} className="flex items-center">
                    <div className="w-8 text-sm font-medium">{index + 1}</div>
                    <div className="flex-1 text-sm">{driver}</div>
                    <div className="text-sm font-medium">{119 - index * 20} pts</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Circuit Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/9] relative">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Monaco Grand Prix Circuit"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

