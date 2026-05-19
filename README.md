# Turboly Coding Challenge

A simple task manager web app built with React, TypeScript, Tailwind CSS, and Supabase.

## Test Users

| Email | Password |
|-------|----------|
| user@example.com | passwords |
| user2@example.com | passwords |

## Features

- **Authentication**: Log in / log out with Supabase Auth
- **Task CRUD**: Create, read, update, and delete tasks
- **Task fields**: Description, due date, priority (low/medium/high), completed status
- **Side-by-side layout**: Task form and task list displayed next to each other
- **Scrollable list**: Task list scrolls independently without scrolling the whole page
- **Default due date**: Pre-filled with today's date when creating a new task

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (Auth + PostgreSQL)

## Setup

1. Copy `.env.example` to `.env` and fill in your Supabase credentials
2. Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
