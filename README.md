# Notice Board

A full-stack Notice Board application built as part of the **Reno Platforms Web Development Internship Assignment**.

## Tech Stack

- Next.js (Pages Router)
- Prisma ORM
- PostgreSQL (Neon)
- CSS

## Features

- Create, Read, Update and Delete (CRUD) notices
- Server-side validation using API routes
- Responsive notice card layout
- Urgent notices are displayed before normal notices
- Optional image support
- Persistent hosted database

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/akkshayTandon/reno-platforms-assignment
cd reno-platforms-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Add your PostgreSQL connection string:

```env
DATABASE_URL=your_database_connection_string
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Sync the database schema

```bash
npx prisma db push
```

### 6. Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

## One Thing I Would Improve With More Time

I would improve the user experience by adding image upload functionality instead of requiring image URLs. I would also replace browser alerts with toast notifications and further enhance the UI with smoother loading states and animations.

## Where and How AI Was Used

AI was used as a development assistant throughout this project. It helped with understanding the assignment requirements, learning Prisma, discussing implementation approaches, debugging issues, reviewing code, and resolving framework-specific problems. All implementation decisions, integration, testing, debugging, and final verification were performed manually.