"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/src/context/CursorContext";
import { ArrowUpRight, Code, Database, BarChart3, Bot, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  icon: React.ReactNode;
}

// 4 Featured Projects for Homepage
const homepageProjects: ProjectItem[] = [
  {
    id: "project-01",
    number: "01",
    title: "Dyno Dashboard",
    category: "Business Intelligence & Visualization",
    description:
      "High-performance real-time sales analytics dashboard with division tracking, ASP trends, return-rate insights, and interactive target vs. achievement visualizations.",
    highlights: [
      "Enabled non-technical stakeholders to self-serve sales and ASP trends",
      "Consolidated FY25-26 revenue metrics across 98,500+ units",
      "Interactive KPI cards with zero manual compilation overhead",
    ],
    tags: ["Power BI", "DAX", "SQL", "Python", "MIS Reporting"],
    demoUrl: "https://dyno-dashboard.vercel.app/",
    githubUrl: "https://github.com/MNegi17/Dyno-Dashboard",
    icon: <BarChart3 className="w-5 h-5 text-white" />,
  },
  {
    id: "project-02",
    number: "02",
    title: "Myntra Auto-Lister (Vision AI)",
    category: "Generative AI & E-Commerce Automation",
    description:
      "AI-powered catalog automation system using Gemini Vision AI to automatically extract garment attributes, size charts, and listing parameters from product photographs.",
    highlights: [
      "Cut catalog turnaround from 30+ hours to under 2 minutes (>99% reduction)",
      "Automated marketplace listing generation via Myntra REST APIs",
      "Eliminated manual data entry errors across footwear and apparel categories",
    ],
    tags: ["Python", "Gemini Vision AI", "REST APIs", "FastAPI", "Shopify"],
    demoUrl: "https://myntra-auto-lister-production.up.railway.app/",
    githubUrl: "https://github.com/MNegi17/Myntra-Auto-Lister",
    icon: <Sparkles className="w-5 h-5 text-white" />,
  },
  {
    id: "project-03",
    number: "03",
    title: "SKU Return Rate Classifier",
    category: "Machine Learning & Predictive Modeling",
    description:
      "Supervised machine learning classification model built in Python (scikit-learn) to flag high-return SKUs by category, price band, and size trends before fulfillment.",
    highlights: [
      "Reduced overall return rate from 47.9% (Q1) to 26.7% (Q4) — a 44% reduction",
      "Proactive alerts escalated to footwear and apparel design teams",
      "Integrated demand forecasting with historical order trends",
    ],
    tags: ["Python", "Scikit-Learn", "Pandas", "Supervised ML", "Excel"],
    icon: <Bot className="w-5 h-5 text-white" />,
  },
  {
    id: "project-04",
    number: "04",
    title: "D2C AutoLister Console",
    category: "Full-Stack Automation & APIs",
    description:
      "Widescreen operational console dashboard connecting Next.js with FastAPI to automate warehouse-to-Shopify product catalog synchronization and status tracking.",
    highlights: [
      "Automated Dropbox image/link fetcher and DSR (Daily Sales Report) generator",
      "Reduced daily reporting tasks from 2–3 hours down to ~10 minutes",
      "Real-time webhook notifications for pending action items",
    ],
    tags: ["Next.js", "FastAPI", "Python", "Shopify D2C", "PostgreSQL"],
    demoUrl: "https://d2c-autolister-pro.up.railway.app/",
    githubUrl: "https://github.com/MNegi17/D2C_AutoLister",
    icon: <Code className="w-5 h-5 text-white" />,
  },
];

