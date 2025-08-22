"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Code, RotateCcw, Copy, Check } from "lucide-react";
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
  {
    name: "Ocean",
    ...defaultTheme,
    primaryColor: "#0EA5E9",
    secondaryColor: "#06B6D4",
  },
  {
    name: "Forest",
    ...defaultTheme,
    primaryColor: "#10B981",
    secondaryColor: "#059669",
  },
  {
    name: "Sunset",
    ...defaultTheme,
    primaryColor: "#F59E0B",
    secondaryColor: "#EF4444",
  },
  {
    name: "Purple",
    ...defaultTheme,
    primaryColor: "#8B5CF6",
    secondaryColor: "#A855F7",
  },
  {
    name: "Dark",
    ...defaultTheme,
    primaryColor: "#6366F1",
    backgroundColor: "#1F2937",
    textColor: "#F9FAFB",
  },
];

export function LiveCodeSandbox() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [activeTab, setActiveTab] = useState("theme");
  const [copied, setCopied] = useState(false);
  const [cssCode, setCssCode] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const jsxCode = `function ThemedComponent() {
  return (
    <div className="themed-container">
      <h2 className="themed-title">Interactive Component</h2>
      <p className="themed-text">
        This component updates in real-time as you adjust the theme settings. 
        Try changing the colors, spacing, or other properties to see instant updates!
      </p>
      <div className="themed-button-container">
        <button className="themed-button primary">
          Primary Button
        </button>
        <button className="themed-button outline">
          Outline Button
        </button>
      </div>
      <div className="themed-tip">
        <small>💡 Tip: All these styles update instantly as you modify the theme!</small>
      </div>
    </div>
  );
}`;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const newCssCode = `.themed-container {
  background-color: ${theme.backgroundColor};
  color: ${theme.textColor};
  border-radius: ${theme.borderRadius}px;
  padding: ${theme.spacing}px;
  font-size: ${theme.fontSize}px;
  font-weight: ${theme.fontWeight};
  font-family: 'Inter', sans-serif;
  box-shadow: 0 ${theme.shadowIntensity}px ${
      theme.shadowIntensity * 2
    }px rgba(0,0,0,0.1);
  border: 1px solid ${theme.primaryColor}20;
}

.themed-title {
  color: ${theme.primaryColor};
  font-size: ${theme.fontSize * 1.5}px;
  font-weight: 600;
  margin-bottom: ${theme.spacing * 0.5}px;
}

.themed-text {
  margin-bottom: ${theme.spacing}px;
  opacity: 0.8;
  line-height: 1.6;
}

.themed-button-container {
  display: flex;
  gap: ${theme.spacing * 0.5}px;
  flex-wrap: wrap;
}

.themed-button {
  border-radius: ${theme.borderRadius}px;
  padding: ${theme.spacing * 0.5}px ${theme.spacing}px;
  font-size: ${theme.fontSize}px;
  font-weight: ${theme.fontWeight};
  cursor: pointer;
  transition: all 0.2s ease;
}

.themed-button.primary {
  background-color: ${theme.primaryColor};
  color: white;
  border: none;
}

.themed-button.primary:hover {
  background-color: ${theme.secondaryColor};
  transform: translateY(-2px);
}

.themed-button.outline {
  background-color: transparent;
  color: ${theme.primaryColor};
  border: 2px solid ${theme.primaryColor};
}

.themed-button.outline:hover {
  background-color: ${theme.primaryColor};
  color: white;
  transform: translateY(-2px);
}

.themed-tip {
  margin-top: ${theme.spacing}px;
  padding: ${theme.spacing * 0.5}px;
  background-color: ${theme.secondaryColor}20;
  border-radius: ${theme.borderRadius * 0.5}px;
  border-left: 4px solid ${theme.secondaryColor};
}

.themed-tip small {
  color: ${theme.secondaryColor};
  font-weight: 600;
}`.trim();
    setCssCode(newCssCode);
  }, [theme]);

  const updateTheme = (key: keyof ThemeConfig, value: any) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: any) => {
    const { name, ...themeProps } = preset;
    setTheme(themeProps);
    toast.success(`Applied ${name} theme!`);
  };

  const resetToDefaults = () => {
    setTheme(defaultTheme);
    toast.success("Theme reset to default!");
  };

  const copyCode = () => {
    const fullCode = `// JSX Component\n${jsxCode}\n\n/* CSS Styles */\n${cssCode}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Code copied to clipboard!");
  };

  const tabs = isMobile
    ? [
        {
          id: "theme",
          name: "Theme Controls",
          icon: <Palette className="w-4 h-4" />,
        },
      ] // Hide code tab on mobile
    : [
        {
          id: "theme",
          name: "Theme Controls",
          icon: <Palette className="w-4 h-4" />,
        },
        { id: "code", name: "View Code", icon: <Code className="w-4 h-4" /> },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Live Code Sandbox</h3>
            <p className="text-blue-100">
              Change the theme values and watch the component update in
              real-time!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetToDefaults}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
            {!isMobile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyCode}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {copied ? "Copied!" : "Copy Code"}
                </span>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Controls Panel */}
        <div className="lg:w-1/3 border-r border-gray-200 dark:border-gray-700">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] lg:max-h-none">
            {activeTab === "theme" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) =>
                        updateTheme("primaryColor", e.target.value)
                      }
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) =>
                        updateTheme("primaryColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) =>
                        updateTheme("secondaryColor", e.target.value)
                      }
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor}
                      onChange={(e) =>
                        updateTheme("secondaryColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.backgroundColor}
                      onChange={(e) =>
                        updateTheme("backgroundColor", e.target.value)
                      }
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.backgroundColor}
                      onChange={(e) =>
                        updateTheme("backgroundColor", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => updateTheme("textColor", e.target.value)}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.textColor}
                      onChange={(e) => updateTheme("textColor", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {!isMobile && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Border Radius: {theme.borderRadius}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={theme.borderRadius}
                        onChange={(e) =>
                          updateTheme("borderRadius", parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Spacing: {theme.spacing}px
                      </label>
                      <input
                        type="range"
                        min="4"
                        max="50"
                        step="2"
                        value={theme.spacing}
                        onChange={(e) =>
                          updateTheme("spacing", parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Font Size: {theme.fontSize}px
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="24"
                        value={theme.fontSize}
                        onChange={(e) =>
                          updateTheme("fontSize", parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Font Weight
                      </label>
                      <select
                        value={theme.fontWeight}
                        onChange={(e) =>
                          updateTheme("fontWeight", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                      >
                        <option value="400">400 - Normal</option>
                        <option value="500">500 - Medium</option>
                        <option value="600">600 - Semi Bold</option>
                        <option value="700">700 - Bold</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Shadow Intensity: {theme.shadowIntensity}px
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={theme.shadowIntensity}
                        onChange={(e) =>
                          updateTheme(
                            "shadowIntensity",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </>
                )}

                {/* Presets */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Theme Presets
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {presetThemes.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="flex items-center space-x-2 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: preset.primaryColor }}
                        />
                        <span>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "code" && !isMobile && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    JSX Component
                  </h4>
                  <textarea
                    value={jsxCode}
                    className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-mono resize-none"
                    readOnly
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Generated CSS
                  </h4>
                  <textarea
                    value={cssCode}
                    className="w-full h-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-xs font-mono resize-none"
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:w-2/3 p-6">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Live Preview
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This component updates instantly as you change the theme values
            </p>
          </div>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <style>{cssCode}</style>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="themed-container">
                <h2 className="themed-title">Interactive Component</h2>
                <p className="themed-text">
                  This component updates in real-time as you adjust the theme
                  settings. Try changing the colors, spacing, or other
                  properties to see instant updates!
                </p>
                <div className="themed-button-container">
                  <button className="themed-button primary">
                    Primary Button
                  </button>
                  <button className="themed-button outline">
                    Outline Button
                  </button>
                </div>
                <div className="themed-tip">
                  <small>
                    💡 Tip: All these styles update instantly as you modify the
                    theme!
                  </small>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
