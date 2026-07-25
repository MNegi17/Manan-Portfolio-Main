"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

interface ProjectImageGalleryProps {
  images?: string[];
  title: string;
  icon?: React.ReactNode;
}

export const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({
  images = [],
  title,
  icon,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/9] rounded-2xl border border-dashed border-neutral-700 bg-neutral-950 overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-inner">
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
            {icon}
          </div>
          <span className="font-mono text-xs tracking-wider text-neutral-300 font-semibold uppercase">
            [ MEDIA PLACEHOLDER ]
          </span>
        </div>
      </div>
    );
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="relative w-full aspect-[16/9] rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden group shadow-xl my-2 select-none">
        {/* Main Active Image */}
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Counter Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/20 text-white font-mono text-[11px] font-bold backdrop-blur-md flex items-center gap-1 z-10">
          <span>0{currentIndex + 1}</span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400">0{images.length}</span>
        </div>

        {/* Fullscreen Expand Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="absolute top-3 left-3 p-2 rounded-full bg-black/70 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md z-10"
          title="Expand Photo"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Navigation Arrows (if multiple images) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/20 text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black backdrop-blur-md z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/20 text-white opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-black backdrop-blur-md z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-5 bg-white" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="flex justify-between items-center text-white border-b border-neutral-800 pb-4">
            <span className="font-display font-bold text-lg">{title} — Photo {currentIndex + 1} of {images.length}</span>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono font-bold hover:bg-white hover:text-black transition-colors"
            >
              CLOSE (ESC)
            </button>
          </div>

          <div className="relative my-auto max-h-[80vh] flex items-center justify-center">
            <img
              src={images[currentIndex]}
              alt={`${title} Lightbox`}
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl border border-neutral-800"
            />
          </div>

          {images.length > 1 && (
            <div className="flex justify-center items-center gap-4 text-white font-mono text-xs">
              <button
                onClick={prevSlide}
                className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-700 hover:bg-white hover:text-black transition-colors"
              >
                PREVIOUS
              </button>
              <span>{currentIndex + 1} / {images.length}</span>
              <button
                onClick={nextSlide}
                className="px-4 py-2 rounded-full bg-neutral-900 border border-neutral-700 hover:bg-white hover:text-black transition-colors"
              >
                NEXT
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
