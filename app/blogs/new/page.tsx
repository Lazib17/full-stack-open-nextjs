import BlogForm from "./BlogForm";
import { mutedClass, narrowPageClass, panelClass, titleClass } from "../../components/styles";

export default function NewBlogPage() {
  return (
    <main className={narrowPageClass}>
      <section className={panelClass}>
        <h1 className={titleClass}>Create a Blog</h1>
        <p className={mutedClass}>Add a blog to the database.</p>
        <BlogForm />
      </section>
    </main>
  );
}
