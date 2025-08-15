"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, RefreshCw, Check } from "lucide-react";
import { toast } from "sonner";

interface Color {
  hex: string;
  name: string;
}

export function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<Color[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const colorNames = [
    "Primary", "Secondary", "Accent", "Background", "Surface",
    "Text", "Muted", "Border", "Success", "Warning", "Error", "Info"
  ];

  const generateRandomColor = (): string => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };

  const generatePalette = async () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPalette: Color[] = [];
    for (let i = 0; i < 8; i++) {
      newPalette.push({
        hex: generateRandomColor(),
        name: colorNames[i] || `Color ${i + 1}`
      });
    }
    
    setPalette(newPalette);
    setIsGenerating(false);
  };

  const copyToClipboard = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedColor(hex);
      toast.success(`Copied ${hex} to clipboard!`);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      toast.error("Failed to copy color");
    }
  };

  const exportPalette = () => {
    if (palette.length === 0) {
      toast.error("Generate a palette first!");
      return;
    }

    const cssVariables = palette.map(color => 
      `  --${color.name.toLowerCase().replace(/\s+/g, '-')}: ${color.hex};`
    ).join('\n');

    const cssContent = `:root {\n${cssVariables}\n}`;
    
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'color-palette.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Palette exported as CSS!");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={generatePalette}
          disabled={isGenerating}
          size="lg"
          className="min-w-[200px]"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate New Palette
            </>
          )}
        </Button>
        
        {palette.length > 0 && (
          <Button 
            onClick={exportPalette}
            variant="outline"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSS
          </Button>
        )}
      </div>

      {/* Palette Display */}
      {palette.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {palette.map((color, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => copyToClipboard(color.hex)}
            >
              <div 
                className="h-24 w-full relative"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  {copiedColor === color.hex ? (
                    <Check className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Copy className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
              <CardContent className="p-3">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {color.name}
                  </Badge>
                  <p className="font-mono text-sm font-medium">
                    {color.hex.toUpperCase()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Instructions */}
      {palette.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Generate Your First Palette</h3>
              <p>Click the button above to generate a beautiful color palette for your next project.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div className="text-center">
          <Copy className="h-5 w-5 mx-auto mb-2" />
          <p>Click any color to copy hex value</p>
        </div>
        <div className="text-center">
          <Download className="h-5 w-5 mx-auto mb-2" />
          <p>Export as CSS variables</p>
        </div>
        <div className="text-center">
          <RefreshCw className="h-5 w-5 mx-auto mb-2" />
          <p>Generate unlimited palettes</p>
        </div>
      </div>
    </div>
  );
}

