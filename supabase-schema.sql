-- Connect Clinic — Patient & Booking Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PATIENTS table
create table if not exists patients (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),

  -- Demographics
  first_name text not null,
  last_name text not null,
  date_of_birth date,
  gender text,

  -- Contact
  email text,
  phone text,
  address text,

  -- Medical basics
  current_medications text,
  allergies text,
  preferred_pharmacy text,

  -- Admin
  referral_code text,
  notes text,
  active boolean default true
);

-- BOOKINGS table
create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),

  -- Link to patient (nullable — new patients created on first booking)
  patient_id uuid references patients(id),

  -- Booking details
  service text not null,
  reason text,
  status text default 'pending', -- pending, confirmed, completed, cancelled

  -- Payment
  payment_status text default 'unpaid', -- unpaid, paid, refunded
  payment_amount integer, -- in cents (NZD)
  stripe_session_id text,
  stripe_payment_intent text,

  -- Scheduling
  preferred_time text,
  appointment_at timestamptz,

  -- Source
  referral_code text,
  source text default 'website' -- website, phone, referral
);

-- CONSULTATIONS table (created after booking is completed)
create table if not exists consultations (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  booking_id uuid references bookings(id),
  patient_id uuid references patients(id),

  -- Clinical notes (simple)
  presenting_complaint text,
  history text,
  examination text,
  assessment text,
  plan text,
  prescriptions_issued text,
  follow_up text,

  -- Admin
  clinician text,
  duration_minutes integer,
  completed_at timestamptz
);

-- GP REFERRALS table
create table if not exists gp_referrals (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),

  -- Referrer
  referrer_name text not null,
  referrer_email text not null,

  -- Patient
  patient_name text not null,
  patient_dob date,
  patient_contact text,

  -- Referral
  referral_reason text,
  clinical_notes text,
  status text default 'pending' -- pending, contacted, booked, completed
);

-- Row Level Security
alter table patients enable row level security;
alter table bookings enable row level security;
alter table consultations enable row level security;
alter table gp_referrals enable row level security;

-- Allow inserts from the website (anon key) but not reads
create policy "Allow website to create patients" on patients
  for insert with check (true);

create policy "Allow website to create bookings" on bookings
  for insert with check (true);

create policy "Allow website to create referrals" on gp_referrals
  for insert with check (true);

-- Only authenticated users (admin) can read/update
create policy "Admin can read patients" on patients
  for select using (auth.role() = 'authenticated');

create policy "Admin can update patients" on patients
  for update using (auth.role() = 'authenticated');

create policy "Admin can read bookings" on bookings
  for select using (auth.role() = 'authenticated');

create policy "Admin can update bookings" on bookings
  for update using (auth.role() = 'authenticated');

create policy "Admin can read referrals" on gp_referrals
  for select using (auth.role() = 'authenticated');

create policy "Admin can read consultations" on consultations
  for all using (auth.role() = 'authenticated');

-- Useful views
create or replace view pending_bookings as
  select
    b.id,
    b.created_at,
    b.service,
    b.status,
    b.payment_status,
    b.reason,
    p.first_name || ' ' || p.last_name as patient_name,
    p.email,
    p.phone
  from bookings b
  left join patients p on b.patient_id = p.id
  where b.status = 'pending'
  order by b.created_at desc;
