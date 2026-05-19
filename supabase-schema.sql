create table tasks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  description text not null,
  due_date date not null,
  priority text not null check (priority in ('low', 'medium', 'high')),
  completed boolean not null default false,
  created_at timestamptz default now()
);

alter table tasks enable row level security;

create policy "Users can read own tasks"
  on tasks for select
  using (auth.uid() = user_id);

create policy "Users can create own tasks"
  on tasks for insert
  with check (auth.uid() = user_id);

create policy "Users can update own tasks"
  on tasks for update
  using (auth.uid() = user_id);

create policy "Users can delete own tasks"
  on tasks for delete
  using (auth.uid() = user_id);