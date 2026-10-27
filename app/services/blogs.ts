export type Blog = {
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

export function getBlogs(): Blog[] {
  return blogs;
}

export function addBlog(input: {
  title: string;
  author: string;
  url: string;
}): Blog {
  const id = blogs.reduce((maxId, blog) => Math.max(maxId, blog.id), 0) + 1;
  const blog: Blog = {
    id,
    title: input.title,
    author: input.author,
    url: input.url,
    likes: 0,
  };

  blogs.push(blog);
  return blog;
}
