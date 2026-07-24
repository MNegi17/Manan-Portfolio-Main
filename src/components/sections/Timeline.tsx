"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/src/context/CursorContext";
import { Briefcase, GraduationCap, Award, Cpu } from "lucide-react";

interface TimelineItem {
  year: string;
  type: "Experience" | "Internship" | "Education" | "Certifications";
  title: string;
  organization: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    year: "NOV 2025 - PRESENT",
    type: "Experience",
    title: "Data Analyst Executive",
    organization: "Purple United Kids",
    description: "Leading e-commerce data analytics, demand forecasting, SKU-level machine learning return models, and REST API automation tools.",
    highlights: [
      "Built Python ML classification model reducing SKU return rate from 47.9% to 26.7% (44% drop)",
      "Engineered Python auto-listing tools (Myntra/Shopify REST APIs) cutting catalog turnaround by >99%",
      "Analyzed FY25-26 revenue (₹6.72 Cr, 98.5K units) & guided markdown strategy boosting ASP by +59.6%",
      "Deployed Dyno Dashboard (Power BI KPI reporting) & automated daily operations scripts",
    ],
    icon: <Briefcase className="w-5 h-5 text-white" />,
  },
  {
    year: "MAR 2025 - JUL 2025",
    type: "Internship",
    title: "Data Engineering Intern",
    organization: "Cognizant Technology Solutions",
    description: "Architected enterprise healthcare ETL data pipelines, SQL data validation checks, and Oracle database transformations.",
    highlights: [
      "Built healthcare subscriber data pipeline using Informatica PowerCenter & Oracle SQL",
      "Applied SQL transformations (Filter, Joiner, Router, Union) to cleanse thousands of records",
      "Automated personalized subscriber onboarding communications from validated datasets",
    ],
    icon: <Cpu className="w-5 h-5 text-white" />,
  },
  {
    year: "2021 - 2025",
    type: "Education",
    title: "B.Tech in Computer Science",
    organization: "Noida Institute of Engineering and Technology",
    description: "Specialized in Computer Science, Database Management Systems, Data Structures, Algorithms, and Software Engineering.",
    highlights: [
      "Focused on Data Analytics, Python Development, and Database Optimization",
      "Developed end-to-end analytical models and database management systems",
    ],
    icon: <GraduationCap className="w-5 h-5 text-white" />,
  },
  {
    year: "2025",
    type: "Certifications",
    title: "Specialized Data & SQL Certifications",
    organization: "HackerRank & Udemy",
    description: "Verified domain proficiency in Data Warehousing, Dimensional Data Modelling, and Complex SQL Querying.",
    highlights: [
      "HackerRank: SQL (Basic)",
      "Udemy: SQL Basics, Data Warehouse Fundamentals & Data Modelling",
    ],
    icon: <Award className="w-5 h-5 text-white" />,
  },
];

export const Timeline = () => {
  const { setCursor, resetCursor } = useCursor();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (lineRef.current && timelineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="timeline"
      ref={timelineRef}
      className="relative py-32 px-4 sm:px-8 md:px-16 w-full max-w-7xl mx-auto bg-noise text-white border-t border-neutral-800"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-neutral-800">
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-3">
            // CHRONOLOGY & CAREER PATH
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
            EXPERIENCE & EDUCATION
          </h2>
        </div>
        <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 leading-relaxed">
          Verifiable record of analytical impact across Purple United Kids, Cognizant, and Noida Institute of Engineering and Technology.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 md:pl-12">
        {/* Animated Central Vertical Line */}
        <div
          ref={lineRef}
          className="absolute left-0 md:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-white via-neutral-500 to-neutral-800 origin-top"
        />

        {/* Timeline Items */}
        <div className="space-y-16">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setCursor("pointer")}
              onMouseLeave={resetCursor}
              className="relative group pl-6 md:pl-10"
            >
              {/* Timeline Node Icon */}
              <div className="absolute -left-[31px] md:-left-[23px] top-1.5 w-8 h-8 rounded-full bg-neutral-950 border border-neutral-700 group-hover:border-white group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-xl">
                {item.icon}
              </div>

              {/* Card Container */}
              <div className="p-6 md:p-8 rounded-2xl glass-card border border-neutral-800 hover:border-white/30 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider px-3 py-1 rounded bg-neutral-900 border border-neutral-800 w-fit">
                    {item.year}
                  </span>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    {item.type}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
                  {item.title}
                </h3>
                <h4 className="font-mono text-sm text-neutral-300 mb-4 font-semibold">
                  {item.organization}
                </h4>

                <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 border-t border-neutral-900 pt-4">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 font-mono text-xs text-neutral-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-white mt-1 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
