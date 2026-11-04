-- 하루결: Supabase SQL Editor에 그대로 붙여넣고 Run 하세요.
create table if not exists public.planner_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.planner_data enable row level security;
create policy "own row select" on public.planner_data for select using (auth.uid() = user_id);
create policy "own row insert" on public.planner_data for insert with check (auth.uid() = user_id);
create policy "own row update" on public.planner_data for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own row delete" on public.planner_data for delete using (auth.uid() = user_id);
-- 실시간 동기화(다른 기기의 변경 알림)
alter publication supabase_realtime add table public.planner_data;
