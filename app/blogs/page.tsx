type Blog = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Learning Next.js",
    author: "Alex Example",
    url: "https://example.com/learning-nextjs",
    likes: 12,
  },
  {
    id: 2,
    title: "Understanding React Server Components",
    author: "Sam Example",
    url: "https://example.com/react-server-components",
    likes: 8,
  },
  {
    id: 3,
    title: "Getting Started with TypeScript",
    author: "Jordan Example",
    url: "https://example.com/typescript",
    likes: 15,
  },
];

export default function BlogsPage() {
  return (
    <main className="page">
      <h1>Blogs</h1>
      <p className="intro">A hardcoded list of example blogs.</p>
      <ul className="blog-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>
              URL:{" "}
              <a href={blog.url} target="_blank" rel="noopener noreferrer">
                {blog.url}
              </a>
            </p>
            <p>Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
