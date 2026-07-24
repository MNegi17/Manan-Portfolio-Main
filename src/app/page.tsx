"use client";

import React, { useState } from "react";
import { Preloader } from "@/src/components/ui/Preloader";
import { CustomCursor } from "@/src/components/ui/CustomCursor";
import { SmoothScroll } from "@/src/components/ui/SmoothScroll";
import { Navbar } from "@/src/components/ui/Navbar";
import { Hero } from "@/src/components/sections/Hero";
import { Projects } from "@/src/components/sections/Projects";
import { About } from "@/src/components/sections/About";
import { Skills } from "@/src/components/sections/Skills";
import { Timeline } from "@/src/components/sections/Timeline";
import { Marquee } from "@/src/components/sections/Marquee";
import { Contact } from "@/src/components/sections/Contact";
import { Footer } from "@/src/components/sections/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <SmoothScroll>
        <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Timeline />
          <Marquee />
          <Contact />
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
}
