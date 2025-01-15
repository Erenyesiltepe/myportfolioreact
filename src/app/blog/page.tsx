"use client";
import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import BlogCard from '@/components/BlogCard';
import BlogModal from '@/components/BlogModal';
import { fetchMediumPosts } from '@/lib/medium';

interface BlogPost {
  title: string;
  content: string;
  description: string;
  pubDate: string;
  link: string;
  thumbnail: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const mediumPosts = await fetchMediumPosts();
        setPosts(mediumPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Blog Grid */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <BlogCard
                  key={index}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Blog Modal */}
      {selectedPost && (
        <BlogModal
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          post={selectedPost}
        />
      )}
    </PageLayout>
  );
} 