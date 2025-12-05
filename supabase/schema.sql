-- Supabase Schema for Budget Tracker
-- Run this in Supabase SQL Editor to create your tables

-- Expenses table
CREATE TABLE expenses (
    id BIGINT PRIMARY KEY,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    description TEXT DEFAULT '',
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Income table
CREATE TABLE income (
    id BIGINT PRIMARY KEY,
    date DATE NOT NULL,
    category TEXT NOT NULL,
    description TEXT DEFAULT '',
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Budget settings table
CREATE TABLE budget (
    id INT PRIMARY KEY DEFAULT 1,
    monthly_budget DECIMAL(12,2) DEFAULT 0
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('expense', 'income')),
    name TEXT NOT NULL,
    icon TEXT DEFAULT 'wallet',
    UNIQUE(type, name)
);

-- Insert default budget row
INSERT INTO budget (id, monthly_budget) VALUES (1, 50000);

-- Insert default expense categories
INSERT INTO categories (type, name, icon) VALUES 
    ('expense', 'Food', 'utensils'),
    ('expense', 'Transport', 'car'),
    ('expense', 'Shopping', 'shopping-bag'),
    ('expense', 'Bills', 'file-invoice'),
    ('expense', 'Entertainment', 'film'),
    ('expense', 'Health', 'heart-pulse'),
    ('expense', 'Other', 'ellipsis');

-- Insert default income categories
INSERT INTO categories (type, name, icon) VALUES 
    ('income', 'Salary', 'briefcase'),
    ('income', 'Freelance', 'laptop'),
    ('income', 'Investment', 'chart-line'),
    ('income', 'Gift', 'gift'),
    ('income', 'Other', 'ellipsis');

-- Enable Row Level Security (RLS) - for now, allow all access
-- You can add authentication later if needed

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies to allow all operations (public access)
-- For personal use without auth
CREATE POLICY "Allow all" ON expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON income FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON budget FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON categories FOR ALL USING (true) WITH CHECK (true);
