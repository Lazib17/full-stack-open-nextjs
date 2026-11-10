"use client";

import { useActionState } from "react";
import { createBlog, type CreateBlogState } from "../../actions/blogs";

const initialState: CreateBlogState = { error: "" };

export default function BlogForm() {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <form className="blog-form" action={formAction}>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={5}
        />
      </div>
      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          required
          minLength={5}
        />
      </div>
      <div className="form-field">
        <label htmlFor="url">URL</label>
        <input id="url" name="url" type="text" required minLength={5} />
      </div>
      <button type="submit">Create Blog</button>
      {state.error ? (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
