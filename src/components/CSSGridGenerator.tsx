import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Grid3X3, Download, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GridSettings {
  rows: number;
  columns: number;
  gap: string;
  rowGap: string;
  columnGap: string;
  templateColumns: string;
  templateRows: string;
  alignItems: string;
  justifyItems: string;
  alignContent: string;
  justifyContent: string;
}

const alignOptions = [
  { value: "stretch", label: "Stretch" },
  { value: "start", label: "Start" },
  { value: "end", label: "End" },
  { value: "center", label: "Center" },
];

const justifyOptions = [
  { value: "stretch", label: "Stretch" },
  { value: "start", label: "Start" },
  { value: "end", label: "End" },
  { value: "center", label: "Center" },
  { value: "space-between", label: "Space Between" },
  { value: "space-around", label: "Space Around" },
  { value: "space-evenly", label: "Space Evenly" },
];

export const CSSGridGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [gridSettings, setGridSettings] = useState<GridSettings>({
    rows: 3,
    columns: 3,
    gap: "10px",
    rowGap: "",
    columnGap: "",
    templateColumns: "1fr 1fr 1fr",
    templateRows: "1fr 1fr 1fr",
    alignItems: "stretch",
    justifyItems: "stretch",
    alignContent: "start",
    justifyContent: "start"
  });

  const handleSettingChange = (key: keyof GridSettings, value: string | number) => {
    setGridSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleRowsChange = (rows: number) => {
    setGridSettings(prev => ({
      ...prev,
      rows,
      templateRows: Array(rows).fill("1fr").join(" ")
    }));
  };

  const handleColumnsChange = (columns: number) => {
    setGridSettings(prev => ({
      ...prev,
      columns,
      templateColumns: Array(columns).fill("1fr").join(" ")
    }));
  };

  const generateCSS = () => {
    const { rowGap, columnGap, gap, ...settings } = gridSettings;
    
    let css = `.grid-container {
  display: grid;
  grid-template-columns: ${settings.templateColumns};
  grid-template-rows: ${settings.templateRows};`;

    if (rowGap || columnGap) {
      if (rowGap) css += `\n  row-gap: ${rowGap};`;
      if (columnGap) css += `\n  column-gap: ${columnGap};`;
    } else if (gap) {
      css += `\n  gap: ${gap};`;
    }

    if (settings.alignItems !== "stretch") {
      css += `\n  align-items: ${settings.alignItems};`;
    }
    if (settings.justifyItems !== "stretch") {
      css += `\n  justify-items: ${settings.justifyItems};`;
    }
    if (settings.alignContent !== "start") {
      css += `\n  align-content: ${settings.alignContent};`;
    }
    if (settings.justifyContent !== "start") {
      css += `\n  justify-content: ${settings.justifyContent};`;
    }

    css += `
}

.grid-item {
  background: #f0f0f0;
  padding: 20px;
  text-align: center;
  border: 1px solid #ddd;
}`;

    return css;
  };

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Layout</title>
    <style>
${generateCSS()}
    </style>
</head>
<body>
    <div class="grid-container">
        ${Array.from({ length: gridSettings.rows * gridSettings.columns }, (_, i) => 
          `<div class="grid-item">Item ${i + 1}</div>`
        ).join('\n        ')}
    </div>
</body>
</html>`;
  };

  const copyCSS = async () => {
    try {
      await navigator.clipboard.writeText(generateCSS());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "CSS code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy CSS code",
        variant: "destructive",
      });
    }
  };

  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'css-grid-layout.html';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "HTML file downloaded successfully",
    });
  };

  const resetGrid = () => {
    setGridSettings({
      rows: 3,
      columns: 3,
      gap: "10px",
      rowGap: "",
      columnGap: "",
      templateColumns: "1fr 1fr 1fr",
      templateRows: "1fr 1fr 1fr",
      alignItems: "stretch",
      justifyItems: "stretch",
      alignContent: "start",
      justifyContent: "start"
    });
  };

  const GridPreview = () => {
    const { rowGap, columnGap, gap } = gridSettings;
    
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: gridSettings.templateColumns,
      gridTemplateRows: gridSettings.templateRows,
      gap: rowGap || columnGap ? undefined : gap,
      rowGap: rowGap || undefined,
      columnGap: columnGap || undefined,
      alignItems: gridSettings.alignItems as any,
      justifyItems: gridSettings.justifyItems as any,
      alignContent: gridSettings.alignContent as any,
      justifyContent: gridSettings.justifyContent as any,
      width: '100%',
      minHeight: '300px',
      padding: '20px',
      border: '2px dashed #ddd',
      borderRadius: '8px'
    };

    const itemStyle: React.CSSProperties = {
      background: '#f3f4f6',
      padding: '12px',
      textAlign: 'center',
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontSize: '14px',
      color: '#374151'
    };

    return (
      <div style={gridStyle}>
        {Array.from({ length: gridSettings.rows * gridSettings.columns }, (_, i) => (
          <div key={i} style={itemStyle}>
            Item {i + 1}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">CSS Grid Generator</h1>
          <p className="text-muted-foreground">Create responsive CSS Grid layouts with live preview</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={resetGrid} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button onClick={copyCSS}>
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy CSS"}
          </Button>
          <Button onClick={downloadHTML} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download HTML
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Grid3X3 className="w-5 h-5" />
              <span>Grid Structure</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="columns">Columns</Label>
              <Input
                id="columns"
                type="number"
                min="1"
                max="12"
                value={gridSettings.columns}
                onChange={(e) => handleColumnsChange(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                min="1"
                max="12"
                value={gridSettings.rows}
                onChange={(e) => handleRowsChange(Number(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-columns">Grid Template Columns</Label>
              <Input
                id="template-columns"
                placeholder="1fr 1fr 1fr"
                value={gridSettings.templateColumns}
                onChange={(e) => handleSettingChange("templateColumns", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-rows">Grid Template Rows</Label>
              <Input
                id="template-rows"
                placeholder="1fr 1fr 1fr"
                value={gridSettings.templateRows}
                onChange={(e) => handleSettingChange("templateRows", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Spacing Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing & Gap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gap">Gap (All)</Label>
              <Input
                id="gap"
                placeholder="10px"
                value={gridSettings.gap}
                onChange={(e) => handleSettingChange("gap", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="row-gap">Row Gap</Label>
              <Input
                id="row-gap"
                placeholder="10px (overrides gap)"
                value={gridSettings.rowGap}
                onChange={(e) => handleSettingChange("rowGap", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="column-gap">Column Gap</Label>
              <Input
                id="column-gap"
                placeholder="10px (overrides gap)"
                value={gridSettings.columnGap}
                onChange={(e) => handleSettingChange("columnGap", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Alignment Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Alignment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="align-items">Align Items</Label>
              <Select value={gridSettings.alignItems} onValueChange={(value) => handleSettingChange("alignItems", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  {alignOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justify-items">Justify Items</Label>
              <Select value={gridSettings.justifyItems} onValueChange={(value) => handleSettingChange("justifyItems", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  {alignOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="align-content">Align Content</Label>
              <Select value={gridSettings.alignContent} onValueChange={(value) => handleSettingChange("alignContent", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  {justifyOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justify-content">Justify Content</Label>
              <Select value={gridSettings.justifyContent} onValueChange={(value) => handleSettingChange("justifyContent", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border shadow-lg">
                  {justifyOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <GridPreview />
        </CardContent>
      </Card>

      {/* Generated CSS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Generated CSS Code
            <Button onClick={copyCSS} variant="outline" size="sm">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy CSS"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-auto max-h-96 border">
            <code>{generateCSS()}</code>
          </pre>
        </CardContent>
      </Card>

      {/* CSS Grid Guide */}
      <Card>
        <CardHeader>
          <CardTitle>CSS Grid Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-3">Common Units</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>fr</strong> - Fractional unit (flexible)</li>
                <li>• <strong>px</strong> - Fixed pixels</li>
                <li>• <strong>%</strong> - Percentage of container</li>
                <li>• <strong>auto</strong> - Content-based sizing</li>
                <li>• <strong>min-content</strong> - Minimum content size</li>
                <li>• <strong>max-content</strong> - Maximum content size</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Functions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• <strong>repeat(3, 1fr)</strong> - Repeat pattern</li>
                <li>• <strong>minmax(100px, 1fr)</strong> - Min/max sizing</li>
                <li>• <strong>fit-content(200px)</strong> - Fit content with limit</li>
                <li>• <strong>auto-fit</strong> - Auto-fit columns</li>
                <li>• <strong>auto-fill</strong> - Auto-fill columns</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};