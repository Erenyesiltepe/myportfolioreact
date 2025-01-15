"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-4 border-b-2 border-gray-700 flex-none">
      <Link 
        href="/about" 
        className={cn(
          "p-4 text-white border-r border-gray-600 relative",
          pathname === "/about" && "bg-gray-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500"
        )}
      >
        About
      </Link>
      <Link 
        href="/projects" 
        className={cn(
          "p-4 text-white border-r border-gray-600 relative",
          pathname === "/projects" && "bg-gray-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500"
        )}
      >
        Projects
      </Link>
      <Link 
        href="/blog" 
        className={cn(
          "p-4 text-white border-r border-gray-600 relative",
          pathname === "/blog" && "bg-gray-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500"
        )}
      >
        Blog
      </Link>
      <Link 
        href="/cv-chat" 
        className={cn(
          "p-4 text-white border-r border-gray-600 relative",
          pathname === "/cv-chat" && "bg-gray-700 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-cyan-500"
        )}
      >
        CV Chat
      </Link>
    </nav>
  );
} 