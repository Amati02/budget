/**
 * Migration Script: JSON to Supabase
 * 
 * INSTRUCTIONS:
 * 1. First, run schema.sql in Supabase SQL Editor
 * 2. Get your Supabase URL and anon key from Project Settings > API
 * 3. Update SUPABASE_URL and SUPABASE_KEY below
 * 4. Run: node supabase/migrate-data.js
 */

const SUPABASE_URL = 'YOUR_SUPABASE_URL';  // e.g., https://xxxxx.supabase.co
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

const fs = require('fs');

async function migrate() {
    // Read existing data
    const data = JSON.parse(fs.readFileSync('budget_data.json', 'utf8'));
    
    console.log('Starting migration...');
    console.log(`Found: ${data.expenses.length} expenses, ${data.income.length} income records`);
    
    const headers = {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
    };
    
    // 1. Migrate expenses
    if (data.expenses.length > 0) {
        const expenses = data.expenses.map(e => ({
            id: e.id,
            date: e.date,
            category: e.category,
            description: e.description || '',
            amount: e.amount,
            created_at: e.createdAt
        }));
        
        const res = await fetch(`${SUPABASE_URL}/rest/v1/expenses`, {
            method: 'POST',
            headers,
            body: JSON.stringify(expenses)
        });
        
        if (res.ok) {
            console.log(`✓ Migrated ${expenses.length} expenses`);
        } else {
            console.error('✗ Failed to migrate expenses:', await res.text());
        }
    }
    
    // 2. Migrate income
    if (data.income.length > 0) {
        const income = data.income.map(i => ({
            id: i.id,
            date: i.date,
            category: i.category,
            description: i.description || '',
            amount: i.amount,
            created_at: i.createdAt
        }));
        
        const res = await fetch(`${SUPABASE_URL}/rest/v1/income`, {
            method: 'POST',
            headers,
            body: JSON.stringify(income)
        });
        
        if (res.ok) {
            console.log(`✓ Migrated ${income.length} income records`);
        } else {
            console.error('✗ Failed to migrate income:', await res.text());
        }
    }
    
    // 3. Update budget
    if (data.budget?.monthlyBudget) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/budget?id=eq.1`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ monthly_budget: data.budget.monthlyBudget })
        });
        
        if (res.ok) {
            console.log(`✓ Set monthly budget to ${data.budget.monthlyBudget}`);
        } else {
            console.error('✗ Failed to update budget:', await res.text());
        }
    }
    
    // 4. Migrate categories
    const categories = [];
    
    if (data.categories?.expense) {
        data.categories.expense.forEach(name => {
            categories.push({
                type: 'expense',
                name: name,
                icon: data.categoryIcons?.[name] || 'wallet'
            });
        });
    }
    
    if (data.categories?.income) {
        data.categories.income.forEach(name => {
            categories.push({
                type: 'income',
                name: name,
                icon: data.categoryIcons?.[name] || 'wallet'
            });
        });
    }
    
    if (categories.length > 0) {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
            method: 'POST',
            headers,
            body: JSON.stringify(categories)
        });
        
        if (res.ok) {
            console.log(`✓ Migrated ${categories.length} categories`);
        } else {
            console.error('✗ Failed to migrate categories:', await res.text());
        }
    }
    
    console.log('\n✓ Migration complete!');
}

migrate().catch(console.error);
