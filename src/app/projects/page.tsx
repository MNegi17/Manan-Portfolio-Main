"use client";

import React from "react";
import { motion } from "framer-motion";
import { CustomCursor } from "@/src/components/ui/CustomCursor";
import { SmoothScroll } from "@/src/components/ui/SmoothScroll";
import { Navbar } from "@/src/components/ui/Navbar";
import { Footer } from "@/src/components/sections/Footer";
import { useCursor } from "@/src/context/CursorContext";
import { ArrowLeft, ArrowUpRight, Code, Database, BarChart3, Bot, Sparkles, ExternalLink, Activity, Globe } from "lucide-react";
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

const allProjects: ProjectItem[] = [
  {
    id: "project-01",
    number: "01",
    title: "Dyno Dashboard",
    category: "Business Intelligence & Visualization",
    description:
      "High-performance real-time sales analytics dashboard with division tracking, ASP trends, return-rate insights, and interactive target vs. achievement visualizations.",
    highlights: [
      "Enabled non-technical stakeholders to self-serve sales & return data",
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
      "Eliminated manual data entry errors across footwear & apparel",
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
      "Automated Dropbox image/link fetcher and DSR generator",
      "Reduced daily reporting tasks from 2–3 hours down to ~10 minutes",
      "Real-time webhook notifications for pending action items",
    ],
    tags: ["Next.js", "FastAPI", "Python", "Shopify D2C", "PostgreSQL"],
    demoUrl: "https://d2c-autolister-pro.up.railway.app/",
    githubUrl: "https://github.com/MNegi17/D2C_AutoLister",
    icon: <Code className="w-5 h-5 text-white" />,
  },
  {
    id: "project-05",
    number: "05",
    title: "Healthcare Subscriber ETL Pipeline",
    category: "Data Engineering & Database Architecture",
    description:
      "Enterprise healthcare subscriber ETL pipeline built with Informatica PowerCenter and Oracle SQL to cleanse, standardize, and load thousands of records with validation checks.",
    highlights: [
      "Applied SQL transformations (Filter, Joiner, Router, Union) with 99.9% accuracy",
      "Automated personalized subscriber communications from validated datasets",
      "Implemented robust error-handling and audit trail checks",
    ],
    tags: ["Informatica PowerCenter", "Oracle SQL", "ETL", "Data Cleansing"],
    githubUrl: "https://github.com/MNegi17",
    icon: <Database className="w-5 h-5 text-white" />,
  },
  {
    id: "project-06",
    number: "06",
    title: "Insurance Risk Analytics Portal",
    category: "Business Intelligence & Risk Modeling",
    description:
      "Interactive Power BI analytics portal tracking insurance KPIs, loss ratios, policyholder demographic risk patterns, and financial claims distributions with DAX logic.",
    highlights: [
      "Designed dynamic loss ratio matrix & claim frequency filters",
      "Optimized DAX measure calculations for instant filter responses",
      "Automated demographic risk tier categorization",
    ],
    tags: ["Power BI", "DAX", "Financial Modeling", "Data Analysis"],
    githubUrl: "https://github.com/MNegi17/Insurance-Analytics-Dashboard-using-Power-BI",
    icon: <Activity className="w-5 h-5 text-white" />,
  },
  {
    id: "project-07",
    number: "07",
    title: "Geographical Sales Density Analyzer",
    category: "Spatial Analysis & Dark Store Planning",
    description:
      "Spatial demand-density analysis tool building heatmaps of sales quantity across all four city quadrants to identify optimal quick-commerce dark store expansion locations.",
    highlights: [
      "Recommended 40 optimal dark store locations across city quadrants",
      "Projected 525%–735% daily order volume growth over current retail stores",
      "Visualized regional order heatmaps using Python & Folium",
    ],
    tags: ["Python", "Geospatial Heatmaps", "Folium", "Demand Analysis"],
    icon: <Globe className="w-5 h-5 text-white" />,
  },
  {
    id: "project-08",
    number: "08",
    title: "Automated DSR & Operations Generator",
    category: "Process Engineering & Python Scripts",
    description:
      "Automated operational pipeline generating Daily Sales Reports (DSR) and fetching asset links from Dropbox automatically, eliminating manual compilation effort.",
    highlights: [
      "Cut catalog & report update turnaround from 2–3 hours to 10 minutes",
      "Automated team email notifications for pending action items",
      "Built custom cron scheduling & error recovery handlers",
    ],
    tags: ["Python", "Dropbox API", "SMTP Automation", "Cron Jobs"],
    icon: <Bot className="w-5 h-5 text-white" />,
  },
];

export default function AllProjectsPage() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <>
      <CustomCursor />
      <SmoothScroll>
        <main className="relative min-h-screen bg-background text-foreground bg-noise overflow-hidden pt-28 pb-20">
          <Navbar />

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
            {/* Header with Back Button */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-neutral-800">
              <div>
                <Link
                  href="/#projects"
                  onMouseEnter={() => setCursor("magnetic")}
                  onMouseLeave={resetCursor}
                  className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white mb-4 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span>BACK TO HOMEPAGE</span>
                </Link>
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                  ALL PROJECTS & ARCHIVE
                </h1>
              </div>
              <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 leading-relaxed">
                Complete portfolio of analytics dashboards, machine learning classifiers, ETL pipelines, and API automation tools arranged 2 per screen view.
              </p>
            </div>

            {/* 2-Card Grid Layout (2 projects per screen row view) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {allProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  onMouseEnter={() => setCursor("project", "VIEW")}
                  onMouseLeave={resetCursor}
                  className="group relative p-6 sm:p-8 rounded-3xl glass-card border border-neutral-800 hover:border-white/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl bg-[#0d0d0d]/90 hover:-translate-y-1.5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold tracking-wider">
                        {project.number}
                      </span>
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                        {project.icon}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
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
                          className="px-3 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold flex items-center gap-1 hover:bg-neutral-200 transition-colors"
                        >
                          <span>LIVE DEMO</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Media Container Placeholder */}
                  <div className="relative w-full aspect-[16/10] my-4 rounded-2xl border border-dashed border-neutral-700 bg-neutral-950/80 overflow-hidden flex flex-col items-center justify-center p-6 text-center group-hover:border-white/30 transition-colors duration-500">
                    <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        {project.icon}
                      </div>
                      <span className="font-mono text-xs tracking-wider text-neutral-300 font-semibold uppercase">
                        [ MEDIA PLACEHOLDER ]
                      </span>
                    </div>

                    <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-neutral-400 opacity-60" />
                    <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-neutral-400 opacity-60" />
                    <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-neutral-400 opacity-60" />
                    <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-neutral-400 opacity-60" />
                  </div>

                  {/* Project Info */}
                  <div className="mt-4">
                    <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-6 border-t border-neutral-900 pt-3">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 font-mono text-[11px] text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
