import Image from 'next/image';

interface BlogPost {
  title: string;
  description: string;
  pubDate: string;
  thumbnail: string;
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer group transform transition-transform hover:scale-[1.02]"
    >
      <div className="aspect-video relative">
        <Image
          src={post.thumbnail || '/blog-placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-2 mb-2">
          {post.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-3">
          {post.description}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          {new Date(post.pubDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default BlogCard; 