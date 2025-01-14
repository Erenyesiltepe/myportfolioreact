"use client"
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ProjectModal from '@/components/ProjectModal';
import PageLayout from '@/components/PageLayout';
import projectsData from '@/assets/projects_data.json';

type Category = 'coding' | 'hobby' | null;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = selectedCategory
    ? projectsData[selectedCategory]
    : [...projectsData.coding, ...projectsData.hobby];

  const currentProject = selectedProject
    ? [...projectsData.coding, ...projectsData.hobby].find(p => p.id === selectedProject)
    : null;

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Category Sidebar */}
        <div className="w-full md:w-16 md:border-r-2 border-b-2 md:border-b-0 border-gray-700 p-4 md:py-4 flex flex-row md:flex-col items-center justify-center gap-4 md:gap-8">
          <button
            onClick={() => setSelectedCategory('coding')}
            className={cn(
              "p-2 rounded md:[writing-mode:vertical-lr] md:rotate-180 transition-colors",
              selectedCategory === 'coding' 
                ? "bg-cyan-500 text-white" 
                : "text-gray-300 hover:bg-gray-700"
            )}
          >
            Coding
          </button>
          <button
            onClick={() => setSelectedCategory('hobby')}
            className={cn(
              "p-2 rounded md:[writing-mode:vertical-lr] md:rotate-180 transition-colors",
              selectedCategory === 'hobby' 
                ? "bg-cyan-500 text-white" 
                : "text-gray-300 hover:bg-gray-700"
            )}
          >
            Hobby
          </button>
        </div>

        {/* Projects Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="relative bg-gray-700 rounded-lg overflow-hidden group">
                {/* Project Image */}
                <div className="aspect-video relative">
                  <Image
                    src={project.assets[0].url}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Project Title */}
                <div className="p-4">
                  <h3 className="text-white font-semibold">{project.title}</h3>
                </div>

                {/* View Button */}
                <button
                  onClick={() => setSelectedProject(project.id)}
                  className="absolute top-2 right-2 p-2 bg-gray-900/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {currentProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={currentProject}
        />
      )}
    </PageLayout>
  );
} 