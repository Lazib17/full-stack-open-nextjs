"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog, type BlogFormState } from "../../actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import {
  errorClass,
  fieldClass,
  formClass,
  inputClass,
  labelClass,
  primaryButtonClass,
} from "../../components/styles";

const initialState: BlogFormState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
};

export default function BlogForm() {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("Blog created successfully");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <form className={formClass} action={formAction}>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="title">
          Title
        </label>
        <input
          className={inputClass}
          id="title"
          name="title"
          type="text"
          required
          minLength={5}
          defaultValue={state.values?.title}
        />
        {state.errors?.title ? (
          <p className={errorClass} role="alert">
            {state.errors.title}
          </p>
        ) : null}
      </div>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="author">
          Author
        </label>
        <input
          className={inputClass}
          id="author"
          name="author"
          type="text"
          required
          minLength={5}
          defaultValue={state.values?.author}
        />
        {state.errors?.author ? (
          <p className={errorClass} role="alert">
            {state.errors.author}
          </p>
        ) : null}
      </div>
      <div className={fieldClass}>
        <label className={labelClass} htmlFor="url">
          URL
        </label>
        <input
          className={inputClass}
          id="url"
          name="url"
          type="text"
          required
          minLength={5}
          defaultValue={state.values?.url}
        />
        {state.errors?.url ? (
          <p className={errorClass} role="alert">
            {state.errors.url}
          </p>
        ) : null}
      </div>
      <button className={primaryButtonClass} type="submit">
        Create Blog
      </button>
    </form>
  );
}
