/**
 * Supabase Client for Budget Tracker
 * Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your actual values
 */

const SUPABASE_URL = 'https://wjckbvhycdoitzkeruwf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY2tidmh5Y2RvaXR6a2VydXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MjYzMzAsImV4cCI6MjA4MDUwMjMzMH0.JyZnxsvwffODSa7bfrPtQODM3ktZl_YFKvwukz1pdDQ';

class SupabaseClient {
    constructor() {
        this.url = SUPABASE_URL;
        this.key = SUPABASE_KEY;
        this.headers = {
            'Content-Type': 'application/json',
            'apikey': this.key,
            'Authorization': `Bearer ${this.key}`,
            'Prefer': 'return=representation'
        };
    }

    async fetch(endpoint, options = {}) {
        const res = await fetch(`${this.url}/rest/v1/${endpoint}`, {
            ...options,
            headers: { ...this.headers, ...options.headers }
        });
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Supabase error:', res.status, errorText);
            throw new Error(errorText || 'Request failed');
        }
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : null;
        } catch (e) {
            return null;
        }
    }

    // Expenses
    async getExpenses() {
        return this.fetch('expenses?order=date.desc,created_at.desc');
    }

    async addExpense(expense) {
        const data = {
            id: Date.now(),
            date: expense.date,
            category: expense.category,
            description: expense.description || '',
            amount: expense.amount
        };
        const result = await this.fetch('expenses', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return result ? result[0] : data;
    }

    async deleteExpense(id) {
        await this.fetch(`expenses?id=eq.${id}`, { method: 'DELETE' });
        return true;
    }

    // Income
    async getIncome() {
        return this.fetch('income?order=date.desc,created_at.desc');
    }

    async addIncome(income) {
        const data = {
            id: Date.now(),
            date: income.date,
            category: income.category,
            description: income.description || '',
            amount: income.amount
        };
        const result = await this.fetch('income', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return result ? result[0] : data;
    }

    async deleteIncome(id) {
        await this.fetch(`income?id=eq.${id}`, { method: 'DELETE' });
        return true;
    }

    // Budget
    async getBudget() {
        const result = await this.fetch('budget?id=eq.1');
        return result[0] || { monthly_budget: 0 };
    }

    async updateBudget(monthlyBudget) {
        return this.fetch('budget?id=eq.1', {
            method: 'PATCH',
            body: JSON.stringify({ monthly_budget: monthlyBudget })
        });
    }

    // Categories
    async getCategories() {
        const cats = await this.fetch('categories?order=name.asc');
        const result = {
            categories: { expense: [], income: [] },
            categoryIcons: {}
        };
        cats.forEach(c => {
            result.categories[c.type].push(c.name);
            result.categoryIcons[c.name] = c.icon;
        });
        return result;
    }

    async addCategory(type, name, icon) {
        return this.fetch('categories', {
            method: 'POST',
            body: JSON.stringify({ type, name, icon: icon || 'wallet' })
        });
    }

    async updateCategory(type, oldName, newName, icon) {
        return this.fetch(`categories?type=eq.${type}&name=eq.${encodeURIComponent(oldName)}`, {
            method: 'PATCH',
            body: JSON.stringify({ name: newName, icon })
        });
    }

    async deleteCategory(type, name) {
        return this.fetch(`categories?type=eq.${type}&name=eq.${encodeURIComponent(name)}`, {
            method: 'DELETE'
        });
    }
}

// Global instance
const supabase = new SupabaseClient();
