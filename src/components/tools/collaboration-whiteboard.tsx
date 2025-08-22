"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brush, 
  Eraser, 
  Square, 
  Circle, 
  Minus, 
  Trash2, 
  Download,
  Users,
  Palette,
  Undo,
  Wifi,
  WifiOff,
  MousePointer
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
  tool: "brush" | "eraser" | "rectangle" | "circle" | "line";
  userId: string;
  userName: string;
}

const colors = [
  "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", 
  "#FF00FF", "#00FFFF", "#FFA500", "#800080", "#FFC0CB",
  "#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6",
  "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
];

const mockUsers = [
  { id: "1", name: "You", color: "#3B82F6", cursor: null, active: true },
  { id: "2", name: "Alice", color: "#EF4444", cursor: { x: 200, y: 150 }, active: true },
  { id: "3", name: "Bob", color: "#10B981", cursor: { x: 400, y: 300 }, active: false },
  { id: "4", name: "Carol", color: "#F59E0B", cursor: { x: 600, y: 250 }, active: true },
];

const toolsList = [
  { id: "brush" as const, name: "Brush", icon: <Brush className="w-5 h-5" /> },
  { id: "eraser" as const, name: "Eraser", icon: <Eraser className="w-5 h-5" /> },
  { id: "rectangle" as const, name: "Rectangle", icon: <Square className="w-5 h-5" /> },
  { id: "circle" as const, name: "Circle", icon: <Circle className="w-5 h-5" /> },
  { id: "line" as const, name: "Line", icon: <Minus className="w-5 h-5" /> },
];

