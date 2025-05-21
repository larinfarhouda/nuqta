"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCw, AlertTriangle } from "lucide-react"

interface SchemaColumn {
  column_name: string
  data_type: string
  is_nullable: boolean
  column_default: string | null
}

interface SchemaResponse {
  success: boolean
  schemas: {
    [tableName: string]: {
      columns?: SchemaColumn[]
      error?: string
    }
  }
  error?: string
}

export default function SchemaPage() {
  const [schema, setSchema] = useState<SchemaResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("demo_events")

  const fetchSchema = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/schema")
      const data = await response.json()
      setSchema(data)

      // Set active tab to the first table with data
      if (data.success && data.schemas) {
        const tables = Object.keys(data.schemas)
        if (tables.length > 0) {
          setActiveTab(tables[0])
        }
      }
    } catch (error) {
      console.error("Error fetching schema:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSchema()
  }, [])

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Database Schema</CardTitle>
        <CardDescription>View the schema for all tables in your Supabase database</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin text-teal-600" />
            <span className="mr-4 text-lg">Loading schema...</span>
          </div>
        ) : schema ? (
          schema.success ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
                {Object.keys(schema.schemas).map((tableName) => (
                  <TabsTrigger key={tableName} value={tableName} className="text-xs md:text-sm">
                    {tableName.replace("demo_", "")}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(schema.schemas).map(([tableName, tableSchema]) => (
                <TabsContent key={tableName} value={tableName}>
                  <div className="rounded-md border">
                    <div className="bg-muted px-4 py-2 font-medium">Table: {tableName}</div>
                    {tableSchema.error ? (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{tableSchema.error}</AlertDescription>
                      </Alert>
                    ) : (
                      <div className="p-0">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="px-4 py-2 text-left font-medium">Column</th>
                              <th className="px-4 py-2 text-left font-medium">Type</th>
                              <th className="px-4 py-2 text-left font-medium">Nullable</th>
                              <th className="px-4 py-2 text-left font-medium">Default</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableSchema.columns?.map((column) => (
                              <tr key={column.column_name} className="border-b">
                                <td className="px-4 py-2 font-mono text-sm">{column.column_name}</td>
                                <td className="px-4 py-2 font-mono text-sm">{column.data_type}</td>
                                <td className="px-4 py-2 font-mono text-sm">{column.is_nullable ? "Yes" : "No"}</td>
                                <td className="px-4 py-2 font-mono text-sm">{column.column_default || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{schema.error}</AlertDescription>
            </Alert>
          )
        ) : (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>No Data</AlertTitle>
            <AlertDescription>No schema data available. Please try refreshing.</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={fetchSchema} disabled={loading} className="bg-teal-600 hover:bg-teal-700">
          {loading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Refresh Schema"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
