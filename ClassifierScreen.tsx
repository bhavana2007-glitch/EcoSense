import React, { useState, useRef } from "react";
import { ScreenType, User, ActivityLog, WasteClassificationResult } from "../types";
import { 
  Camera, Upload, Sparkles, AlertTriangle, ShieldCheck, Award, ArrowRight,
  RefreshCw, CheckCircle2, MapPin, Eye, FileText, Trash2, Leaf
} from "lucide-react";

interface ClassifierScreenProps {
  user: User;
  addActivity: (activity: ActivityLog) => void;
  updateUserPoints: (points: number, weight: number) => void;
}

const PRESET_WASTE_ITEMS = [
  {
    name: "Lithium Ion Battery",
    category: "E-Waste" as const,
    description: "Old laptop battery swollen slightly with terminal expose",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Clear Polyethylene Bottle",
    category: "Plastic" as const,
    description: "Clean plastic beverage container with PET logo",
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Organic Coffee Grounds",
    category: "Organic" as const,
    description: "Used dark filter coffee leftovers",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80",
  },
  {
    name: "Corrugated Shipping Carton",
    category: "Paper" as const,
    description: "Flattened cardboard parcel packing box",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400&auto=format&fit=crop&q=80",
  }
];

export default function ClassifierScreen({ user, addActivity, updateUserPoints }: ClassifierScreenProps) {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WasteClassificationResult | null>(null);
  const [pointsClaimed, setPointsClaimed] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Activate HTML Camera stream
  const startCamera = async () => {
    setWebcamActive(true);
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      setError("Unable to access camera. Please select or drag an image file instead.");
      setWebcamActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImage(dataUrl);
        // Stop streams
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setWebcamActive(false);
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Run AI sorting analysis
  const runClassification = async () => {
    if (!image && !description) {
      setError("Please capture a photo, upload an image, or select a demo preset first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setPointsClaimed(false);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, description }),
      });

      if (!response.ok) {
        throw new Error("API server responded with error status");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Server classification failed. Running mock diagnostic standard fallback.");
      // Fallback
      setResult({
        itemName: description || "Lithium Ion Battery",
        category: "E-Waste",
        hazardStatus: "HAZARDOUS",
        confidence: 96.8,
        points: 25,
        disposalSteps: [
          "Tape the battery terminals with electrical tape to avoid shorts.",
          "Place inside a secure separate plastic bag.",
          "Do not mix with generic household glass or paper garbage.",
          "Deliver immediately to a specialized EcoSense electronics container."
        ],
        sustainableAlternatives: [
          "Purchase USB-C rechargeable AA nickel-metal hydride batteries.",
          "Use direct grid electricity where possible."
        ],
        specialInstructions: "CRITICAL: Contains lithium cells. Damaged batteries represent fire/toxic outflow risks."
      });
    } finally {
      setLoading(false);
    }
  };

  // Presets trigger helper
  const handleSelectPreset = (preset: typeof PRESET_WASTE_ITEMS[0]) => {
    setImage(preset.image);
    setDescription(preset.description);
    setResult(null);
    setPointsClaimed(false);
    setError("");
  };

  // Claim points rewards logic
  const handleClaimPoints = () => {
    if (result && !pointsClaimed) {
      const weightMock = result.category === "E-Waste" ? 0.25 : result.category === "Paper" ? 1.4 : result.category === "Plastic" ? 0.35 : 0.8;
      addActivity({
        id: `act-${Date.now()}`,
        itemName: result.itemName,
        category: result.category,
        points: result.points,
        weight: weightMock,
        date: "Just now"
      });
      updateUserPoints(result.points, weightMock);
      setPointsClaimed(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <span className="text-[#6366f1] font-mono text-xs font-bold uppercase tracking-widest bg-[#6366f1]/10 px-3 py-1 rounded-full">
          Smart Vision Engine
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mt-3">
          Smart Waste Classifier
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b] mt-2 font-medium">
          Identify, categorize, and discover exact disposal sorting steps for any waste item instantly using advanced AI visual diagnostics.
        </p>
      </div>

      {/* Main Container: Left = Camera/Presets, Right = Results/Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Capture & Presets Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h3 className="font-display font-extrabold text-base text-slate-950 mb-4 flex items-center">
              <Camera className="h-5 w-5 text-[#6366f1] mr-2" />
              Capture or Upload Item
            </h3>

            {/* Error notifications */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl mb-4 text-xs flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-rose-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Camera Box */}
            <div className="aspect-video bg-slate-900 rounded-xl border border-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-slate-400 group">
              {webcamActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 flex space-x-2">
                    <button
                      onClick={capturePhoto}
                      className="px-4 py-2 bg-[#6366f1] hover:bg-[#5046e5] text-white font-bold text-xs rounded-full flex items-center space-x-1 shadow-md cursor-pointer"
                    >
                      <Camera className="h-3.5 w-3.5" />
                      <span>Take Photo</span>
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-full cursor-pointer"
                    >
                      <span>Cancel</span>
                    </button>
                  </div>
                </>
              ) : image ? (
                <>
                  <img 
                    src={image} 
                    alt="Uploaded item" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Clear overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => setImage(null)}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-6 flex flex-col items-center">
                  <Upload className="h-10 w-10 text-slate-500 mb-3 animate-bounce" />
                  <p className="text-xs font-semibold text-slate-300">Drag your item image file here</p>
                  <p className="text-[10px] text-slate-500 mt-1">supports JPEG, PNG formats</p>
                  
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={triggerUpload}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center space-x-1"
                    >
                      <span>Select File</span>
                    </button>
                    <button
                      onClick={startCamera}
                      className="px-3.5 py-1.5 bg-[#6366f1] hover:bg-[#5046e5] text-white text-xs font-bold rounded-xl cursor-pointer flex items-center space-x-1"
                    >
                      <Camera className="h-3 w-3" />
                      <span>Use Camera</span>
                    </button>
                  </div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Description/Clue input field */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Add descriptive text (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Broken battery, metal beverage can, greasy paper wrapper..."
                className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1] min-h-[60px]"
                id="classifier-desc-input"
              />
            </div>

            <button
              onClick={runClassification}
              disabled={loading || (!image && !description)}
              className="mt-4 w-full py-3.5 bg-[#6366f1] hover:bg-[#5046e5] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-xs"
              id="classifier-analyze-btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Processing AI Diagnostics...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Analyze with EcoSense AI</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Demo Presets Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Or Choose a Simulator Demo Preset
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {PRESET_WASTE_ITEMS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleSelectPreset(preset)}
                  className="p-3 border border-slate-100 hover:border-[#6366f1]/20 hover:bg-[#6366f1]/5 rounded-xl text-left transition-all flex flex-col justify-between h-[110px] cursor-pointer"
                >
                  <p className="text-xs font-bold text-slate-800 truncate">{preset.name}</p>
                  <p className="text-[10px] text-[#6366f1] font-mono font-bold mt-1">{preset.category}</p>
                  <img 
                    src={preset.image} 
                    alt={preset.name}
                    className="w-full h-8 object-cover rounded-md mt-2"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Analysis Results Card */}
        <div className="lg:col-span-7 space-y-6">
          {loading ? (
            <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center h-[400px]">
              <RefreshCw className="h-10 w-10 text-[#6366f1] animate-spin mb-4" />
              <p className="font-display font-extrabold text-slate-950 text-lg">Deconstructing material elements...</p>
              <p className="text-xs text-slate-500 mt-2 max-w-xs text-center font-medium">
                Gemini AI is parsing the image components, verifying toxicity parameters, and drafting optimal sorted workflows.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Classification Result Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                  <div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md border ${
                      result.hazardStatus === "HAZARDOUS" 
                        ? "bg-rose-50 text-rose-700 border-rose-100" 
                        : result.hazardStatus === "WARNING"
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100"
                    }`}>
                      {result.hazardStatus} Status
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-slate-950 mt-2">{result.itemName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">Confidence Level: <strong>{result.confidence}%</strong></p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-mono font-bold">Category</p>
                    <p className="text-sm font-extrabold text-slate-800 font-mono mt-0.5">{result.category}</p>
                  </div>
                </div>

                {/* Disposal Workflow list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-slate-400" />
                    Optimal Sorting Guidelines
                  </h4>
                  <ol className="space-y-2 pl-4 list-decimal text-xs text-slate-600 font-medium">
                    {result.disposalSteps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Sustainable Alternatives */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                    <Leaf className="h-4 w-4 mr-1 text-[#6366f1]" />
                    Sustainable Alternatives
                  </h4>
                  <ul className="space-y-1 pl-4 list-disc text-xs text-slate-600 font-medium">
                    {result.sustainableAlternatives.map((alt, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">
                        {alt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Claim Points reward Card */}
                <div className="mt-6 p-4.5 bg-amber-500/10 border border-amber-500/20 rounded-[24px] flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-xl text-amber-850">
                      <Award className="h-5 w-5 fill-amber-500 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Potential Reward Award</p>
                      <p className="text-base font-extrabold text-amber-950">+{result.points} EcoPoints</p>
                    </div>
                  </div>

                  <button
                    onClick={handleClaimPoints}
                    disabled={pointsClaimed}
                    className={`px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                      pointsClaimed 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200" 
                        : "bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg"
                    }`}
                    id="claim-reward-points"
                  >
                    {pointsClaimed ? (
                      <span className="flex items-center space-x-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Points Added!</span>
                      </span>
                    ) : (
                      <span>Claim EcoPoints</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Satellite specialized Map component */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <h4 className="font-display font-extrabold text-base text-slate-950 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 text-rose-500 mr-2" />
                  Nearby Specialized E-Waste & Hazardous Bins
                </h4>
                <p className="text-xs text-[#64748b] mb-4 font-medium">
                  Satellite telemetry suggests active reception bays located near your GPS sector.
                </p>

                {/* Styled Vector Map Mockup */}
                <div className="relative bg-slate-950 aspect-video rounded-xl border border-slate-900 overflow-hidden">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Styled roads lines and markers */}
                  <svg className="absolute inset-0 w-full h-full text-slate-800" stroke="currentColor" strokeWidth="2">
                    <line x1="10%" y1="0%" x2="10%" y2="100%" />
                    <line x1="45%" y1="0%" x2="45%" y2="100%" />
                    <line x1="80%" y1="0%" x2="80%" y2="100%" />
                    <line x1="0%" y1="35%" x2="100%" y2="35%" />
                    <line x1="0%" y1="75%" x2="100%" y2="75%" />
                  </svg>

                  {/* Satellite indicators / Markers */}
                  <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                    <div className="bg-rose-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white animate-ping absolute top-0 left-0"></div>
                    <div className="bg-rose-600 text-white p-1.5 rounded-full shadow-lg border-2 border-white relative z-10">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl border border-slate-800 w-36 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 font-mono">
                      <p className="font-bold text-white">ECO-NYC-0422</p>
                      <p className="text-[#6366f1] mt-0.5">SOHO Prince St</p>
                      <p className="text-rose-400 mt-0.5">Fill Level: 94%</p>
                    </div>
                  </div>

                  <div className="absolute top-2/3 left-2/3 group cursor-pointer">
                    <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white relative z-10">
                      <MapPin className="h-3.5 w-3.5" />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-xl border border-slate-800 w-36 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30 font-mono">
                      <p className="font-bold text-white">ECO-NYC-0841</p>
                      <p className="text-[#6366f1] mt-0.5">Union Sq West</p>
                      <p className="text-[#6366f1] mt-0.5">Fill Level: 45%</p>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 bg-slate-900/90 text-[10px] text-slate-400 p-2 rounded-lg border border-slate-800 font-mono">
                    <p className="text-white font-bold">GPS COORDINATES</p>
                    <p>LAT: 40.7252 N</p>
                    <p>LON: 73.9967 W</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-center items-center h-[400px] text-slate-400 text-center">
              <Eye className="h-12 w-12 text-slate-300 mb-4" />
              <p className="font-display font-bold text-slate-800 text-lg">Diagnostics Result Console</p>
              <p className="text-xs text-slate-500 mt-2 max-w-xs font-medium">
                Supply an image or select one of our simulator presets on the left, then trigger the AI analysis.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
