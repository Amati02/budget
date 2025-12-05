/**
 * Supabase Adapter for Budget Tracker
 * 
 * This file replaces the Express API calls with Supabase calls.
 * Include this AFTER supabase-client.js and BEFORE script.js in your HTML.
 * 
 * SETUP:
 * 1. Update SUPABASE_URL and SUPABASE_KEY in supabase-client.js
 * 2. Update index.html to include these scripts in order:
 *    - supabase-client.js
 *    - supabase-adapter.js  
 *    - category-icons.js
 *    - script.js
 */

// Override the BudgetTracker prototype methods after the class is defined
document.addEventListener('DOMContentLoaded', () => {
    // Wait for BudgetTracker to be instantiated
    const originalInit = BudgetTracker.prototype.init;
    
    BudgetTracker.prototype.init = async function() {
        try { 
            await this.loadDataFromSupabase(); 
        } catch (e) { 
            console.error('Supabase error:', e); 
        }
        this.setupEventListeners();
        this.applyTranslations();
        this.updateLanguageButtons();
        this.updateUI();
    };

    BudgetTracker.prototype.loadDataFromSupabase = async function() {
        const [expenses, income, budget, categories] = await Promise.all([
            supabase.getExpenses(),
            supabase.getIncome(),
            supabase.getBudget(),
            supabase.getCategories()
        ]);
        
        this.data.expenses = expenses.map(e => ({
            id: e.id,
            date: e.date,
            category: e.category,
            description: e.description,
            amount: parseFloat(e.amount),
            createdAt: e.created_at
        }));
        
        this.data.income = income.map(i => ({
            id: i.id,
            date: i.date,
            category: i.category,
            description: i.description,
            amount: parseFloat(i.amount),
            createdAt: i.created_at
        }));
        
        this.data.monthlyBudget = parseFloat(budget.monthly_budget) || 0;
        this.data.categories = categories.categories;
        this.data.categoryIcons = categories.categoryIcons;
    };

    // Replace loadDataFromAPI with loadDataFromSupabase
    BudgetTracker.prototype.loadDataFromAPI = BudgetTracker.prototype.loadDataFromSupabase;

    BudgetTracker.prototype.addExpense = async function() {
        const exp = { 
            date: document.getElementById('expenseDate').value, 
            category: document.getElementById('expenseCategory').value, 
            description: '', 
            amount: parseFloat(document.getElementById('expenseAmount').value) 
        };
        try {
            await supabase.addExpense(exp);
            await this.loadDataFromSupabase(); 
            this.updateUI(); 
            this.hideModal(document.getElementById('expenseModal')); 
            this.showMessage(this.t('expenseAdded'), 'success');
        } catch (e) { 
            console.error('Error adding expense:', e);
            this.showMessage(this.t('errorAddingExpense'), 'error'); 
        }
    };

    BudgetTracker.prototype.addIncome = async function() {
        const inc = { 
            date: document.getElementById('incomeDate').value, 
            category: document.getElementById('incomeCategory').value, 
            description: '', 
            amount: parseFloat(document.getElementById('incomeAmount').value) 
        };
        try {
            await supabase.addIncome(inc);
            await this.loadDataFromSupabase(); 
            this.updateUI(); 
            this.hideModal(document.getElementById('incomeModal')); 
            this.showMessage(this.t('incomeAdded'), 'success');
        } catch (e) { 
            console.error('Error adding income:', e);
            this.showMessage(this.t('errorAddingIncome'), 'error'); 
        }
    };

    BudgetTracker.prototype.addCategory = async function() {
        const type = document.getElementById('categoryType').value;
        const name = document.getElementById('categoryName').value.trim();
        const icon = document.getElementById('selectedIcon').value || 'wallet';
        
        if (!name) {
            this.showMessage(this.t('enterCategoryNameError'), 'error');
            return;
        }
        
        if (this.editingCategory) {
            await this.updateCategory(this.editingCategory.type, this.editingCategory.name, name, icon);
            return;
        }
        
        if (this.data.categories[type] && this.data.categories[type].includes(name)) {
            this.showMessage(this.t('categoryExists'), 'error');
            return;
        }
        
        try {
            await supabase.addCategory(type, name, icon);
            await this.loadDataFromSupabase();
            this.showMessage(this.t('categoryAdded'), 'success');
            document.getElementById('categoryName').value = '';
            document.getElementById('selectedIcon').value = 'wallet';
            document.getElementById('addCategoryTitle').textContent = this.t('addNewCategory');
            this.renderIcons();
            this.updateUI();
            setTimeout(() => this.showSection('settings'), 1500);
        } catch (e) { 
            console.error('Error adding category:', e);
            this.showMessage(this.t('errorAddingCategory'), 'error'); 
        }
    };

    BudgetTracker.prototype.updateCategory = async function(type, oldName, newName, icon) {
        try {
            await supabase.updateCategory(type, oldName, newName, icon);
            await this.loadDataFromSupabase();
            this.showMessage(this.t('categoryUpdated'), 'success');
            this.editingCategory = null;
            document.getElementById('categoryName').value = '';
            document.getElementById('selectedIcon').value = 'wallet';
            document.getElementById('addCategoryTitle').textContent = this.t('addNewCategory');
            this.renderIcons();
            this.updateUI();
            setTimeout(() => this.showSection('settings'), 1500);
        } catch (e) { 
            console.error('Error updating category:', e);
            this.showMessage(this.t('errorUpdatingCategory'), 'error'); 
        }
    };

    BudgetTracker.prototype.deleteExpense = async function(id) {
        try { 
            await supabase.deleteExpense(id); 
            this.data.expenses = this.data.expenses.filter(e => e.id !== id); 
            this.updateUI(); 
            this.showMessage(this.t('deleted'), 'success'); 
        } catch (e) { 
            console.error('Error deleting expense:', e);
            this.showMessage(this.t('error'), 'error'); 
        }
    };

    BudgetTracker.prototype.deleteIncome = async function(id) {
        try { 
            await supabase.deleteIncome(id); 
            this.data.income = this.data.income.filter(i => i.id !== id); 
            this.updateUI(); 
            this.showMessage(this.t('deleted'), 'success'); 
        } catch (e) { 
            console.error('Error deleting income:', e);
            this.showMessage(this.t('error'), 'error'); 
        }
    };
});
