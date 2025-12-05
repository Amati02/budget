/**
 * Supabase Adapter for Budget Tracker
 * This overrides the BudgetTracker methods to use Supabase instead of Express API
 * This file must be loaded AFTER script.js
 */

// Override loadDataFromAPI to use Supabase
BudgetTracker.prototype.loadDataFromAPI = async function() {
    try {
        const [expenses, income, budget, categories] = await Promise.all([
            supabase.getExpenses(),
            supabase.getIncome(),
            supabase.getBudget(),
            supabase.getCategories()
        ]);
        
        this.data.expenses = (expenses || []).map(e => ({
            id: e.id,
            date: e.date,
            category: e.category,
            description: e.description,
            amount: parseFloat(e.amount),
            createdAt: e.created_at
        }));
        
        this.data.income = (income || []).map(i => ({
            id: i.id,
            date: i.date,
            category: i.category,
            description: i.description,
            amount: parseFloat(i.amount),
            createdAt: i.created_at
        }));
        
        this.data.monthlyBudget = parseFloat(budget?.monthly_budget) || 0;
        this.data.categories = categories?.categories || this.data.categories;
        this.data.categoryIcons = categories?.categoryIcons || {};
    } catch (error) {
        console.error('Error loading from Supabase:', error);
        throw error;
    }
};

// Override addExpense
BudgetTracker.prototype.addExpense = async function() {
    const exp = { 
        date: document.getElementById('expenseDate').value, 
        category: document.getElementById('expenseCategory').value, 
        description: '', 
        amount: parseFloat(document.getElementById('expenseAmount').value) 
    };
    try {
        console.log('1. Adding expense to Supabase...');
        await supabase.addExpense(exp);
        console.log('2. Expense added, loading data...');
        await this.loadDataFromAPI(); 
        console.log('3. Data loaded, updating UI...');
        this.updateUI(); 
        console.log('4. UI updated, hiding modal...');
        this.hideModal(document.getElementById('expenseModal')); 
        console.log('5. Done!');
        this.showMessage(this.t('expenseAdded'), 'success');
    } catch (e) { 
        console.error('Error adding expense at step:', e);
        console.error('Error stack:', e.stack);
        this.showMessage(this.t('errorAddingExpense'), 'error'); 
    }
};

// Override addIncome
BudgetTracker.prototype.addIncome = async function() {
    const inc = { 
        date: document.getElementById('incomeDate').value, 
        category: document.getElementById('incomeCategory').value, 
        description: '', 
        amount: parseFloat(document.getElementById('incomeAmount').value) 
    };
    try {
        console.log('1. Adding income to Supabase...');
        await supabase.addIncome(inc);
        console.log('2. Income added, loading data...');
        await this.loadDataFromAPI(); 
        console.log('3. Data loaded, updating UI...');
        this.updateUI(); 
        console.log('4. UI updated, hiding modal...');
        this.hideModal(document.getElementById('incomeModal')); 
        console.log('5. Done!');
        this.showMessage(this.t('incomeAdded'), 'success');
    } catch (e) { 
        console.error('Error adding income at step:', e);
        console.error('Error stack:', e.stack);
        this.showMessage(this.t('errorAddingIncome'), 'error'); 
    }
};

// Override addCategory
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
        await this.loadDataFromAPI();
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

// Override updateCategory
BudgetTracker.prototype.updateCategory = async function(type, oldName, newName, icon) {
    try {
        await supabase.updateCategory(type, oldName, newName, icon);
        await this.loadDataFromAPI();
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

// Override deleteExpense
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

// Override deleteIncome
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

// Override removeCategory
BudgetTracker.prototype.removeCategory = async function(type, name) {
    if (!confirm(`${this.t('deleteConfirm')} "${name}"?`)) return;
    
    try {
        await supabase.deleteCategory(type, name);
        this.data.categories[type] = this.data.categories[type].filter(c => c !== name);
        if (this.data.categoryIcons && this.data.categoryIcons[name]) {
            delete this.data.categoryIcons[name];
        }
        this.showMessage(this.t('categoryDeleted'), 'success');
        this.updateUI();
    } catch (e) {
        console.error('Error deleting category:', e);
        this.showMessage(this.t('errorDeletingCategory'), 'error');
    }
};

// Now instantiate the BudgetTracker with Supabase methods
const budgetTracker = new BudgetTracker();
