import React from "react";
import { ScreenType } from "../types";
import { ArrowRight, Leaf, Shield, ShieldCheck, Zap, Database, BarChart3, ChevronRight, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface LandingScreenProps {
  setScreen: (screen: ScreenType) => void;
}

export default function LandingScreen({ setScreen }: LandingScreenProps) {
  return (
    <div className="bg-[#f1f5f9] min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Sparkles className="h-3 w-3 text-[#6366f1] animate-pulse" />
                <span>EcoSense AI Platform Live</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-tight">
                Transforming Global Waste Logistics through <span className="text-[#6366f1] font-extrabold relative">Surgical Precision</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-[#64748b] leading-relaxed max-w-xl font-medium">
                EcoSense bridges real-time IoT bin monitoring and automated AI visual classification to build the world's most precise circular waste stewardship system.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setScreen(ScreenType.AUTH)}
                  className="flex items-center justify-center bg-[#6366f1] hover:bg-[#5046e5] text-white font-bold text-base px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer"
                  id="hero-get-started"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => setScreen(ScreenType.AUTH)}
                  className="flex items-center justify-center bg-[#1e293b] hover:bg-slate-800 text-white font-bold text-base px-6 py-3.5 rounded-xl transition-all duration-150 cursor-pointer border border-transparent shadow-xs"
                  id="hero-view-analytics"
                >
                  <span>View Dashboard</span>
                </button>
              </div>

              {/* Trust Metric badges */}
              <div className="mt-10 border-t border-slate-100 pt-8 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-display font-bold text-2xl text-slate-800">-24%</p>
                  <p className="text-xs text-slate-500 font-medium">Carbon Footprint</p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-slate-800">98.4%</p>
                  <p className="text-xs text-slate-500 font-medium">AI Precision Rate</p>
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-slate-800">12.4t</p>
                  <p className="text-xs text-slate-500 font-medium">Waste Diverted</p>
                </div>
              </div>
            </div>

            {/* Right Graphic Column */}
            <div className="mt-16 sm:mt-20 lg:mt-0 lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Decorative glowing gradient backdrops */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                {/* Dashboard graphic frame */}
                <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden p-1.5">
                  <div className="bg-slate-950 rounded-xl p-4 text-slate-300 font-mono text-xs overflow-hidden h-[360px] flex flex-col justify-between">
                    <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 border border-emerald-900 px-2 py-0.5 rounded-sm">
                        ECOSENSE_LOGISTICS_AI: ON
                      </span>
                    </div>

                    <div className="my-auto space-y-4">
                      {/* Simulation log 1 */}
                      <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-md">
                        <p className="text-emerald-400 font-bold flex items-center">
                          <Zap className="h-3 w-3 mr-1" /> CORE ROUTE OPTIMIZED
                        </p>
                        <p className="text-slate-400 text-[10px] mt-1">Sector B-4: Dispatch team rerouted via 2nd Ave to save 18% fuel emissions.</p>
                      </div>

                      {/* Simulation log 2 */}
                      <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-md">
                        <p className="text-sky-400 font-bold flex items-center">
                          <Database className="h-3 w-3 mr-1" /> TELEMETRY TELESTREAM
                        </p>
                        <p className="text-slate-400 text-[10px] mt-1">Bin ECO-NYC-0422 level reported at 94%. Automatic pickup ticket logged.</p>
                      </div>

                      {/* Code look */}
                      <div className="text-[10px] text-emerald-500/80 bg-slate-950 p-2 rounded-sm border border-slate-900 font-mono">
                        <span className="text-pink-400">const</span> analysisResult = <span className="text-blue-400">await</span> ai.classify(wasteImage);<br />
                        <span className="text-slate-500">// Classification: Lithium Battery [HAZARDOUS]</span><br />
                        <span className="text-amber-400">pointsGranted</span> = 25;
                      </div>
                    </div>

                    <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-slate-500 text-[10px]">
                      <span>PING: 14ms</span>
                      <span>FPS: 60.00</span>
                      <span>SYS_STABLE: 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Stats Grid - The Global Waste Crisis */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#6366f1] font-mono text-xs font-bold uppercase tracking-widest bg-[#6366f1]/10 px-3 py-1 rounded-full">
            Global Impact
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 mt-3.5">
            The Global Waste Crisis Demands Intelligence
          </h2>
          <p className="mt-3 text-[#64748b] font-medium text-sm">
            Deploying algorithmic models and decentralized points networks to divert waste back into the value chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#e2e8f0] flex flex-col justify-between">
            <div>
              <div className="bg-rose-500/10 p-3 rounded-2xl text-rose-600 w-12 mb-4 flex justify-center">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-slate-950">Telemetry Monitoring</h3>
              <p className="text-xs text-[#64748b] leading-relaxed mt-2 font-medium">
                IoT sensors instantly register fill statuses of municipal bin networks, flagging overflow before it hits public sidewalks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-rose-600 font-mono">
              <span>94% threshold alert</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#e2e8f0] flex flex-col justify-between">
            <div>
              <div className="bg-[#6366f1]/10 p-3 rounded-2xl text-[#6366f1] w-12 mb-4 flex justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-slate-950">Surgical AI Diagnostics</h3>
              <p className="text-xs text-[#64748b] leading-relaxed mt-2 font-medium">
                Our advanced Gemini models classify materials instantly, supplying highly specific handling directives for complex items like batteries or e-waste.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-[#6366f1] font-mono">
              <span>98.4% diagnostic rate</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#e2e8f0] flex flex-col justify-between">
            <div>
              <div className="bg-amber-500/10 p-3 rounded-2xl text-amber-600 w-12 mb-4 flex justify-center">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-slate-950">Circular Incentive Economy</h3>
              <p className="text-xs text-[#64748b] leading-relaxed mt-2 font-medium">
                Stewardship actions yield EcoPoints redeemable for public utility credits, organic food discounts, or local forestry funding.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-amber-600 font-mono">
              <span>2.4M points distributed</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Intelligent Stewardship Flow - 4 Steps */}
      <section className="bg-slate-900 py-16 sm:py-20 text-white border-t border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#8b5cf6] font-mono text-xs font-bold uppercase tracking-widest bg-[#8b5cf6]/10 px-3 py-1 rounded-full border border-[#8b5cf6]/20">
              Step-by-Step
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-3.5">
              Intelligent Stewardship Flow
            </h2>
            <p className="mt-4 text-slate-400 text-sm font-medium">
              The four frictionless phases turning daily sorting choices into durable municipal environmental impacts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-[24px] relative">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center bg-[#6366f1] text-white font-extrabold h-10 w-10 rounded-full font-mono">
                  1
                </div>
                <h4 className="font-display font-bold text-base">Snap & Upload</h4>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">
                Take a photograph or insert descriptive details of any disposal container directly in our camera panel interface.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-[24px] relative">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center bg-[#6366f1] text-white font-extrabold h-10 w-10 rounded-full font-mono">
                  2
                </div>
                <h4 className="font-display font-bold text-base">Classify</h4>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">
                EcoSense AI instantly dissects material composite, weight, and hazard parameters using server-side deep visual models.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-[24px] relative">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center bg-[#6366f1] text-white font-extrabold h-10 w-10 rounded-full font-mono">
                  3
                </div>
                <h4 className="font-display font-bold text-base">Directives</h4>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">
                Receive surgically specific sorted instructions—essential for avoiding recycling contamination in local waste hubs.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-[24px] relative">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center bg-[#8b5cf6] text-white font-extrabold h-10 w-10 rounded-full font-mono">
                  4
                </div>
                <h4 className="font-display font-bold text-base">EcoPoints</h4>
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-medium">
                Accumulate real points for active stewardship. Exchange them for local rewards, tax credits, or certified nature contributions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Spotlight Section - Precision Monitoring */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#6366f1]/10 text-[#6366f1] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <ShieldCheck className="h-4 w-4" />
              <span>LOGISTICS DEEP-TECH</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Precision Monitoring for the Modern Enterprise
            </h2>
            <p className="mt-4 text-xs text-[#64748b] leading-relaxed font-medium">
              We bring full structural safety, telemetry metrics, and optimal automated scheduling to municipal city networks and corporate campuses. Keep areas pristine and logistics fully sustainable.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-[#6366f1]/10 text-[#6366f1] p-1.5 rounded-lg">
                  <Leaf className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-slate-900">Automatic Route Dispatch</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">AI monitors fills and recalculates garbage pickup schedules, saving massive fuel and labor costs.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 bg-[#6366f1]/10 text-[#6366f1] p-1.5 rounded-lg">
                  <Database className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-slate-900">Relational Telemetry Data</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Track history, optimize locations, and forecast waste volumes months in advance.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-12 lg:mt-0 bg-[#0f172a] border border-slate-800 rounded-[24px] p-8 text-white relative overflow-hidden shadow-xl">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#6366f1]/20 via-transparent to-transparent"></div>
            
            <div className="relative">
              <span className="font-mono text-[#8b5cf6] font-bold text-xs">DYNAMIC TELEMETRY PREVIEW</span>
              <h3 className="font-display font-bold text-2xl mt-2">Sector B-4 Dispatch Panel</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Real-time load balancing and alert processing map.</p>

              {/* Fake Bin List */}
              <div className="mt-6 space-y-3">
                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-mono text-xs font-bold text-white">ECO-NYC-0422</p>
                    <p className="text-[10px] text-slate-400">Broadway & Prince St • E-Waste</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-900/50 px-2.5 py-1 rounded-md">94% FULL</span>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-mono text-xs font-bold text-white">ECO-NYC-0115</p>
                    <p className="text-[10px] text-slate-400">Midtown - 5th Ave • Plastic</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-900/50 px-2.5 py-1 rounded-md">88% FULL</span>
                  </div>
                </div>

                <div className="bg-slate-900/20 border border-slate-800 p-3.5 rounded-2xl flex justify-between items-center opacity-60">
                  <div>
                    <p className="font-mono text-xs font-bold text-white">ECO-NYC-0841</p>
                    <p className="text-[10px] text-slate-400">Union Square West • Organic</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#6366f1] bg-[#6366f1]/10 border border-[#6366f1]/20 px-2.5 py-1 rounded-md">45% SAFE</span>
                  </div>
                </div>
              </div>

              {/* Route Suggestion Banner */}
              <div className="mt-6 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-[#8b5cf6] animate-spin" style={{ animationDuration: '6s' }} />
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  <strong>AI Router:</strong> Diverting collection Truck #4 to Prince St immediately avoids standard peak hour congestion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Leaf className="h-12 w-12 text-indigo-100 mx-auto animate-bounce" />
          <h2 className="font-display text-3xl font-extrabold tracking-tight mt-6 sm:text-4xl text-white">
            Ready to pioneer the circular economy?
          </h2>
          <p className="mt-4 text-indigo-100 max-w-xl mx-auto text-base">
            Join thousands of active citizens, companies, and municipalities tracking their waste, earning rewards, and healing local soils.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setScreen(ScreenType.AUTH)}
              className="bg-white hover:bg-slate-50 text-[#6366f1] font-bold text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer"
              id="cta-join-now"
            >
              Sign Up or Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
