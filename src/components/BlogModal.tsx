interface BlogPost {
  title: string;
  content: string;
  pubDate: string;
  link: string;
}

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost;
}

const BlogModal = ({ isOpen, onClose, post }: BlogModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 md:p-8 z-50">
      <div className="bg-gray-800 w-full max-w-4xl rounded-lg overflow-hidden">
        <div className="relative flex flex-col h-[90vh]">
          {/* Header */}
          <div className="p-6 border-b border-gray-700 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">{post.title}</h2>
              <p className="text-gray-400 mt-1">
                {new Date(post.pubDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto scrollbar">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 text-center"
            >
              Read on Medium
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal; 