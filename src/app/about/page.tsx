"use client"
import Image from 'next/image';
import { useState } from 'react';
import cvData from '@/assets/cv_data.json';
import PageLayout from '@/components/PageLayout';

const Section = ({ 
  title, 
  children, 
  defaultExpanded = true 
}: { 
  title: string; 
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="mb-12">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-2xl font-bold text-white mb-6 hover:text-cyan-400"
      >
        <span>{title}</span>
        <svg 
          className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`space-y-6 transition-all duration-300 ${
        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        {children}
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-[400px_1fr] flex-1 md:overflow-y-hidden overflow-y-scroll">
        {/* Profile Section */}
        <div className="p-8 md:border-r-2 md:border-gray-700 border-b-2 border-gray-700 md:border-b-0">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden mb-6">
              <Image
                src={"/my_photo.jpeg"}
                alt="Eren Yeşiltepe"
                width={192}
                height={192}
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-8">Eren Yeşiltepe</h1>
            
            {/* Social Links */}
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
              <a 
                href="https://www.linkedin.com/in/eren-yesiltepe/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-cyan-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Linkedin
              </a>
              <a 
                href="https://www.instagram.com/blue_phoenix_17/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-cyan-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
              <a 
                href="https://github.com/Erenyesiltepe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-cyan-400"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Github
              </a>
              
              {/* Mail Button */}
              <a 
                href="mailto:erenyesiltepeacc@gmail.com"
                className="mt-4 py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 text-center w-full"
              >
                Mail Me
              </a>
            </div>
          </div>
        </div>

        {/* CV Section */}
        <div className="p-8 h-[calc(100vh-40rem)] md:h-[calc(100vh-10rem)] md:overflow-y-scroll">
          {/* Work Experience */}
          <Section title="Work Experience">
            {cvData.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                <p className="text-gray-400">{exp.companyName} • {exp.dateRange}</p>
                <p className="text-gray-300 mt-2 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </Section>

          {/* Education */}
          <Section title="Education">
            {cvData.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-semibold text-white">{edu.school}</h3>
                <p className="text-gray-400">{edu.degree} • {edu.dateRange}</p>
                <p className="text-gray-300 mt-2 whitespace-pre-line">{edu.description}</p>
              </div>
            ))}
          </Section>

          {/* Social Activities */}
          <Section title="Social">
            {cvData.social.map((social, index) => (
              <div key={index} className="border-l-2 border-cyan-500 pl-4">
                <h3 className="text-lg font-semibold text-white">{social.activity}</h3>
                <p className="text-gray-400">{social.organization} • {social.date}</p>
                <p className="text-gray-300 mt-2 whitespace-pre-line">{social.description}</p>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage; 