export function CollaborationWhiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<"brush" | "eraser" | "rectangle" | "circle" | "line">("brush");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [paths, setPaths] = useState<DrawingPath[]>([]);
  const [undoStack, setUndoStack] = useState<DrawingPath[][]>([]);
  const [connectedUsers, setConnectedUsers] = useState(mockUsers);
  const [isConnected, setIsConnected] = useState(true);
  const [currentPath, setCurrentPath] = useState<DrawingPath | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [startPoint, setStartPoint] = useState<DrawingPoint | null>(null);

  // Simulate real-time collaboration
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate other users drawing
      if (Math.random() > 0.7) {
        const activeUsers = connectedUsers.filter(user => user.active && user.id !== "1");
        if (activeUsers.length > 0) {
          const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
          simulateRemoteDrawing(randomUser);
        }
      }

      // Simulate cursor movements
      setConnectedUsers(prev => prev.map(user => {
        if (user.id === "1") return user;
        
        const shouldMove = Math.random() > 0.3;
        if (shouldMove && user.active) {
          return {
            ...user,
            cursor: {
              x: Math.max(50, Math.min(750, (user.cursor?.x || 200) + (Math.random() - 0.5) * 100)),
              y: Math.max(50, Math.min(450, (user.cursor?.y || 200) + (Math.random() - 0.5) * 100))
            }
          };
        }
        return user;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [connectedUsers]);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsConnected(prev => !prev);
        setTimeout(() => setIsConnected(true), 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const simulateRemoteDrawing = (user) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = Math.random() * (canvas.width - 100) + 50;
    const startY = Math.random() * (canvas.height - 100) + 50;
    
    const newPath: DrawingPath = {
      id: Date.now().toString() + Math.random(),
      tool: 'brush',
      color: user.color,
      size: 3,
      points: [{ x: startX, y: startY }],
      userId: user.id,
      userName: user.name
    };

    // Add some random points to simulate drawing
    for (let i = 1; i < 5; i++) {
      newPath.points.push({
        x: startX + (Math.random() - 0.5) * 50,
        y: startY + (Math.random() - 0.5) * 50
      });
    }

    setPaths(prev => [...prev, newPath]);
  };

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);

    const newPath: DrawingPath = {
      id: Date.now().toString(),
      tool: currentTool,
      color: currentTool === "eraser" ? "#FFFFFF" : currentColor,
      size: brushSize,
      points: [pos],
      userId: "1",
      userName: "You"
    };

    if (currentTool === "brush" || currentTool === "eraser" || currentTool === "line") {
      setCurrentPath(newPath);
    } else {
      setStartPoint(pos);
      setCurrentPath(newPath);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    setMousePosition(pos);

    if (currentTool === "eraser") {
      // Erase functionality
      setPaths(prev => prev.filter(path => {
        return !path.points.some(point => {
          const distance = Math.sqrt(
            Math.pow(point.x - pos.x, 2) + Math.pow(point.y - pos.y, 2)
          );
          return distance < brushSize;
        });
      }));
      return;
    }

    if (currentPath) {
      setCurrentPath(prev => ({
        ...prev!,
        points: [...prev!.points, pos]
      }));
    }
  };

  const stopDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const pos = getMousePos(e);
    setIsDrawing(false);

    if (currentPath) {
      const updatedPath = { ...currentPath, points: [...currentPath.points, pos] };
      setPaths(prev => [...prev, updatedPath]);
      setUndoStack(prev => [...prev, [...paths, updatedPath]]);
    }
    setCurrentPath(null);
    setStartPoint(null);
  };

  const clearCanvas = () => {
    setUndoStack(prev => [...prev, paths]);
    setPaths([]);
    toast.success("Canvas cleared!");
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1];
      setPaths(previousState);
      setUndoStack(prev => prev.slice(0, -1));
    }
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paths
    [...paths, currentPath].filter(Boolean).forEach(path => {
      if (path!.points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = path!.color;
      ctx.lineWidth = path!.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      switch (path!.tool) {
        case "brush":
        case "line":
          ctx.moveTo(path!.points[0].x, path!.points[0].y);
          path!.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          break;
        case "rectangle":
          ctx.rect(
            path!.points[0].x,
            path!.points[0].y,
            path!.points[path!.points.length - 1].x - path!.points[0].x,
            path!.points[path!.points.length - 1].y - path!.points[0].y
          );
          break;
        case "circle":
          const radius = Math.sqrt(
            Math.pow(path!.points[path!.points.length - 1].x - path!.points[0].x, 2) + 
            Math.pow(path!.points[path!.points.length - 1].y - path!.points[0].y, 2)
          );
          ctx.arc(path!.points[0].x, path!.points[0].y, radius, 0, 2 * Math.PI);
          break;
        case "eraser":
          ctx.globalCompositeOperation = "destination-out";
          ctx.moveTo(path!.points[0].x, path!.points[0].y);
          path!.points.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.globalCompositeOperation = "source-over";
          break;
      }
      ctx.stroke();
    });
  }, [paths, currentPath, currentColor, brushSize, currentTool]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Real-Time Collaboration Whiteboard
          </h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
            isConnected 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span>{isConnected ? 'Connected' : 'Reconnecting...'}</span>
          </div>
        </div>
        
        {/* Connected Users */}
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <div className="flex space-x-2">
            {connectedUsers.map(user => (
              <Badge
                key={user.id}
                variant="secondary"
                className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  user.active 
                    ? 'bg-gray-100 dark:bg-gray-800' 
                    : 'bg-gray-50 dark:bg-gray-900 opacity-50'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: user.color }}
                />
                <span className="text-sm">{user.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <CardContent className="flex flex-wrap items-center gap-4 p-0">
          {/* Tools */}
          <div className="flex items-center space-x-2">
            {toolsList.map(t => (
              <motion.button
                key={t.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentTool(t.id)}
                className={`p-3 rounded-lg transition-all duration-200 ${
                  currentTool === t.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                title={t.name}
              >
                {t.icon}
              </motion.button>
            ))}
          </div>

          {/* Brush Size */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Size:</span>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              max={50}
              min={1}
              step={1}
              className="w-20"
            />
            <Badge variant="secondary" className="w-6 text-center">{brushSize}</Badge>
          </div>

          {/* Colors */}
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {colors.map(c => (
                <motion.button
                  key={c}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    currentColor === c ? 'border-gray-800 dark:border-white scale-110' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setCurrentColor(c)}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={undo}
              disabled={undoStack.length === 0}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              title="Undo"
            >
              <Undo className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearCanvas}
              className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-200"
              title="Clear Canvas"
            >
              <Trash2 className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadCanvas}
              className="p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-all duration-200"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>
        </CardContent>
      </Card>

      {/* Canvas Container */}
      <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="block cursor-crosshair w-full h-auto"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        {/* Other Users' Cursors */}
        <AnimatePresence>
          {connectedUsers
            .filter(user => user.id !== "1" && user.cursor && user.active)
            .map(user => (
              <motion.div
                key={user.id}
                className="absolute pointer-events-none z-10"
                style={{
                  left: user.cursor.x,
                  top: user.cursor.y,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div className="relative">
                  <MousePointer 
                    className="w-6 h-6 transform -rotate-12" 
                    style={{ color: user.color }}
                  />
                  <div 
                    className="absolute top-6 left-2 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name}
                  </div>
                </div>
              </motion.div>
            ))
          }
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>
          🎨 <strong>Real-Time Collaboration Demo:</strong> This whiteboard simulates multi-user drawing with live cursors and synchronized drawing.
        </p>
        <p>
          💡 <strong>Technical Features:</strong> Canvas API, WebSocket simulation, real-time state management, and collaborative UX patterns.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
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
    </div>
  );
}