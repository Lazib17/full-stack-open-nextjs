# Full Stack Open — Next.js

## About

This repository contains my solutions and learning exercises for the University of Helsinki Full Stack Open Next.js course.

## Course information

Official course page:

https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs/chapter-1

The course has four chapters and 26 exercises. On the course platform those exercises are numbered 0 through 25. All of them are required for a grade.

Exercise 0 is a quiz answered on the course platform. Exercises 1–25 are implemented in one Next.js blog application in this repository.

## Technologies

No application is installed yet, so this repository has no dependencies. This section will be updated when the blog application is created and when later exercises add libraries.

## Repository structure

The course builds one blog application and extends it in every coding exercise. Exercise 24 copies automated tests into the submission repository and expects the Next.js project at the repository root, including `package.json`, the `app` directory, and a `.github` workflow. The blog application will therefore live at the root of this repository.

| Path | Purpose |
| --- | --- |
| `README.md` | Course overview, how to run the app, and exercise progress |
| `.gitignore` | Keeps dependencies, build output, editor files, and local secrets out of Git |
| `docs/submission.md` | Checklist to complete before submitting the repository |
| `exercises/README.md` | How the 26 exercises map onto the single blog application |

There is no separate folder per exercise. Each exercise changes the same application.

## Exercise progress

Every exercise below is incomplete. An exercise is checked only after its solution is in this repository and I have confirmed that it is ready.

### Chapter 1 — Getting started

- [ ] Exercise 0 — Warm up

### Chapter 2 — From single page apps to server side rendering

- [ ] Exercise 1 — Blog list
- [ ] Exercise 2 — New blog
- [ ] Exercise 3 — Blog page
- [ ] Exercise 4 — Like button
- [ ] Exercise 5 — Rendered in order
- [ ] Exercise 6 — Search

### Chapter 3 — Databases, Migrations, and Relations

- [ ] Exercise 7 — Deploy to Vercel
- [ ] Exercise 8 — DrizzleORM and a database
- [ ] Exercise 9 — Users
- [ ] Exercise 10 — User page

### Chapter 4 — Authentication and more

- [ ] Exercise 11 — Login
- [ ] Exercise 12 — Registration
- [ ] Exercise 13 — Validations in blog creation
- [ ] Exercise 14 — Blog creation form on error
- [ ] Exercise 15 — Validations in user registration
- [ ] Exercise 16 — Styled notification with context
- [ ] Exercise 17 — More styling
- [ ] Exercise 18 — My page with API token access
- [ ] Exercise 19 — My page with API token access
- [ ] Exercise 20 — Reading list
- [ ] Exercise 21 — Better reading list
- [ ] Exercise 22 — Static homepage from markdown
- [ ] Exercise 23 — Finishing touches
- [ ] Exercise 24 — The final check
- [ ] Exercise 25 — Your GitHub repository

Exercise 18 and Exercise 19 use the same title on the course platform. Exercise 19 adds an API route for token-based access.

## How to run the project

This repository does not contain a runnable application yet. Installation and development commands will be added here when the blog application is created for Exercise 1.

The course material uses npm. After the application exists, the development server is started with `npm run dev`.

## Learning goals

The course practices these skills:

- Building a full stack application with Next.js and React Server Components, including the App Router, layouts, server and client components, data fetching, Server Actions, caching, revalidation, and streaming with Suspense.
- Persisting data with Drizzle ORM and PostgreSQL, including schemas, migrations, queries, and relations.
- Adding authentication, validation, and a production-ready interface with NextAuth, protected routes and actions, form validation, notifications, API routes, Tailwind CSS, and deployment on Vercel.

## Submission

This repository will be submitted through the course platform after the required exercises are complete and the official submission requirements have been checked. Use `docs/submission.md` before submitting.

The course reviews the work after the last exercise is submitted. If the repository is private, the course instructions say to add the GitHub user `mattiluukkainen` as a collaborator. Reviewer access has not been set up yet.

Completing the exercises in this repository is the coursework. It is not a finished course grade or a certificate.

## Git workflow

1. Implement an exercise in the blog application.
2. Test the solution.
3. Review the changes.
4. Check for accidental secrets or generated files.
5. Stage the relevant files.
6. Create a commit, for example `feat: complete exercise 1`.
7. Push the changes to GitHub.
8. Update the progress checklist only when the exercise is verified and confirmed ready.
