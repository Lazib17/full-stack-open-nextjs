import BlogForm from "./BlogForm";

export default function NewBlogPage() {
  return (
    <main className="page">
      <h1>Create a New Blog</h1>
      <p className="intro">Add a blog to the database.</p>
      <BlogForm />
    </main>
  );
}