export const Projects = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Only initialize GSAP horizontal pinned scroll on desktop (window width >= 768px)
    if (window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const getScrollAmount = () => {
      return track.scrollWidth - window.innerWidth;
    };

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5,
          start: "top top",
          end: () => `+=${getScrollAmount() + 200}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * (homepageProjects.length + 1)),
              homepageProjects.length
            );
            setActiveIndex((prev) => (prev !== index ? index : prev));
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-noise text-white overflow-hidden flex flex-col justify-between py-12 md:py-16"
    >
      {/* Section Top Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 pb-6 mb-8">
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
            // FEATURED SHOWCASE
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
            PROJECTS
          </h2>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0 font-mono text-xs text-neutral-400">
          <span className="hidden md:inline-block">SCROLL DOWN TO EXPLORE</span>
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-white font-semibold">
            <span>0{Math.min(activeIndex + 1, 4)}</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-500">04</span>
          </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (<768px): Native Vertical Clean Cards */}
      <div className="md:hidden px-4 space-y-8 my-4">
        {homepageProjects.map((project) => (
          <div
            key={project.id}
            className="w-full p-5 sm:p-8 rounded-2xl border border-neutral-800 bg-[#0e0e0e] shadow-xl space-y-6"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold">
                PROJECT {project.number}
              </span>

              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-white"
                  >
                    <Code className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-full bg-white text-black font-mono text-xs font-bold flex items-center gap-1"
                  >
                    <span>DEMO</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Media Placeholder Box */}
            <div className="relative w-full aspect-[16/10] rounded-xl border border-dashed border-neutral-700 bg-neutral-950 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 mb-2">
                {project.icon}
              </div>
              <span className="font-mono text-xs text-neutral-300 font-semibold uppercase">
                [ MEDIA PLACEHOLDER ]
              </span>
            </div>

            {/* Project Details */}
            <div>
              <span className="font-mono text-[11px] text-neutral-400 uppercase block mb-1">
                {project.category}
              </span>
              <h3 className="font-display text-2xl font-black text-white mb-2">
                {project.title}
              </h3>
              <p className="font-sans text-xs text-neutral-300 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-4 border-t border-b border-neutral-900 py-3">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Mobile More Projects CTA Card */}
        <div className="w-full p-6 rounded-2xl border border-white/40 bg-[#0e0e0e] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center">
            <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 font-semibold">
              ARCHIVE
            </span>
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-3xl font-black text-white">
              More Projects
            </h3>
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Explore full portfolio of analytics dashboards, machine learning models, and ETL pipelines in 2-card grid view.
            </p>
          </div>

          <Link
            href="/projects"
            className="w-full py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <span>OPEN ALL PROJECTS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* DESKTOP LAYOUT (>=768px): Horizontal GSAP Track */}
      <div className="hidden md:flex my-auto w-full overflow-hidden items-center">
        <div
          ref={trackRef}
          className="flex items-center gap-8 md:gap-12 px-6 sm:px-12 md:px-24 w-max will-change-transform transform-gpu"
        >
          {/* 4 Main Featured Projects */}
          {homepageProjects.map((project, index) => {
            const isSpotlight = index === activeIndex;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setCursor("project", "VIEW")}
                onMouseLeave={resetCursor}
                className={`relative w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[58vw] max-w-5xl shrink-0 p-6 sm:p-10 rounded-3xl border transition-all duration-300 transform-gpu overflow-hidden shadow-2xl ${
                  isSpotlight
                    ? "scale-100 opacity-100 brightness-100 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.15)] bg-[#0e0e0e]"
                    : "scale-[0.93] opacity-40 brightness-75 border-neutral-800 bg-[#0a0a0a]"
                }`}
              >
                {isSpotlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Top Bar */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold tracking-wider">
                      PROJECT {project.number}
                    </span>
                    <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest hidden sm:inline-block">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-white hover:text-black transition-colors"
                        title="GitHub Code"
                      >
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-200 transition-colors"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* 2-Column Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                    <div className="relative w-full aspect-[16/10] rounded-2xl border border-dashed border-neutral-700 bg-neutral-950 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner">
                      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

                      <div className="relative z-10 flex flex-col items-center gap-2.5">
                        <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                          {project.icon}
                        </div>
                        <span className="font-mono text-xs tracking-widest text-neutral-300 font-semibold uppercase">
                          [ MEDIA PLACEHOLDER ]
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500">
                          Add project screenshot / video clip
                        </span>
                      </div>

                      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-neutral-400 opacity-60" />
                      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-neutral-400 opacity-60" />
                      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-neutral-400 opacity-60" />
                      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-neutral-400 opacity-60" />
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                      {project.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-5 flex flex-col justify-between space-y-4 lg:pl-2">
                    <div>
                      <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider uppercase block mb-2">
                        // OVERVIEW & IMPACT
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="space-y-2 mb-6 border-t border-b border-neutral-900 py-3">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-neutral-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mb-2 font-semibold">
                        STACK & TECHNOLOGIES:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Desktop "More Projects" CTA Card */}
          <div
            onMouseEnter={() => setCursor("magnetic")}
            onMouseLeave={resetCursor}
            className={`w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[32vw] max-w-md shrink-0 h-[480px] rounded-3xl border transition-all duration-300 transform-gpu flex flex-col justify-between p-8 md:p-10 group text-white shadow-2xl relative overflow-hidden ${
              activeIndex === 4
                ? "scale-100 opacity-100 border-white bg-[#0e0e0e]"
                : "scale-[0.93] opacity-50 border-neutral-800 bg-[#0a0a0a]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex justify-between items-center">
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-semibold">
                ARCHIVE
              </span>
              <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <ArrowUpRight className="w-7 h-7 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>

            <div className="my-auto space-y-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                // EXPLORE FULL PORTFOLIO
              </span>
              <h3 className="font-display text-4xl sm:text-5xl font-black tracking-tight leading-none text-white">
                More Projects
              </h3>
              <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                View all analytics dashboards, machine learning models, ETL pipelines, and automation tools in 2-card grid view.
              </p>
            </div>

            <Link
              href="/projects"
              className="w-full py-4 rounded-full bg-white text-black font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 group-hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>OPEN ALL PROJECTS PAGE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Dots Indicator (Desktop only) */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto px-4 justify-center items-center gap-2 mt-4">
        {[...homepageProjects, null].map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-white" : "w-1.5 bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
