# Exercises

The Full Stack Open Next.js course has 26 exercises, numbered 0 through 25 on the course platform.

Exercise 0, Warm up, is a quiz on the course site. It does not add files to this repository.

Exercises 1–25 are all changes to one Next.js blog application. That application belongs at the root of this repository, because the automated tests in Exercise 24 expect `package.json`, the `app` directory, and `.github` at the repository root.

The course material demonstrates the same ideas with a separate notes example. The example source is published by the course at https://github.com/fullstack-hy2020/nextjs-notes. The work submitted from this repository is the blog application.

## Where each exercise goes

| Exercises | Chapter | What is added |
| --- | --- | --- |
| 0 | Chapter 1 — Getting started | Quiz on the course platform |
| 1–6 | Chapter 2 — From single page apps to server side rendering | Blog list, creation, blog page, likes, ordering, and search |
| 7–10 | Chapter 3 — Databases, Migrations, and Relations | Vercel deployment, Drizzle ORM, PostgreSQL, users |
| 11–25 | Chapter 4 — Authentication and more | Auth, validation, styling, API routes, reading list, tests, and the repository URL |

## Saving a finished exercise

1. Implement the exercise in the root application.
2. Run the application and check it against the exercise instructions.
3. Commit the solution with a message such as `feat: complete exercise 1`.
4. Push the commit to GitHub.
5. Mark the exercise complete in the root `README.md` only after the solution is verified and confirmed ready.

Do not mark an exercise complete from this file. The progress checklist in the root `README.md` is the record of completion.
