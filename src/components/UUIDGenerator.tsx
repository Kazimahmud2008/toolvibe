import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UUIDGenerator = () => {
  const [singleUUID, setSingleUUID] = useState("");
  const [bulkUUIDs, setBulkUUIDs] = useState<string[]>([]);
  const [bulkCount, setBulkCount] = useState(10);
  const { toast } = useToast();

  const generateUUIDv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateSingle = () => {
    const uuid = generateUUIDv4();
    setSingleUUID(uuid);
  };

  const generateBulk = () => {
    const count = Math.min(Math.max(1, bulkCount), 1000); // Limit between 1-1000
    const uuids = Array.from({ length: count }, () => generateUUIDv4());
    setBulkUUIDs(uuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "UUID copied to clipboard.",
    });
  };

  const copyAllBulk = () => {
    const allUUIDs = bulkUUIDs.join('\n');
    navigator.clipboard.writeText(allUUIDs);
    toast({
      title: "Copied!",
      description: `${bulkUUIDs.length} UUIDs copied to clipboard.`,
    });
  };

  const downloadBulk = () => {
    const content = bulkUUIDs.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
          <CardDescription>
            Generate unique identifiers (UUID v4) for your applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="single" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="single">Single UUID</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Generator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="single" className="space-y-4">
              <div className="text-center space-y-4">
                <Button onClick={generateSingle} size="lg" className="w-full max-w-md">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate UUID
                </Button>
                
                {singleUUID && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        value={singleUUID}
                        readOnly
                        className="font-mono text-center bg-muted"
                      />
                      <Button
                        onClick={() => copyToClipboard(singleUUID)}
                        size="icon"
                        variant="outline"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      UUID v4 (Random) - Click to copy
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="bulk" className="space-y-4">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">
                    Number of UUIDs (1-1000)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="1000"
                    value={bulkCount}
                    onChange={(e) => setBulkCount(parseInt(e.target.value) || 10)}
                    className="w-full"
                  />
                </div>
                <Button onClick={generateBulk}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              {bulkUUIDs.length > 0 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={copyAllBulk} variant="outline" className="flex-1">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </Button>
                    <Button onClick={downloadBulk} variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download as File
                    </Button>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div className="space-y-2">
                      {bulkUUIDs.map((uuid, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="w-8 text-muted-foreground">{index + 1}.</span>
                          <code className="flex-1 font-mono">{uuid}</code>
                          <Button
                            onClick={() => copyToClipboard(uuid)}
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    Generated {bulkUUIDs.length} UUIDs
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};