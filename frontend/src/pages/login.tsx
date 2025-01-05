import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export  function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Login
          </CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <form >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="your@email.com" 
                required 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

