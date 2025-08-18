"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Settings, 
  Code, 
  Eye, 
  RefreshCw, 
  Copy,
  Check,
  Zap
} from "lucide-react";
import { toast } from "sonner";

interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  spacing: number;
  fontSize: number;
  fontWeight: string;
  shadowIntensity: number;
}

const defaultTheme: ThemeConfig = {
  primaryColor: "#3B82F6",
  secondaryColor: "#10B981",
  backgroundColor: "#FFFFFF",
  textColor: "#1F2937",
  borderRadius: 8,
  spacing: 16,
  fontSize: 16,
  fontWeight: "500",
  shadowIntensity: 10,
};

const presetThemes = [
  { name: "Ocean", ...defaultTheme, primaryColor: "#0EA5E9", secondaryColor: "#06B6D4" },
  { name: "Forest", ...defaultTheme, primaryColor: "#10B981", secondaryColor: "#059669" },
  { name: "Sunset", ...defaultTheme, primaryColor: "#F59E0B", secondaryColor: "#EF4444" },
  { name: "Purple", ...defaultTheme, primaryColor: "#8B5CF6", secondaryColor: "#A855F7" },
  { name: "Dark", ...defaultTheme, primaryColor: "#6366F1", backgroundColor: "#1F2937", textColor: "#F9FAFB" },
];

export function InteractivePlayground() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: ThemeConfig) => {
    setTheme(preset);
    toast.success(`Applied ${preset.name || 'preset'} theme!`);
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
    toast.success("Theme reset to default!");
  };

  const copyTheme = async () => {
    const themeCode = `const theme = ${JSON.stringify(theme, null, 2)};`;
    await navigator.clipboard.writeText(themeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Theme configuration copied!");
  };

  const generateCSS = () => {
    return `
:root {
  --primary-color: ${theme.primaryColor};
  --secondary-color: ${theme.secondaryColor};
  --background-color: ${theme.backgroundColor};
  --text-color: ${theme.textColor};
  --border-radius: ${theme.borderRadius}px;
  --spacing: ${theme.spacing}px;
  --font-size: ${theme.fontSize}px;
  --font-weight: ${theme.fontWeight};
  --shadow: 0 ${theme.shadowIntensity}px ${theme.shadowIntensity * 2}px rgba(0,0,0,0.1);
}

.themed-component {
  background: var(--background-color);
  color: var(--text-color);
  border-radius: var(--border-radius);
  padding: var(--spacing);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  box-shadow: var(--shadow);
}

.themed-button {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: calc(var(--spacing) * 0.5) var(--spacing);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  cursor: pointer;
  transition: all 0.2s ease;
}

.themed-button:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}
    `.trim();
  };

  const PreviewComponent = () => (
    <motion.div
      key={JSON.stringify(theme)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Card Component */}
      <div
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,
          borderRadius: `${theme.borderRadius}px`,
          padding: `${theme.spacing}px`,
          fontSize: `${theme.fontSize}px`,
          fontWeight: theme.fontWeight,
          boxShadow: `0 ${theme.shadowIntensity}px ${theme.shadowIntensity * 2}px rgba(0,0,0,0.1)`,
          border: `1px solid ${theme.primaryColor}20`,
        }}
      >
        <h3 style={{ color: theme.primaryColor, marginBottom: `${theme.spacing * 0.5}px` }}>
          Interactive Component
        </h3>
        <p style={{ marginBottom: `${theme.spacing}px`, opacity: 0.8 }}>
          This component updates in real-time as you adjust the theme settings. 
          Try changing the colors, spacing, or other properties to see instant updates!
        </p>
        
        <div style={{ display: 'flex', gap: `${theme.spacing * 0.5}px`, flexWrap: 'wrap' }}>
          <button
            style={{
              backgroundColor: theme.primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: `${theme.borderRadius}px`,
              padding: `${theme.spacing * 0.5}px ${theme.spacing}px`,
              fontSize: `${theme.fontSize}px`,
              fontWeight: theme.fontWeight,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.secondaryColor;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.primaryColor;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Primary Button
          </button>
          
          <button
            style={{
              backgroundColor: 'transparent',
              color: theme.primaryColor,
              border: `2px solid ${theme.primaryColor}`,
              borderRadius: `${theme.borderRadius}px`,
              padding: `${theme.spacing * 0.5}px ${theme.spacing}px`,
              fontSize: `${theme.fontSize}px`,
              fontWeight: theme.fontWeight,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.primaryColor;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.primaryColor;
            }}
          >
            Secondary Button
          </button>
        </div>
        
        <div style={{ 
          marginTop: `${theme.spacing}px`, 
          padding: `${theme.spacing * 0.5}px`,
          backgroundColor: `${theme.secondaryColor}20`,
          borderRadius: `${theme.borderRadius * 0.5}px`,
          borderLeft: `4px solid ${theme.secondaryColor}`
        }}>
          <small style={{ color: theme.secondaryColor, fontWeight: '600' }}>
            💡 Tip: All these styles update instantly as you modify the theme!
          </small>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">Interactive Theme Playground</h2>
        </div>
        <p className="text-muted-foreground">
          Change any value below and watch the component update in real-time!
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview" className="flex items-center space-x-2">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </TabsTrigger>
          <TabsTrigger value="controls" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Controls</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Code</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Live Preview</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="animate-pulse">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Live
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <PreviewComponent />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Colors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={theme.secondaryColor}
                      onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="backgroundColor"
                      type="color"
                      value={theme.backgroundColor}
                      onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={theme.backgroundColor}
                      onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="textColor"
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => updateTheme('textColor', e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={theme.textColor}
                      onChange={(e) => updateTheme('textColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Layout & Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Layout & Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Border Radius</Label>
                    <Badge variant="secondary">{theme.borderRadius}px</Badge>
                  </div>
                  <Slider
                    value={[theme.borderRadius]}
                    onValueChange={([value]) => updateTheme('borderRadius', value)}
                    max={50}
                    min={0}
                    step={1}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Spacing</Label>
                    <Badge variant="secondary">{theme.spacing}px</Badge>
                  </div>
                  <Slider
                    value={[theme.spacing]}
                    onValueChange={([value]) => updateTheme('spacing', value)}
                    max={50}
                    min={4}
                    step={2}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Font Size</Label>
                    <Badge variant="secondary">{theme.fontSize}px</Badge>
                  </div>
                  <Slider
                    value={[theme.fontSize]}
                    onValueChange={([value]) => updateTheme('fontSize', value)}
                    max={24}
                    min={12}
                    step={1}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Shadow Intensity</Label>
                    <Badge variant="secondary">{theme.shadowIntensity}px</Badge>
                  </div>
                  <Slider
                    value={[theme.shadowIntensity]}
                    onValueChange={([value]) => updateTheme('shadowIntensity', value)}
                    max={30}
                    min={0}
                    step={1}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Presets */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {presetThemes.map((preset) => (
                  <Button
                    key={preset.name}
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(preset)}
                    className="flex items-center space-x-2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: preset.primaryColor }}
                    />
                    <span>{preset.name}</span>
                  </Button>
                ))}
                <Button variant="outline" size="sm" onClick={resetTheme}>
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated CSS</CardTitle>
                <Button variant="outline" size="sm" onClick={copyTheme}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{generateCSS()}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

