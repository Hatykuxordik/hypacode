"use client";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from "@hello-pangea/dnd";
import { 
  Layout, 
  Type, 
  Square, 
  Circle, 
  Image as ImageIcon, 
  Code, 
  Download, 
  Trash2, 
  Copy,
  Palette,
  Move,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ComponentItem {
  id: string;
  type: "button" | "card" | "text" | "image" | "container" | "input";
  label: string;
  icon: React.ReactNode;
  props: Record<string, any>;
}

interface DroppedComponent extends ComponentItem {
  x: number;
  y: number;
  width: number;
  height: number;
}

const availableComponents: ComponentItem[] = [
  {
    id: "button",
    type: "button",
    label: "Button",
    icon: <Square className="h-4 w-4" />,
    props: { text: "Click me", variant: "default", size: "default" }
  },
  {
    id: "card",
    type: "card",
    label: "Card",
    icon: <Layout className="h-4 w-4" />,
    props: { title: "Card Title", content: "Card content goes here", padding: "medium" }
  },
  {
    id: "text",
    type: "text",
    label: "Text",
    icon: <Type className="h-4 w-4" />,
    props: { text: "Sample text", size: "medium", weight: "normal" }
  },
  {
    id: "image",
    type: "image",
    label: "Image",
    icon: <ImageIcon className="h-4 w-4" />,
    props: { src: "/api/placeholder/200/150", alt: "Placeholder", rounded: false }
  },
  {
    id: "container",
    type: "container",
    label: "Container",
    icon: <Circle className="h-4 w-4" />,
    props: { background: "transparent", border: true, padding: "medium" }
  }
];

const generateComponentCode = (components: DroppedComponent[]): string => {
  const imports = `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

`;

  const componentCode = components.map(comp => {
    switch (comp.type) {
      case "button":
        return `    <Button 
      variant="${comp.props.variant}" 
      size="${comp.props.size}"
      style={{
        position: 'absolute',
        left: '${comp.x}px',
        top: '${comp.y}px',
        width: '${comp.width}px',
        height: '${comp.height}px'
      }}
    >
      ${comp.props.text}
    </Button>`;
      
      case "card":
        return `    <Card style={{
        position: 'absolute',
        left: '${comp.x}px',
        top: '${comp.y}px',
        width: '${comp.width}px',
        height: '${comp.height}px'
      }}>
      <CardHeader>
        <CardTitle>${comp.props.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>${comp.props.content}</p>
      </CardContent>
    </Card>`;
      
      case "text":
        return `    <div style={{
        position: 'absolute',
        left: '${comp.x}px',
        top: '${comp.y}px',
        fontSize: '${comp.props.size === 'small' ? '14px' : comp.props.size === 'large' ? '24px' : '16px'}',
        fontWeight: '${comp.props.weight}'
      }}>
      ${comp.props.text}
    </div>`;
      
      case "image":
        return `    <img 
      src="${comp.props.src}" 
      alt="${comp.props.alt}"
      style={{
        position: 'absolute',
        left: '${comp.x}px',
        top: '${comp.y}px',
        width: '${comp.width}px',
        height: '${comp.height}px',
        borderRadius: '${comp.props.rounded ? '8px' : '0'}'
      }}
    />`;
      
      case "container":
        return `    <div style={{
        position: 'absolute',
        left: '${comp.x}px',
        top: '${comp.y}px',
        width: '${comp.width}px',
        height: '${comp.height}px',
        background: '${comp.props.background}',
        border: '${comp.props.border ? '1px solid #e2e8f0' : 'none'}',
        padding: '${comp.props.padding === 'small' ? '8px' : comp.props.padding === 'large' ? '24px' : '16px'}',
        borderRadius: '6px'
      }}>
      {/* Container content */}
    </div>`;
      
      default:
        return "";
    }
  }).join('\n\n');

  return `${imports}
export default function GeneratedComponent() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
${componentCode}
    </div>
  );
}`;
};

export function BuildWithMePlayground() {
  const [droppedComponents, setDroppedComponents] = useState<DroppedComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<ComponentItem | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (component: ComponentItem) => {
    setDraggedItem(component);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newComponent: DroppedComponent = {
      ...draggedItem,
      id: `${draggedItem.id}-${Date.now()}`,
      x: Math.max(0, x - 50),
      y: Math.max(0, y - 25),
      width: draggedItem.type === "button" ? 100 : draggedItem.type === "text" ? 150 : 200,
      height: draggedItem.type === "button" ? 40 : draggedItem.type === "text" ? 30 : 150
    };

    setDroppedComponents(prev => [...prev, newComponent]);
    setDraggedItem(null);
  };

  const handleComponentClick = (id: string) => {
    setSelectedComponent(selectedComponent === id ? null : id);
  };

  const handleDeleteComponent = (id: string) => {
    setDroppedComponents(prev => prev.filter(comp => comp.id !== id));
    setSelectedComponent(null);
  };

  const handleClearCanvas = () => {
    setDroppedComponents([]);
    setSelectedComponent(null);
  };

  const handleExportCode = () => {
    const code = generateComponentCode(droppedComponents);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-component.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderComponent = (component: DroppedComponent) => {
    const isSelected = selectedComponent === component.id;
    
    switch (component.type) {
      case "button":
        return (
          <Button
            variant={component.props.variant as any}
            size={component.props.size as any}
            className={`absolute cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height
            }}
            onClick={() => handleComponentClick(component.id)}
          >
            {component.props.text}
          </Button>
        );
      
      case "card":
        return (
          <Card
            className={`absolute cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height
            }}
            onClick={() => handleComponentClick(component.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{component.props.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-muted-foreground">{component.props.content}</p>
            </CardContent>
          </Card>
        );
      
      case "text":
        return (
          <div
            className={`absolute cursor-pointer p-1 ${isSelected ? 'ring-2 ring-primary rounded' : ''}`}
            style={{
              left: component.x,
              top: component.y,
              fontSize: component.props.size === 'small' ? '14px' : component.props.size === 'large' ? '24px' : '16px',
              fontWeight: component.props.weight
            }}
            onClick={() => handleComponentClick(component.id)}
          >
            {component.props.text}
          </div>
        );
      
      case "image":
        return (
          <div
            className={`absolute cursor-pointer ${isSelected ? 'ring-2 ring-primary' : ''}`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height
            }}
            onClick={() => handleComponentClick(component.id)}
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-primary/40" />
            </div>
          </div>
        );
      
      case "container":
        return (
          <div
            className={`absolute cursor-pointer border-2 border-dashed border-muted-foreground/30 ${isSelected ? 'ring-2 ring-primary' : ''}`}
            style={{
              left: component.x,
              top: component.y,
              width: component.width,
              height: component.height,
              background: component.props.background,
              padding: component.props.padding === 'small' ? '8px' : component.props.padding === 'large' ? '24px' : '16px'
            }}
            onClick={() => handleComponentClick(component.id)}
          >
            <div className="text-xs text-muted-foreground text-center mt-2">Container</div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Layout className="h-5 w-5 mr-2 text-primary" />
          Build with Me Playground
          <Badge variant="secondary" className="ml-2">Live</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Drag and drop components to build your UI. Watch the code update in real-time!
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid lg:grid-cols-4 gap-0 h-[600px]">
          {/* Component Library */}
          <div className="border-r bg-muted/30 p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              Components
            </h3>
            <div className="space-y-2">
              {availableComponents.map((component) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={() => handleDragStart(component)}
                  className="flex items-center p-3 bg-background rounded-lg border cursor-grab hover:shadow-sm transition-shadow"
                >
                  {component.icon}
                  <span className="ml-2 text-sm">{component.label}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearCanvas}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Canvas
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExportCode}
                className="w-full"
                disabled={droppedComponents.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Code
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2 relative">
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="outline">Canvas</Badge>
            </div>
            <div
              ref={canvasRef}
              className="w-full h-full bg-background border-2 border-dashed border-muted-foreground/20 relative overflow-hidden"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <AnimatePresence>
                {droppedComponents.map((component) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {renderComponent(component)}
                    {selectedComponent === component.id && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        style={{
                          left: component.x + component.width - 12,
                          top: component.y - 12
                        }}
                        onClick={() => handleDeleteComponent(component.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {droppedComponents.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Move className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Drag components here</p>
                    <p className="text-sm">Start building your UI by dragging components from the left panel</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code Preview */}
          <div className="border-l bg-muted/30">
            <Tabs defaultValue="preview" className="h-full">
              <TabsList className="grid w-full grid-cols-2 m-2">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="p-4 h-[calc(100%-60px)]">
                <div className="text-sm text-muted-foreground mb-2">Live Preview</div>
                <div className="bg-background border rounded p-4 h-full overflow-auto">
                  <div className="relative h-full">
                    {droppedComponents.map((component) => renderComponent(component))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="code" className="p-4 h-[calc(100%-60px)]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Generated Code</div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigator.clipboard.writeText(generateComponentCode(droppedComponents))}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <ScrollArea className="h-full">
                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                    <code>{generateComponentCode(droppedComponents)}</code>
                  </pre>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

