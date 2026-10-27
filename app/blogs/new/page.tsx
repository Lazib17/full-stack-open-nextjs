import { createBlog } from "../../actions/blogs";

export default function NewBlogPage() {
  return (
    <main className="page">
      <h1>Create a New Blog</h1>
      <p className="intro">Add a blog to the in-memory list.</p>
      <form className="blog-form" action={createBlog}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input id="author" name="author" type="text" required />
        </div>
        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input id="url" name="url" type="url" required />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </main>
  );
}
