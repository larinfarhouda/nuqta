"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react"

interface ConnectionStatus {
  success: boolean
  message: string
  tables?: string[]
  error?: string
}

export default function ConnectionTestPage() {
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [loading, setLoading] = useState(false)

  const checkConnection = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/check-connection")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({
        success: false,
        message: "Error checking connection",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
        <CardDescription>Check the connection to your Supabase database</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-teal-600" />
            <span className="mr-4 text-lg">Testing connection...</span>
          </div>
        ) : status ? (
          <>
            <Alert variant={status.success ? "default" : "destructive"} className="mb-6">
              <div className="flex items-center">
                {status.success ? (
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 mr-2" />
                )}
                <AlertTitle>{status.success ? "Connection Successful" : "Connection Failed"}</AlertTitle>
              </div>
              <AlertDescription>{status.message}</AlertDescription>
              {status.error && <p className="mt-2 text-sm font-mono">{status.error}</p>}
            </Alert>

            {status.success && status.tables && status.tables.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Available Tables:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {status.tables.map((table) => (
                    <li key={table} className="text-sm font-mono">
                      {table}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <Alert>
            <AlertTriangle className="h-5 w-5 mr-2" />
            <AlertTitle>No Data</AlertTitle>
            <AlertDescription>No connection data available. Please try testing the connection.</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={checkConnection} disabled={loading} className="bg-teal-600 hover:bg-teal-700">
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Testing...
            </>
          ) : (
            "Test Connection"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
