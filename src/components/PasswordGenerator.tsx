import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    let charset = "";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    if (excludeSimilar) {
      uppercase = uppercase.replace(/[O]/g, "");
      lowercase = lowercase.replace(/[ol]/g, "");
      numbers = numbers.replace(/[01]/g, "");
      symbols = symbols.replace(/[|]/g, "");
    }

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type.",
        variant: "destructive",
      });
      return;
    }

    let result = "";
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard.",
    });
  };

  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { text: "Weak", color: "text-red-500" };
    if (score <= 4) return { text: "Medium", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Password Generator
          </CardTitle>
          <CardDescription>
            Generate secure passwords with customizable options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generated Password */}
          {password && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Password</label>
              <div className="flex gap-2">
                <Input
                  value={password}
                  readOnly
                  className="font-mono text-lg bg-muted"
                />
                <Button onClick={copyToClipboard} size="icon" variant="outline">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Strength: <span className={getPasswordStrength().color}>{getPasswordStrength().text}</span></span>
                <span>Length: {password.length}</span>
              </div>
            </div>
          )}

          {/* Password Length */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password Length</label>
              <span className="text-sm text-muted-foreground">{length[0]}</span>
            </div>
            <Slider
              value={length}
              onValueChange={setLength}
              max={50}
              min={4}
              step={1}
              className="w-full"
            />
          </div>

          {/* Character Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Include Characters</label>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                />
                <label htmlFor="uppercase" className="text-sm">
                  Uppercase letters (A-Z)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                />
                <label htmlFor="lowercase" className="text-sm">
                  Lowercase letters (a-z)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                />
                <label htmlFor="numbers" className="text-sm">
                  Numbers (0-9)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                />
                <label htmlFor="symbols" className="text-sm">
                  Symbols (!@#$%^&*)
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="exclude-similar"
                  checked={excludeSimilar}
                  onCheckedChange={(checked) => setExcludeSimilar(checked === true)}
                />
                <label htmlFor="exclude-similar" className="text-sm">
                  Exclude similar characters (0, O, l, 1, |)
                </label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button onClick={generatePassword} className="w-full" size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};