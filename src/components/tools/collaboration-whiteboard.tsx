"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { 
  Brush, 
  Eraser, 
  Square, 
  Circle, 
  Triangle, 
  Minus, 
  RotateCcw, 
  Download,
  Users,
  Palette
} from "lucide-react";
import { toast } from "sonner";

interface DrawingPoint {
  x: number;
  y: number;
}

interface DrawingPath {
  id: string;
  points: DrawingPoint[];
  color: string;
  size: number;
  tool: "brush" | "eraser";
}

interface Shape {
  id: string;
  type: "rectangle" | "circle" | "line";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  size: number;
}

const colors = [
  "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
  "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB"
];

const mockUsers = [
  { id: "1", name: "You", color: "#3B82F6", active: true },
  { id: "2", name: "Alice", color: "#EF4444", active: true },
  { id: "3", name: "Bob", color: "#10B981", active: false },
  { id: "4", name: "Carol", color: "#F59E0B", active: true },
];

export function CollaborationWhiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<"brush" | "eraser" | "rectangle" | "circle" | "line">("brush");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState([5]);
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentPath, setCurrentPath] = useState<DrawingPoint[]>([]);
  const [startPoint, setStartPoint] = useState<DrawingPoint | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paths
    paths.forEach(path => {
      if (path.points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = path.tool === "eraser" ? "#FFFFFF" : path.color;
      ctx.lineWidth = path.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (path.tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
      } else {
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.moveTo(path.points[0].x, path.points[0].y);
      path.points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });

    // Draw current path
    if (currentPath.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = currentTool === "eraser" ? "#FFFFFF" : currentColor;
      ctx.lineWidth = brushSize[0];
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (currentTool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
      } else {
        ctx.globalCompositeOperation = "source-over";
      }

      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      currentPath.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    }

    // Draw shapes
    ctx.globalCompositeOperation = "source-over";
    shapes.forEach(shape => {
      ctx.beginPath();
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.size;

      switch (shape.type) {
        case "rectangle":
          ctx.rect(
            shape.startX,
            shape.startY,
            shape.endX - shape.startX,
            shape.endY - shape.startY
          );
          break;
        case "circle":
          const radius = Math.sqrt(
            Math.pow(shape.endX - shape.startX, 2) + Math.pow(shape.endY - shape.startY, 2)
          );
          ctx.arc(shape.startX, shape.startY, radius, 0, 2 * Math.PI);
          break;
        case "line":
          ctx.moveTo(shape.startX, shape.startY);
          ctx.lineTo(shape.endX, shape.endY);
          break;
      }
      ctx.stroke();
    });
  }, [paths, shapes, currentPath, currentColor, brushSize, currentTool]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);

    if (currentTool === "brush" || currentTool === "eraser") {
      setCurrentPath([pos]);
    } else {
      setStartPoint(pos);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);

    if (currentTool === "brush" || currentTool === "eraser") {
      setCurrentPath(prev => [...prev, pos]);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    setIsDrawing(false);

    if (currentTool === "brush" || currentTool === "eraser") {
      if (currentPath.length > 0) {
        const newPath: DrawingPath = {
          id: Date.now().toString(),
          points: [...currentPath, pos],
          color: currentColor,
          size: brushSize[0],
          tool: currentTool,
        };
        setPaths(prev => [...prev, newPath]);
        setCurrentPath([]);
      }
    } else if (startPoint) {
      const newShape: Shape = {
        id: Date.now().toString(),
        type: currentTool as "rectangle" | "circle" | "line",
        startX: startPoint.x,
        startY: startPoint.y,
        endX: pos.x,
        endY: pos.y,
        color: currentColor,
        size: brushSize[0],
      };
      setShapes(prev => [...prev, newShape]);
      setStartPoint(null);
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setShapes([]);
    setCurrentPath([]);
    toast.success("Canvas cleared!");
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Canvas downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Drawing Tools</CardTitle>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {mockUsers.filter(u => u.active).length} online
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Tools */}
          <div className="flex flex-wrap gap-2">
            {[
              { tool: "brush" as const, icon: <Brush className="h-4 w-4" />, name: "Brush" },
              { tool: "eraser" as const, icon: <Eraser className="h-4 w-4" />, name: "Eraser" },
              { tool: "rectangle" as const, icon: <Square className="h-4 w-4" />, name: "Rectangle" },
              { tool: "circle" as const, icon: <Circle className="h-4 w-4" />, name: "Circle" },
              { tool: "line" as const, icon: <Minus className="h-4 w-4" />, name: "Line" },
            ].map(({ tool, icon, name }) => (
              <motion.div key={tool} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={currentTool === tool ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentTool(tool)}
                  className="flex items-center space-x-2"
                >
                  {icon}
                  <span className="hidden sm:inline">{name}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Color Palette */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span className="text-sm font-medium">Colors</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-full border-2 ${
                    currentColor === color ? "border-primary" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Brush Size */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Brush Size</span>
              <Badge variant="secondary">{brushSize[0]}px</Badge>
            </div>
            <Slider
              value={brushSize}
              onValueChange={setBrushSize}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={clearCanvas}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
            <Button variant="outline" size="sm" onClick={downloadCanvas}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Users */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Active Users:</span>
            <div className="flex items-center space-x-2">
              {mockUsers.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-2"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${user.active ? '' : 'opacity-50'}`}
                    style={{ backgroundColor: user.color }}
                  />
                  <span className={`text-sm ${user.active ? '' : 'opacity-50'}`}>
                    {user.name}
                  </span>
                  {user.active && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canvas */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="w-full h-auto border cursor-crosshair bg-white"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDrawing(false)}
          />
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
        <div className="text-center">
          <Users className="h-5 w-5 mx-auto mb-2" />
          <p>Real-time collaboration with multiple users</p>
        </div>
        <div className="text-center">
          <Brush className="h-5 w-5 mx-auto mb-2" />
          <p>Multiple drawing tools and shapes</p>
        </div>
        <div className="text-center">
          <Download className="h-5 w-5 mx-auto mb-2" />
          <p>Export your creations as images</p>
        </div>
      </div>
    </div>
  );
}

