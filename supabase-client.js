/**
 * Supabase Client for Budget Tracker
 * Replace YOUR_SUPABASE_URL and YOUR_SUPABASE_ANON_KEY with your actual values
 */

const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

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
        if (!res.ok) throw new Error(await res.text());
        const text = await res.text();
        return text ? JSON.parse(text) : null;
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
        return result[0];
    }

    async deleteExpense(id) {
        return this.fetch(`expenses?id=eq.${id}`, { method: 'DELETE' });
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
        return result[0];
    }

    async deleteIncome(id) {
        return this.fetch(`income?id=eq.${id}`, { method: 'DELETE' });
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
