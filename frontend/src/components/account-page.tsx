import { useState } from 'react'
import { PlusCircle, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BankAccount {
  accountNumber: string
  bankName: string
}

export default function AccountPage() {
  const [aadharNumber, setAadharNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([{ accountNumber: '', bankName: '' }])

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { accountNumber: '', bankName: '' }])
  }

  const removeBankAccount = (index: number) => {
    const updatedAccounts = bankAccounts.filter((_, i) => i !== index)
    setBankAccounts(updatedAccounts)
  }

  const updateBankAccount = (index: number, field: keyof BankAccount, value: string) => {
    const updatedAccounts = bankAccounts.map((account, i) => {
      if (i === index) {
        return { ...account, [field]: value }
      }
      return account
    })
    setBankAccounts(updatedAccounts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ aadharNumber, phoneNumber, bankAccounts })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto max-w-3xl">
        <Card className="bg-gray-900 shadow-xl border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="aadhar" className="text-gray-300 font-semibold">Aadhar Card Number</Label>
                <Input
                  id="aadhar"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  placeholder="Enter your 12-digit Aadhar number"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300 font-semibold">Phone Number</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-gray-300 font-semibold text-lg">Bank Accounts</Label>
                {bankAccounts.map((account, index) => (
                  <Card key={index} className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-gray-300">Bank Account {index + 1}</h4>
                        {index > 0 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeBankAccount(index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`account-${index}`} className="text-gray-300">Account Number</Label>
                          <Input
                            id={`account-${index}`}
                            value={account.accountNumber}
                            onChange={(e) => updateBankAccount(index, 'accountNumber', e.target.value)}
                            placeholder="Enter bank account number"
                            required
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`bank-${index}`} className="text-gray-300">Bank Name</Label>
                          <Input
                            id={`bank-${index}`}
                            value={account.bankName}
                            onChange={(e) => updateBankAccount(index, 'bankName', e.target.value)}
                            placeholder="Enter bank name"
                            required
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addBankAccount} 
                  className="w-full border-blue-500 text-blue-400 hover:bg-blue-950"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Bank Account
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
              >
                Save Account Details
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

