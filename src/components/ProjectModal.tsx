"use client";
import { useState } from "react";
import Image from "next/image";
import GltfLoader from "./GltfLoader";
import { cn } from "@/lib/utils";

interface ProjectData {
  id: string;
  title: string;
  about: string;
  category: string;
  link: string;
  assets: {
    type: string;
    url: string;
  }[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % project.assets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + project.assets.length) % project.assets.length);
  };

  if (!isOpen) return null;

  const currentAsset = project.assets[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-8 z-50">
      <div className="bg-gray-800 w-full max-w-6xl rounded-lg overflow-hidden">
        <div className="relative grid grid-cols-[1.5fr_1fr] min-h-[600px]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-cyan-400 z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Left side - Carousel */}
          <div className="relative bg-gray-900">
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 z-10"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 z-10"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Content display */}
            <div className="relative w-full h-full">
              {currentAsset.type === "image" ? ( 
                <Image
                  src={currentAsset.url}
                  alt={project.title}
                  fill
                  className="object-contain"
                />
               ) : currentAsset.type === "video" ? (
                <video 
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src={currentAsset.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full">
                  <GltfLoader url={currentAsset.url} />
                </div>
              )}
            </div>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {project.assets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full",
                    currentSlide === index ? "bg-cyan-500" : "bg-gray-600"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Right side - Details */}
          <div className="p-8 flex flex-col">
            <div className="mb-4">
              <span className="text-sm text-cyan-400 uppercase">{project.category}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{project.title}</h2>
            </div>

            <p className="text-gray-300 flex-grow">{project.about}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 text-center"
              >
                Go to details
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
