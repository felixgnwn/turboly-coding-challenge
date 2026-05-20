# Turboly Coding Challenge

A simple task manager web app built with React, TypeScript, Tailwind CSS, and Supabase.

Live Link: https://turboly-coding-challenge.vercel.app

## Test Users

| Email | Password |
|-------|----------|
| user@example.com | passwords |
| user2@example.com | passwords |

## Features

- **Authentication**: Log in / log out with Supabase Auth
- **Task CRUD**: Create, read, update, and delete tasks
- **Task fields**: Description, due date, priority (low/medium/high), completed status
- **Task Filters**: Search, filter by due date, filter by priority, sort by due date (asc/desc), sort by priority (asc/desc), reset filters
- **Scrollable list**: Task list scrolls independently without scrolling the whole page
- **Default due date**: Pre-filled with today's date when creating a new task
- **Reusable UI components**: Consistent Button, Input, Select, and Checkbox components with variants

### UI Components

All form elements are built as reusable components under `src/components/ui/`:

- **Button** — `variant` (`primary` | `secondary` | `danger` | `ghost` | `outline`), `size` (`sm` | `md` | `lg`)
- **Input** — Standard input with optional `label` prop
- **Select** — Dropdown with `options` array and optional `label`
- **Checkbox** — Checkbox with optional `label`

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (Auth + PostgreSQL)

## Setup

1. Copy `.env.example` to `.env` and fill in your Supabase credentials
2. Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
