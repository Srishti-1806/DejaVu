import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  Mic,
  FileText,
  Calculator,
  Youtube,
  Building,
  Code,
  Sparkles,
  Brain,
  Target,
  Zap,
  TrendingUp,
  BookOpen,
  Star,
} from "lucide-react";

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const Dashboard = ({ isOpen, onClose }: DashboardProps) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      opacity: number;
      scale: number;
      rotation: number;
    }>
  >([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const sparkleIdRef = useRef(0);

  // Mouse tracking and sparkle effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!modalRef.current) return;

      const rect = modalRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      // Generate sparkles occasionally
      if (Math.random() < 0.3) {
        const newSparkle = {
          id: sparkleIdRef.current++,
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 0.5 + 0.5,
          rotation: Math.random() * 360,
        };

        setSparkles((prev) => [...prev.slice(-20), newSparkle]);
      }
    };

    if (isOpen && modalRef.current) {
      modalRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isOpen]);

  // Clean up sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) =>
        prev.filter((sparkle) => Date.now() - sparkle.id < 2000),
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: "ai-speech",
      title: "AI Speech & Gesture",
      description:
        "Practice interviews with AI-powered speech and gesture analysis",
      icon: Mic,
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-900/20 to-pink-900/20",
      color: "text-purple-300",
      glowColor: "shadow-purple-500/50",
    },
    {
      id: "pdf-summarizer",
      title: "AI PDF Summariser",
      description:
        "Convert lengthy documents into concise, actionable summaries",
      icon: FileText,
      gradient: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-900/20 to-cyan-900/20",
      color: "text-blue-300",
      glowColor: "shadow-blue-500/50",
    },
    {
      id: "ats-calculator",
      title: "ATS Calculator",
      description: "Optimize your resume score for Applicant Tracking Systems",
      icon: Calculator,
      gradient: "from-emerald-400 to-green-400",
      bgGradient: "from-emerald-900/20 to-green-900/20",
      color: "text-emerald-300",
      glowColor: "shadow-emerald-500/50",
    },
    {
      id: "yt-converter",
      title: "YT Video to PDF",
      description: "Transform YouTube tutorials into structured PDF notes",
      icon: Youtube,
      gradient: "from-red-400 to-orange-400",
      bgGradient: "from-red-900/20 to-orange-900/20",
      color: "text-red-300",
      glowColor: "shadow-red-500/50",
    },
    {
      id: "placement-materials",
      title: "Company Materials",
      description: "Access exclusive placement materials from top companies",
      icon: Building,
      gradient: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-900/20 to-purple-900/20",
      color: "text-indigo-300",
      glowColor: "shadow-indigo-500/50",
    },
    {
      id: "dsa-sheets",
      title: "DSA Practice Sheets",
      description: "Curated Data Structures & Algorithms practice problems",
      icon: Code,
      gradient: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-900/20 to-orange-900/20",
      color: "text-yellow-300",
      glowColor: "shadow-yellow-500/50",
    },
  ];

  const renderFeatureContent = (featureId: string) => {
    switch (featureId) {
      case "ai-speech":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  AI Speech & Gesture Analysis
                </h3>
                <p className="text-gray-600">
                  Practice with AI-powered feedback
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                <Brain className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-600"
              >
                <Target className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Features:</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Real-time speech analysis</li>
                <li>• Gesture recognition</li>
                <li>• Confidence scoring</li>
                <li>• Personalized feedback</li>
              </ul>
            </div>
          </div>
        );
      case "pdf-summarizer":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  AI PDF Summariser
                </h3>
                <p className="text-gray-600">Smart document summarization</p>
              </div>
            </div>
            <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Drop your PDF here or click to browse
              </p>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                Upload PDF
              </Button>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">AI Features:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Key points extraction</li>
                <li>• Chapter-wise summaries</li>
                <li>• Searchable notes</li>
                <li>• Export to multiple formats</li>
              </ul>
            </div>
          </div>
        );
      case "ats-calculator":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  ATS Score Calculator
                </h3>
                <p className="text-gray-600">Optimize your resume for ATS</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  78%
                </div>
                <p className="text-gray-600">Current ATS Score</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Scan Resume
                </Button>
                <Button
                  variant="outline"
                  className="border-emerald-200 text-emerald-600"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Improve Score
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-emerald-800 mb-2">
                Optimization Tips:
              </h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Use industry keywords</li>
                <li>• Proper formatting</li>
                <li>• Quantify achievements</li>
                <li>• Standard section headers</li>
              </ul>
            </div>
          </div>
        );
      case "yt-converter":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  YT Video to PDF
                </h3>
                <p className="text-gray-600">
                  Convert tutorials to study notes
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="url"
                placeholder="Paste YouTube video URL here..."
                className="w-full p-3 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white">
                Convert to PDF
              </Button>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">Features:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Transcript extraction</li>
                <li>• Timestamp navigation</li>
                <li>• Key points highlighting</li>
                <li>• Downloadable PDF notes</li>
              </ul>
            </div>
          </div>
        );
      case "placement-materials":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Company Placement Materials
                </h3>
                <p className="text-gray-600">
                  Exclusive resources from top companies
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Google",
                "Microsoft",
                "Amazon",
                "Meta",
                "Netflix",
                "Apple",
              ].map((company) => (
                <Button
                  key={company}
                  variant="outline"
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                  {company}
                </Button>
              ))}
            </div>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">
                Available Materials:
              </h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Interview questions bank</li>
                <li>• Coding challenges</li>
                <li>• Company culture guides</li>
                <li>• Salary negotiation tips</li>
              </ul>
            </div>
          </div>
        );
      case "dsa-sheets":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  DSA Practice Sheets
                </h3>
                <p className="text-gray-600">Structured programming practice</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Arrays & Strings",
                "Linked Lists",
                "Trees & Graphs",
                "Dynamic Programming",
                "System Design",
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                >
                  <span className="font-medium text-yellow-800">{topic}</span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                  >
                    Practice
                  </Button>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Progress Tracking:
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Difficulty-based progression</li>
                <li>• Performance analytics</li>
                <li>• Interview prep roadmap</li>
                <li>• Company-specific problems</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/30"
        style={{
          boxShadow:
            "0 0 50px rgba(168, 85, 247, 0.4), inset 0 0 50px rgba(168, 85, 247, 0.1)",
        }}
      >
        {/* Galaxy Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated stars */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-blue-300 rounded-full opacity-80 animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-20 w-1 h-1 bg-purple-300 rounded-full opacity-70 animate-pulse delay-700"></div>
          <div className="absolute bottom-10 right-10 w-1 h-1 bg-pink-300 rounded-full opacity-60 animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-cyan-300 rounded-full opacity-75 animate-pulse delay-500"></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-yellow-300 rounded-full opacity-65 animate-pulse delay-800"></div>

          {/* Nebula clouds */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-cyan-600/15 to-indigo-600/15 rounded-full filter blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Mouse-following sparkles */}
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute pointer-events-none z-10"
            style={{
              left: sparkle.x - 6,
              top: sparkle.y - 6,
              opacity: sparkle.opacity,
              transform: `scale(${sparkle.scale}) rotate(${sparkle.rotation}deg)`,
              transition: "opacity 0.5s ease-out",
            }}
          >
            <Star className="w-3 h-3 text-yellow-300 animate-pulse" />
          </div>
        ))}
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-sm p-6 border-b border-purple-500/30">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Sparkles className="w-6 h-6 text-white animate-spin" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  🌌 Galaxy Dashboard
                </h2>
                <p className="text-purple-200">
                  Your AI-powered career preparation hub
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-purple-200 hover:text-white hover:bg-purple-500/20 rounded-full w-10 h-10 p-0 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Header sparkle effect */}
          <div className="absolute top-2 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-32 w-1 h-1 bg-cyan-300 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-80 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 overflow-y-auto border-r border-purple-500/30">
            <h3 className="text-lg font-bold text-purple-200 mb-6">
              🚀 Galaxy Features
            </h3>
            <div className="space-y-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 border ${
                      activeFeature === feature.id
                        ? `bg-gradient-to-r ${feature.bgGradient} shadow-xl ${feature.glowColor} ring-2 ring-purple-400/50 border-purple-400/50`
                        : "bg-slate-800/30 hover:bg-slate-700/40 border-slate-600/50 hover:border-purple-400/30"
                    } backdrop-blur-sm`}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center shrink-0 shadow-lg ${feature.glowColor}`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                          <h4
                            className={`font-semibold text-sm ${activeFeature === feature.id ? feature.color : "text-gray-200"}`}
                          >
                            {feature.title}
                          </h4>
                          <p
                            className={`text-xs mt-1 line-clamp-2 ${
                              activeFeature === feature.id
                                ? "text-gray-300"
                                : "text-gray-400"
                            }`}
                          >
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-900/20 to-purple-900/20 backdrop-blur-sm">
            {activeFeature ? (
              <div className="animate-in slide-in-from-right-5 duration-300">
                {renderFeatureContent(activeFeature)}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div className="relative">
                  {/* Floating stars around the central content */}
                  <div className="absolute -top-8 -left-8 w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
                  <div className="absolute -top-4 right-4 w-1 h-1 bg-blue-300 rounded-full opacity-80 animate-pulse delay-300"></div>
                  <div className="absolute bottom-0 -left-4 w-1 h-1 bg-purple-300 rounded-full opacity-70 animate-pulse delay-700"></div>
                  <div className="absolute -bottom-4 right-8 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-pulse delay-1000"></div>

                  <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-xl shadow-purple-500/20">
                    <BookOpen className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-purple-200 mb-2">
                      🌟 Select a Feature to Get Started
                    </h3>
                    <p className="text-purple-300/80">
                      Choose from our AI-powered tools to accelerate your
                      placement preparation journey through the galaxy
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
