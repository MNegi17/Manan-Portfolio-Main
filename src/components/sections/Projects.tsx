"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/src/context/CursorContext";
import { ArrowUpRight, Code, Database, BarChart3, Bot, Sparkles, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import { ProjectImageGallery } from "@/src/components/ui/ProjectImageGallery";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  icon: React.ReactNode;
}

// 4 Featured Projects for Homepage in Exact Requested Sequence
const homepageProjects: ProjectItem[] = [
  {
    id: "project-01",
    number: "01",
    title: "DynoDashboard",
    category: "Business Intelligence & Visualization",
    description:
      "High-performance real-time sales analytics dashboard with division tracking, ASP trends, return-rate insights, and interactive target vs. achievement visualizations.",
    highlights: [
      "Enabled non-technical stakeholders to self-serve sales & return data",
      "Consolidated FY25-26 revenue metrics across 98,500+ units",
      "Interactive KPI cards with zero manual compilation overhead",
    ],
    tags: ["Power BI", "DAX", "SQL", "Python", "MIS Reporting"],
    images: [
      "/projects/Dyno%20Dashboard/Dyno-Dashboard_1.png",
      "/projects/Dyno%20Dashboard/Dyno-Dashboard_2.png",
      "/projects/Dyno%20Dashboard/Dyno-Dashboard_3.png",
      "/projects/Dyno%20Dashboard/Dyno-Dashboard_4.png",
      "/projects/Dyno%20Dashboard/Dyno-Dashboard_5.png",
    ],
    demoUrl: "https://dyno-dashboard.vercel.app/",
    githubUrl: "https://github.com/MNegi17/Dyno-Dashboard",
    icon: <BarChart3 className="w-5 h-5 text-white" />,
  },
  {
    id: "project-02",
    number: "02",
    title: "Geographical Sales Density Analyzer",
    category: "Spatial Analysis & Dark Store Planning",
    description:
      "Geospatial demand-density mapping tool analyzing revenue quantity across city quadrants to identify optimal quick-commerce dark store expansion locations.",
    highlights: [
      "Recommended 40 optimal dark store locations across city quadrants",
      "Projected 525%–735% daily order volume growth over current retail stores",
      "Visualized regional order heatmaps using Python & Folium",
    ],
    tags: ["Python", "Geospatial Heatmaps", "Folium", "Demand Analysis"],
    images: [
      "/projects/Geographical%20Sales%20Density%20Analyzer/Heatmap_1.png",
      "/projects/Geographical%20Sales%20Density%20Analyzer/Heatmap_2.png",
      "/projects/Geographical%20Sales%20Density%20Analyzer/Heatmap_3.png",
      "/projects/Geographical%20Sales%20Density%20Analyzer/Heatmap_4.png",
      "/projects/Geographical%20Sales%20Density%20Analyzer/Heatmap_5.png",
    ],
    icon: <Globe className="w-5 h-5 text-white" />,
  },
  {
    id: "project-03",
    number: "03",
    title: "Myntra Autolister (Vision AI)",
    category: "Generative AI & E-Commerce Automation",
    description:
      "AI-powered catalog automation system using Gemini Vision AI to automatically extract garment attributes, size charts, and listing parameters from product photographs.",
    highlights: [
      "Cut catalog turnaround from 30+ hours to under 2 minutes (>99% reduction)",
      "Automated marketplace listing generation via Myntra REST APIs",
      "Eliminated manual data entry errors across footwear & apparel categories",
    ],
    tags: ["Python", "Gemini Vision AI", "REST APIs", "FastAPI", "Shopify"],
    images: [
      "/projects/Myntra%20Autolister/Myntra-Autolister_1.png",
      "/projects/Myntra%20Autolister/Myntra-Autolister_2.png",
      "/projects/Myntra%20Autolister/Myntra-Autolister_3.png",
    ],
    demoUrl: "https://myntra-auto-lister-production.up.railway.app/",
    githubUrl: "https://github.com/MNegi17/Myntra-Auto-Lister",
    icon: <Sparkles className="w-5 h-5 text-white" />,
  },
  {
    id: "project-04",
    number: "04",
    title: "Automated DSR & Operations Console",
    category: "Daily Sales Reporting & Workflow Automation",
    description:
      "Automated Daily Sales Reporting engine fetching transaction data, Dropbox image links, and warehouse metrics to construct executive DSR summaries.",
    highlights: [
      "Reduced daily reporting turnaround from 2-3 hours down to 10 minutes",
      "Automated data ingestion from ERP warehouse logs and D2C marketplaces",
      "Real-time variance alerts for daily target metrics",
    ],
    tags: ["Python", "FastAPI", "Dropbox API", "PostgreSQL", "Shopify D2C"],
    images: [
      "/projects/Automated%20DSR/DSR_1.png",
      "/projects/Automated%20DSR/DSR_2.png",
      "/projects/Automated%20DSR/DSR_3.png",
      "/projects/Automated%20DSR/DSR_4.png",
    ],
    demoUrl: "https://d2c-autolister-pro.up.railway.app/",
    githubUrl: "https://github.com/MNegi17/D2C_AutoLister",
    icon: <Bot className="w-5 h-5 text-white" />,
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
      className="relative min-h-screen w-full bg-noise text-white overflow-hidden flex flex-col justify-between pt-16 md:pt-20 pb-4 md:pb-6"
    >
      {/* Section Top Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 pb-3 md:pb-4 mb-3 md:mb-5 shrink-0">
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-1">
            // FEATURED SHOWCASE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-none">
            PROJECTS
          </h2>
        </div>
        <div className="flex items-center gap-4 mt-3 md:mt-0 font-mono text-xs text-neutral-400">
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

            {/* Photo Gallery Component */}
            <ProjectImageGallery images={project.images} title={project.title} icon={project.icon} />

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
          className="flex items-center gap-6 md:gap-10 px-6 sm:px-12 md:px-20 w-max will-change-transform transform-gpu"
        >
          {/* 4 Main Featured Projects */}
          {homepageProjects.map((project, index) => {
            const isSpotlight = index === activeIndex;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setCursor("project", "VIEW")}
                onMouseLeave={resetCursor}
                className={`relative w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[56vw] max-w-4xl shrink-0 p-5 md:p-6 lg:p-7 rounded-3xl border transition-all duration-300 transform-gpu overflow-hidden shadow-2xl ${
                  isSpotlight
                    ? "scale-100 opacity-100 brightness-100 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.15)] bg-[#0e0e0e]"
                    : "scale-[0.94] opacity-40 brightness-75 border-neutral-800 bg-[#0a0a0a]"
                }`}
              >
                {isSpotlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Top Bar */}
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold tracking-wider">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
                    {/* Interactive Photo Carousel */}
                    <ProjectImageGallery images={project.images} title={project.title} icon={project.icon} />

                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-between space-y-3 lg:pl-1">
                    <div>
                      <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider uppercase block mb-1">
                        // OVERVIEW & IMPACT
                      </span>
                      <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-3">
                        {project.description}
                      </p>

                      <div className="space-y-1.5 mb-4 border-t border-b border-neutral-900 py-2.5">
                        {project.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-neutral-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase block mb-1 font-semibold">
                        STACK & TECHNOLOGIES:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
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
            className={`w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-sm shrink-0 rounded-3xl border transition-all duration-300 transform-gpu flex flex-col justify-between p-6 md:p-8 group text-white shadow-2xl relative overflow-hidden ${
              activeIndex === 4
                ? "scale-100 opacity-100 border-white bg-[#0e0e0e]"
                : "scale-[0.94] opacity-50 border-neutral-800 bg-[#0a0a0a]"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-xs px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 font-semibold">
                ARCHIVE
              </span>
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>

            <div className="my-auto space-y-3">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                // EXPLORE FULL PORTFOLIO
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
                More Projects
              </h3>
              <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                View all analytics dashboards, machine learning models, ETL pipelines, and automation tools in 2-card grid view.
              </p>
            </div>

            <Link
              href="/projects"
              className="w-full py-3.5 mt-6 rounded-full bg-white text-black font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 group-hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>OPEN ALL PROJECTS PAGE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Dots Indicator (Desktop only) */}
      <div className="hidden md:flex w-full max-w-7xl mx-auto px-4 justify-center items-center gap-2 mt-2">
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
