"use client";

import { useActionState } from "react";
import { createBlog, type BlogFormState } from "../../actions/blogs";

const initialState: BlogFormState = {};

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
          defaultValue={state.values?.title}
        />
        {state.errors?.title ? (
          <p className="form-error" role="alert">
            {state.errors.title}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          required
          minLength={5}
          defaultValue={state.values?.author}
        />
        {state.errors?.author ? (
          <p className="form-error" role="alert">
            {state.errors.author}
          </p>
        ) : null}
      </div>
      <div className="form-field">
        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          type="text"
          required
          minLength={5}
          defaultValue={state.values?.url}
        />
        {state.errors?.url ? (
          <p className="form-error" role="alert">
            {state.errors.url}
          </p>
        ) : null}
      </div>
      <button type="submit">Create Blog</button>
    </form>
  );
}
