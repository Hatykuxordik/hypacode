"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout, 
  PanelLeft as Sidebar, 
  Heading, 
  Square, 
  Type, 
  Image as ImageIcon, 
  Trash2, 
  Lock, 
  Unlock,
  Copy,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";

interface Component {
  id: string;
  type: "header" | "sidebar" | "main" | "text" | "image" | "button";
  name: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  locked: boolean;
  content?: string;
}

const componentLibrary = [
  { type: "header" as const, name: "Header", icon: <Heading className="h-4 w-4" />, width: 300, height: 60 },
  { type: "sidebar" as const, name: "Sidebar", icon: <Sidebar className="h-4 w-4" />, width: 200, height: 300 },
  { type: "main" as const, name: "Main Content", icon: <Layout className="h-4 w-4" />, width: 400, height: 200 },
  { type: "text" as const, name: "Text Block", icon: <Type className="h-4 w-4" />, width: 200, height: 80 },
  { type: "image" as const, name: "Image", icon: <ImageIcon className="h-4 w-4" />, width: 150, height: 150 },
  { type: "button" as const, name: "Button", icon: <Square className="h-4 w-4" />, width: 120, height: 40 },
];

export function DragDropBuilder() {
  const [components, setComponents] = useState<Component[]>([]);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (componentType: typeof componentLibrary[0]) => {
    const newComponent: Component = {
      id: `${componentType.type}-${Date.now()}`,
      type: componentType.type,
      name: componentType.name,
      icon: componentType.icon,
      x: 0,
      y: 0,
      width: componentType.width,
      height: componentType.height,
      locked: false,
      content: componentType.type === "text" ? "Sample text" : undefined,
    };
    setDraggedComponent(newComponent);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedComponent || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - draggedComponent.width / 2;
    const y = e.clientY - rect.top - draggedComponent.height / 2;

    const newComponent = {
      ...draggedComponent,
      x: Math.max(0, Math.min(x, rect.width - draggedComponent.width)),
      y: Math.max(0, Math.min(y, rect.height - draggedComponent.height)),
    };

    setComponents(prev => [...prev, newComponent]);
    setDraggedComponent(null);
    toast.success(`${newComponent.name} added to canvas!`);
  };

  const handleComponentDrag = (id: string, x: number, y: number) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === id && !comp.locked 
          ? { ...comp, x, y }
          : comp
      )
    );
  };

  const toggleLock = (id: string) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === id 
          ? { ...comp, locked: !comp.locked }
          : comp
      )
    );
    toast.success("Component lock toggled!");
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    setSelectedComponent(null);
    toast.success("Component deleted!");
  };

  const duplicateComponent = (id: string) => {
    const component = components.find(comp => comp.id === id);
    if (!component) return;

    const newComponent = {
      ...component,
      id: `${component.type}-${Date.now()}`,
      x: component.x + 20,
      y: component.y + 20,
    };

    setComponents(prev => [...prev, newComponent]);
    toast.success("Component duplicated!");
  };

  const clearCanvas = () => {
    setComponents([]);
    setSelectedComponent(null);
    toast.success("Canvas cleared!");
  };

  const getComponentColor = (type: Component["type"]) => {
    const colors = {
      header: "bg-blue-500",
      sidebar: "bg-green-500", 
      main: "bg-purple-500",
      text: "bg-orange-500",
      image: "bg-pink-500",
      button: "bg-red-500",
    };
    return colors[type];
  };

  return (
    <div className="space-y-6">
      {/* Component Library */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Component Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {componentLibrary.map((component) => (
              <motion.div
                key={component.type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card 
                  className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200"
                  draggable
                  onDragStart={() => handleDragStart(component)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {component.icon}
                      </div>
                      <span className="text-sm font-medium">{component.name}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Canvas Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {components.length} Components
          </Badge>
          {selectedComponent && (
            <Badge variant="outline">
              Selected: {components.find(c => c.id === selectedComponent)?.name}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {selectedComponent && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleLock(selectedComponent)}
              >
                {components.find(c => c.id === selectedComponent)?.locked ? (
                  <Unlock className="h-4 w-4" />
                ) : (
                  <Lock className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => duplicateComponent(selectedComponent)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteComponent(selectedComponent)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
            disabled={components.length === 0}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            ref={canvasRef}
            className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {components.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Drag components here</p>
                  <p className="text-sm">Start building your layout by dragging components from the library above</p>
                </div>
              </div>
            )}

            <AnimatePresence>
              {components.map((component) => (
                <motion.div
                  key={component.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: component.locked ? 1 : 1.02 }}
                  drag={!component.locked}
                  dragMomentum={false}
                  onDrag={(_, info) => {
                    if (!component.locked) {
                      handleComponentDrag(
                        component.id,
                        component.x + info.delta.x,
                        component.y + info.delta.y
                      );
                    }
                  }}
                  className={`absolute cursor-${component.locked ? 'not-allowed' : 'move'} ${
                    selectedComponent === component.id ? 'ring-2 ring-primary' : ''
                  }`}
                  style={{
                    left: component.x,
                    top: component.y,
                    width: component.width,
                    height: component.height,
                  }}
                  onClick={() => setSelectedComponent(component.id)}
                >
                  <div className={`w-full h-full rounded-lg ${getComponentColor(component.type)} opacity-80 flex items-center justify-center text-white font-medium text-sm shadow-lg`}>
                    <div className="flex items-center space-x-2">
                      {component.icon}
                      <span>{component.name}</span>
                      {component.locked && <Lock className="h-3 w-3" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div className="text-center">
          <Layout className="h-5 w-5 mx-auto mb-2" />
          <p>Drag components from library to canvas</p>
        </div>
        <div className="text-center">
          <Lock className="h-5 w-5 mx-auto mb-2" />
          <p>Lock components to prevent accidental moves</p>
        </div>
        <div className="text-center">
          <Copy className="h-5 w-5 mx-auto mb-2" />
          <p>Select, duplicate, or delete components</p>
        </div>
      </div>
    </div>
  );
}

