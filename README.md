# AI Sentiment Analysis Tool

A simple tool that will help you analyze sentiments for a given piece of text (like a comment) using AI.

## Installation

- `npm i`
- create `.env` file and add the path for the database:  
  `DATABASE_URL="file:./dev.db"`
- create `.env.local` file and populate Clerk fields with your data:

  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
  CLERK_SECRET_KEY=

  NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
  NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/sentiments
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/new-user
  ```

- `npx prisma migrate dev` - that will create a sqlite database file in ./prisma folder and run migrations
- `npm run dev`
- The dev server will be run on port 3006 by default. [http://localhost:3006](http://localhost:3006/)
