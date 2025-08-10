import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Clock, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TimestampConverter = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Date.now());
  const [inputTimestamp, setInputTimestamp] = useState("");
  const [inputUnit, setInputUnit] = useState("milliseconds");
  const [humanDate, setHumanDate] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Set current date and time as default
    const now = new Date();
    setDateInput(now.toISOString().split('T')[0]);
    setTimeInput(now.toTimeString().slice(0, 8));
  }, []);

  const convertTimestampToHuman = () => {
    try {
      let timestamp = parseInt(inputTimestamp);
      
      // Convert to milliseconds if needed
      if (inputUnit === "seconds") {
        timestamp *= 1000;
      } else if (inputUnit === "microseconds") {
        timestamp /= 1000;
      }

      const date = new Date(timestamp);
      
      if (timezone === "UTC") {
        setHumanDate(date.toUTCString());
      } else if (timezone === "local") {
        setHumanDate(date.toString());
      } else if (timezone === "iso") {
        setHumanDate(date.toISOString());
      }
    } catch (error) {
      setHumanDate("Invalid timestamp");
    }
  };

  const convertHumanToTimestamp = () => {
    try {
      const date = new Date(`${dateInput}T${timeInput}`);
      const timestamp = date.getTime();
      setInputTimestamp(timestamp.toString());
      setInputUnit("milliseconds");
      convertTimestampToHuman();
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid date/time format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const getCurrentTimestamp = (unit: string) => {
    const now = Date.now();
    switch (unit) {
      case "seconds":
        return Math.floor(now / 1000);
      case "microseconds":
        return now * 1000;
      default:
        return now;
    }
  };

  const formatTimestamp = (timestamp: number, unit: string) => {
    switch (unit) {
      case "seconds":
        return Math.floor(timestamp / 1000).toString();
      case "microseconds":
        return (timestamp * 1000).toString();
      default:
        return timestamp.toString();
    }
  };

  const getRelativeTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (seconds > 0) return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    return "Just now";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Timestamp Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Timestamp */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Current Timestamp
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Milliseconds</Label>
                  <div className="flex gap-2">
                    <Input value={currentTimestamp.toString()} readOnly />
                    <Button
                      onClick={() => copyToClipboard(currentTimestamp.toString(), "Current timestamp")}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Seconds</Label>
                  <div className="flex gap-2">
                    <Input value={Math.floor(currentTimestamp / 1000).toString()} readOnly />
                    <Button
                      onClick={() => copyToClipboard(Math.floor(currentTimestamp / 1000).toString(), "Current timestamp (seconds)")}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Human Readable</Label>
                  <div className="p-2 bg-muted rounded text-sm">
                    {new Date(currentTimestamp).toUTCString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="timestamp-to-human">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="timestamp-to-human">Timestamp → Human</TabsTrigger>
              <TabsTrigger value="human-to-timestamp">Human → Timestamp</TabsTrigger>
            </TabsList>

            <TabsContent value="timestamp-to-human" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timestamp">Timestamp</Label>
                  <Input
                    id="timestamp"
                    placeholder="Enter timestamp..."
                    value={inputTimestamp}
                    onChange={(e) => setInputTimestamp(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Select value={inputUnit} onValueChange={setInputUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milliseconds">Milliseconds</SelectItem>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="microseconds">Microseconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="local">Local Time</SelectItem>
                    <SelectItem value="iso">ISO 8601</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={convertTimestampToHuman} className="w-full">
                Convert to Human Readable
              </Button>

              {humanDate && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Human Readable Date</Label>
                    <Button
                      onClick={() => copyToClipboard(humanDate, "Human readable date")}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="font-medium">{humanDate}</div>
                    {inputTimestamp && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {getRelativeTime(parseInt(inputTimestamp) * (inputUnit === "seconds" ? 1000 : inputUnit === "microseconds" ? 0.001 : 1))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="human-to-timestamp" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    step="1"
                    value={timeInput}
                    onChange={(e) => setTimeInput(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={convertHumanToTimestamp} className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Convert to Timestamp
              </Button>

              {inputTimestamp && (
                <div className="space-y-3">
                  <Label>Generated Timestamps</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Milliseconds</Label>
                      <div className="flex gap-2">
                        <Input value={inputTimestamp} readOnly />
                        <Button
                          onClick={() => copyToClipboard(inputTimestamp, "Timestamp (milliseconds)")}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Seconds</Label>
                      <div className="flex gap-2">
                        <Input value={Math.floor(parseInt(inputTimestamp) / 1000).toString()} readOnly />
                        <Button
                          onClick={() => copyToClipboard(Math.floor(parseInt(inputTimestamp) / 1000).toString(), "Timestamp (seconds)")}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Microseconds</Label>
                      <div className="flex gap-2">
                        <Input value={(parseInt(inputTimestamp) * 1000).toString()} readOnly />
                        <Button
                          onClick={() => copyToClipboard((parseInt(inputTimestamp) * 1000).toString(), "Timestamp (microseconds)")}
                          variant="outline"
                          size="sm"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimestampConverter;