"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/src/context/CursorContext";
import { Terminal, Database, BarChart2, Table, Cpu, Brain, LineChart } from "lucide-react";

interface SkillItem {
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  level: string;
}

const skillsData: SkillItem[] = [
  {
    name: "Python",
    category: "Development & Data Science",
    description: "Pandas, NumPy, Scikit-Learn, Automation scripts, REST APIs",
    icon: <Terminal className="w-6 h-6 text-white" />,
    level: "Advanced",
  },
  {
    name: "SQL",
    category: "Database Architecture",
    description: "Complex Joins, CTEs, Window Functions, PostgreSQL, MySQL",
    icon: <Database className="w-6 h-6 text-white" />,
    level: "Expert",
  },
  {
    name: "Power BI",
    category: "Business Intelligence",
    description: "Interactive Dashboards, DAX, Power Query, Data Modeling",
    icon: <BarChart2 className="w-6 h-6 text-white" />,
    level: "Advanced",
  },
  {
    name: "Advanced Excel",
    category: "Financial & Data Analysis",
    description: "VBA, Power Pivot, Dynamic Arrays, Solver, Financial Models",
    icon: <Table className="w-6 h-6 text-white" />,
    level: "Expert",
  },
  {
    name: "Automation",
    category: "Process Engineering",
    description: "ETL Pipelines, Web Scraping, Power Automate, Cron Systems",
    icon: <Cpu className="w-6 h-6 text-white" />,
    level: "Advanced",
  },
  {
    name: "Machine Learning",
    category: "Predictive Analytics",
    description: "Regression Models, Classification, Clustering, Forecasts",
    icon: <Brain className="w-6 h-6 text-white" />,
    level: "Intermediate",
  },
  {
    name: "Business Analysis",
    category: "Strategy & Requirements",
    description: "KPI Definition, Process Mapping, Stakeholder Communication",
    icon: <LineChart className="w-6 h-6 text-white" />,
    level: "Advanced",
  },
];

export const Skills = () => {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section
      id="skills"
      className="relative py-32 px-4 sm:px-8 md:px-16 w-full max-w-7xl mx-auto bg-noise text-white border-t border-neutral-800"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-8 border-b border-neutral-800">
        <div>
          <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-3">
            // CORE COMPETENCIES
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white">
            SKILLS & TOOLS
          </h2>
        </div>
        <p className="font-mono text-xs md:text-sm text-neutral-400 max-w-md mt-4 md:mt-0 leading-relaxed">
          Modern analytical toolbelt engineered for speed, accuracy, and automated workflow integration.
        </p>
      </div>

      {/* Floating Glass Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onMouseEnter={() => setCursor("pointer")}
            onMouseLeave={resetCursor}
            className="group relative p-8 rounded-2xl glass-card border border-neutral-800 hover:border-white/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              {/* Icon & Level */}
              <div className="flex justify-between items-center mb-6">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  {skill.icon}
                </div>
                <span className="font-mono text-[11px] px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 font-semibold tracking-wider uppercase">
                  {skill.level}
                </span>
              </div>

              {/* Title & Category */}
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider block mb-1">
                {skill.category}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-neutral-200">
                {skill.name}
              </h3>

              {/* Description */}
              <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="w-full h-[1px] bg-neutral-800 mt-6 group-hover:bg-white/40 transition-colors" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
