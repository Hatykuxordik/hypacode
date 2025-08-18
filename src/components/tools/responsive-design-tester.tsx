"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Tablet, Monitor, RotateCcw, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Device {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  category: "mobile" | "tablet" | "desktop";
}

const devices: Device[] = [
  { name: "iPhone 14", width: 390, height: 844, icon: <Smartphone className="h-4 w-4" />, category: "mobile" },
  { name: "iPhone 14 Plus", width: 428, height: 926, icon: <Smartphone className="h-4 w-4" />, category: "mobile" },
  { name: "Samsung Galaxy S23", width: 360, height: 780, icon: <Smartphone className="h-4 w-4" />, category: "mobile" },
  { name: "iPad", width: 768, height: 1024, icon: <Tablet className="h-4 w-4" />, category: "tablet" },
  { name: "iPad Pro", width: 1024, height: 1366, icon: <Tablet className="h-4 w-4" />, category: "tablet" },
  { name: "MacBook Air", width: 1280, height: 800, icon: <Monitor className="h-4 w-4" />, category: "desktop" },
  { name: "Desktop HD", width: 1920, height: 1080, icon: <Monitor className="h-4 w-4" />, category: "desktop" },
];

export function ResponsiveDesignTester() {
  const [url, setUrl] = useState("https://example.com");
  const [selectedDevice, setSelectedDevice] = useState<Device>(devices[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast.error("Please enter a valid URL");
      return;
    }
    
    // Validate URL format
    try {
      new URL(url);
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => setIsLoading(false), 1000);
      toast.success("Website loaded successfully!");
    } catch {
      toast.error("Please enter a valid URL (include https://)");
    }
  };

  const currentWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const currentHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  return (
    <div className="space-y-6">
      {/* URL Input */}
      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter website URL (e.g., https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Test"}
        </Button>
      </form>

      {/* Device Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Device</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {devices.map((device) => (
            <Button
              key={device.name}
              variant={selectedDevice.name === device.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice(device)}
              className="flex flex-col h-auto p-3 text-xs"
            >
              {device.icon}
              <span className="mt-1">{device.name}</span>
              <span className="text-xs opacity-70">
                {device.width}×{device.height}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="secondary">
            {selectedDevice.category.charAt(0).toUpperCase() + selectedDevice.category.slice(1)}
          </Badge>
          <Badge variant="outline">
            {currentWidth} × {currentHeight}px
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLandscape(!isLandscape)}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            {isLandscape ? "Portrait" : "Landscape"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(url, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open
          </Button>
        </div>
      </div>

      {/* Device Preview */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            {selectedDevice.icon}
            {selectedDevice.name} Preview
            {isLandscape && <Badge variant="secondary" className="text-xs">Landscape</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-center">
            <div 
              className="border-8 border-gray-800 rounded-lg overflow-hidden shadow-2xl bg-white"
              style={{
                width: Math.min(currentWidth * 0.5, 600),
                height: Math.min(currentHeight * 0.5, 400),
              }}
            >
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading website...</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={url}
                  className="w-full h-full border-0"
                  title={`${selectedDevice.name} preview`}
                  sandbox="allow-same-origin allow-scripts"
                />
              )}
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Preview scaled to 50% for better visibility</p>
            <p>Actual size: {currentWidth} × {currentHeight}px</p>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div className="text-center">
          <Smartphone className="h-5 w-5 mx-auto mb-2" />
          <p>Test on popular mobile devices</p>
        </div>
        <div className="text-center">
          <RotateCcw className="h-5 w-5 mx-auto mb-2" />
          <p>Switch between portrait and landscape</p>
        </div>
        <div className="text-center">
          <ExternalLink className="h-5 w-5 mx-auto mb-2" />
          <p>Open in new tab for full testing</p>
        </div>
      </div>
    </div>
  );
}

