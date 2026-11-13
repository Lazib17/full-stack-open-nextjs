import RegisterForm from "./RegisterForm";
import { narrowPageClass, panelClass, titleClass } from "../components/styles";

export default function RegisterPage() {
  return (
    <main className={narrowPageClass}>
      <section className={panelClass}>
        <h1 className={titleClass}>Register</h1>
        <RegisterForm />
      </section>
    </main>
  );
}
