class BudgetTracker {
    constructor() {
        this.apiBaseUrl = '';
        this.data = {
            expenses: [], income: [], monthlyBudget: 0,
            categories: {
                expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'],
                income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
            }
        };
        this.charts = {};
        this.transactionFilter = '';
        this.currency = localStorage.getItem('currency') || '₽';
        this.language = localStorage.getItem('language') || 'en';
        this.translations = {
            en: {
                myBudget: 'My Budget',
                welcomeBack: 'Welcome back',
                income: 'Income',
                spending: 'Spending',
                transaction: 'Transaction',
                seeAll: 'See all',
                incomeVsSpending: 'Income VS Spending',
                allTransactions: 'All Transactions',
                reports: 'Reports',
                settings: 'Settings',
                home: 'Home',
                expenses: 'Expenses',
                incomeNav: 'Income',
                expense: 'Expense',
                addExpense: 'Add Expense',
                addIncome: 'Add Income',
                date: 'Date',
                selectDate: 'Select date',
                today: 'Today',
                yesterday: 'Yesterday',
                weekAgo: 'Week ago',
                category: 'Category',
                amount: 'Amount',
                cancel: 'Cancel',
                add: 'Add',
                quickAdd: 'Quick Add',
                language: 'Language',
                currency: 'Currency',
                expenseCategories: 'Expense Categories',
                incomeCategories: 'Income Categories',
                addNewCategory: 'Add New Category',
                addNewExpenseCategory: 'Add New Expense Category',
                addNewIncomeCategory: 'Add New Income Category',
                editCategory: 'Edit Category',
                categoryName: 'Category Name',
                enterCategoryName: 'Enter category name...',
                selectIcon: 'Select Icon',
                searchIcons: 'Search icons...',
                addCategory: 'Add Category',
                week: 'Week',
                month: 'Month',
                threeMonths: '3 Months',
                sixMonths: '6 Months',
                year: 'Year',
                monthlyTrends: 'Monthly Trends',
                expensesByCategory: 'Expenses by Category',
                incomeByCategory: 'Income by Category',
                topExpenses: 'Top Expenses',
                topIncomeSources: 'Top Income Sources',
                noTransactions: 'No transactions',
                noExpenses: 'No expenses',
                noIncome: 'No income',
                allTime: 'All Time',
                selectPeriod: 'Select period',
                startDate: 'Start date',
                endDate: 'End date',
                apply: 'Apply',
                clear: 'Clear',
                searchTransactions: 'Search transactions...',
                expenseAdded: 'Expense added!',
                incomeAdded: 'Income added!',
                categoryAdded: 'Category added!',
                categoryUpdated: 'Category updated!',
                categoryDeleted: 'Category deleted',
                deleted: 'Deleted!',
                error: 'Error',
                errorAddingExpense: 'Error adding expense',
                errorAddingIncome: 'Error adding income',
                errorAddingCategory: 'Error adding category',
                errorUpdatingCategory: 'Error updating category',
                errorDeletingCategory: 'Error deleting category',
                categoryExists: 'Category already exists',
                enterCategoryNameError: 'Please enter a category name',
                deleteConfirm: 'Delete category',
                months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                weekdays: ['MON','TUE','WED','THU','FRI','SAT','SUN']
            },
            ru: {
                myBudget: 'Мой Бюджет',
                welcomeBack: 'С возвращением',
                income: 'Доход',
                spending: 'Расходы',
                transaction: 'Транзакции',
                seeAll: 'Все',
                incomeVsSpending: 'Доходы и Расходы',
                allTransactions: 'Все транзакции',
                reports: 'Отчёты',
                settings: 'Настройки',
                home: 'Главная',
                expenses: 'Расходы',
                incomeNav: 'Доходы',
                expense: 'Расход',
                addExpense: 'Добавить расход',
                addIncome: 'Добавить доход',
                date: 'Дата',
                selectDate: 'Выберите дату',
                today: 'Сегодня',
                yesterday: 'Вчера',
                weekAgo: 'Неделю назад',
                category: 'Категория',
                amount: 'Сумма',
                cancel: 'Отмена',
                add: 'Добавить',
                quickAdd: 'Быстрое добавление',
                language: 'Язык',
                currency: 'Валюта',
                expenseCategories: 'Категории расходов',
                incomeCategories: 'Категории доходов',
                addNewCategory: 'Новая категория',
                addNewExpenseCategory: 'Новая категория расходов',
                addNewIncomeCategory: 'Новая категория доходов',
                editCategory: 'Редактировать',
                categoryName: 'Название',
                enterCategoryName: 'Введите название...',
                selectIcon: 'Выберите иконку',
                searchIcons: 'Поиск иконок...',
                addCategory: 'Добавить',
                week: 'Неделя',
                month: 'Месяц',
                threeMonths: '3 Месяца',
                sixMonths: '6 Месяцев',
                year: 'Год',
                monthlyTrends: 'Тренды',
                expensesByCategory: 'Расходы по категориям',
                incomeByCategory: 'Доходы по категориям',
                topExpenses: 'Топ расходов',
                topIncomeSources: 'Топ доходов',
                noTransactions: 'Нет транзакций',
                noExpenses: 'Нет расходов',
                noIncome: 'Нет доходов',
                allTime: 'Всё время',
                selectPeriod: 'Выберите период',
                startDate: 'Начало',
                endDate: 'Конец',
                apply: 'Применить',
                clear: 'Сбросить',
                searchTransactions: 'Поиск транзакций...',
                expenseAdded: 'Расход добавлен!',
                incomeAdded: 'Доход добавлен!',
                categoryAdded: 'Категория добавлена!',
                categoryUpdated: 'Категория обновлена!',
                categoryDeleted: 'Категория удалена',
                deleted: 'Удалено!',
                error: 'Ошибка',
                errorAddingExpense: 'Ошибка добавления расхода',
                errorAddingIncome: 'Ошибка добавления дохода',
                errorAddingCategory: 'Ошибка добавления категории',
                errorUpdatingCategory: 'Ошибка обновления категории',
                errorDeletingCategory: 'Ошибка удаления категории',
                categoryExists: 'Категория уже существует',
                enterCategoryNameError: 'Введите название категории',
                deleteConfirm: 'Удалить категорию',
                months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                weekdays: ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС']
            }
        };
        this.init();
    }
    
    t(key) {
        return this.translations[this.language][key] || this.translations['en'][key] || key;
    }
    
    setLanguage(lang) {
        this.language = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        this.applyTranslations();
        this.updateLanguageButtons();
        this.updateUI();
    }
    
    applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.t(key)) {
                el.textContent = this.t(key);
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (this.t(key)) {
                el.placeholder = this.t(key);
            }
        });
        // Update header title for current active section
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            this.updateHeaderTitle(activeSection.id);
        }
    }
    
    updateLanguageButtons() {
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.language);
        });
    }

    async init() {
        try { await this.loadDataFromAPI(); } catch (e) { 
            console.error('API error, using localStorage:', e); 
            this.useLocalStorage = true;
            this.loadFromLocalStorage();
        }
        this.setupEventListeners();
        this.applyTranslations();
        this.updateLanguageButtons();
        this.updateUI();
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('budgetData');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.data.expenses = parsed.expenses || [];
            this.data.income = parsed.income || [];
            this.data.monthlyBudget = parsed.monthlyBudget || 0;
            this.data.categories = parsed.categories || this.data.categories;
            this.data.categoryIcons = parsed.categoryIcons || {};
        }
    }

    saveToLocalStorage() {
        localStorage.setItem('budgetData', JSON.stringify(this.data));
    }

    async loadDataFromAPI() {
        const health = await fetch(this.apiBaseUrl + '/health');
        if (!health.ok) throw new Error('API unavailable');
        const [exp, inc, bud, cat] = await Promise.all([
            fetch(this.apiBaseUrl + '/api/expenses'),
            fetch(this.apiBaseUrl + '/api/income'),
            fetch(this.apiBaseUrl + '/api/budget'),
            fetch(this.apiBaseUrl + '/api/categories')
        ]);
        if (exp.ok) this.data.expenses = await exp.json();
        if (inc.ok) this.data.income = await inc.json();
        if (bud.ok) { const b = await bud.json(); this.data.monthlyBudget = b.monthlyBudget || 0; }
        if (cat.ok) { 
            const c = await cat.json(); 
            this.data.categories = c.categories || this.data.categories;
            this.data.categoryIcons = c.categoryIcons || {};
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.bottom-nav-btn').forEach(btn => btn.addEventListener('click', e => this.showSection(e.currentTarget.dataset.section)));
        document.getElementById('addExpenseBtn')?.addEventListener('click', () => this.showModal('expenseModal'));
        document.getElementById('addIncomeBtn')?.addEventListener('click', () => this.showModal('incomeModal'));
        document.getElementById('dashAddExpenseBtn')?.addEventListener('click', () => this.showModal('expenseModal'));
        document.getElementById('dashAddIncomeBtn')?.addEventListener('click', () => this.showModal('incomeModal'));
        document.getElementById('quickAddBtn')?.addEventListener('click', () => this.showModal('incomeModal'));
        document.querySelector('.expense-icon-btn')?.addEventListener('click', () => this.showModal('expenseModal'));
        document.getElementById('quickIncomeBtn')?.addEventListener('click', () => { this.hideModal(document.getElementById('quickAddModal')); this.showModal('incomeModal'); });
        document.getElementById('quickExpenseBtn')?.addEventListener('click', () => { this.hideModal(document.getElementById('quickAddModal')); this.showModal('expenseModal'); });
        document.querySelectorAll('.close').forEach(btn => btn.addEventListener('click', e => this.hideModal(e.target.closest('.modal'))));
        document.getElementById('expenseForm')?.addEventListener('submit', e => { e.preventDefault(); this.addExpense(); });
        document.getElementById('incomeForm')?.addEventListener('submit', e => { e.preventDefault(); this.addIncome(); });
        document.getElementById('categoryForm')?.addEventListener('submit', e => { e.preventDefault(); this.addCategory(); });
        document.getElementById('cancelExpenseBtn')?.addEventListener('click', () => this.hideModal(document.getElementById('expenseModal')));
        document.getElementById('cancelIncomeBtn')?.addEventListener('click', () => this.hideModal(document.getElementById('incomeModal')));
        
        // Add category buttons - navigate to add category page
        document.getElementById('addExpenseCategoryBtn')?.addEventListener('click', () => {
            document.getElementById('categoryType').value = 'expense';
            this.showSection('addCategory');
            this.updateAddCategoryTitle('expense');
        });
        document.getElementById('addIncomeCategoryBtn')?.addEventListener('click', () => {
            document.getElementById('categoryType').value = 'income';
            this.showSection('addCategory');
            this.updateAddCategoryTitle('income');
        });
        
        // Icon search
        document.getElementById('iconSearch')?.addEventListener('input', (e) => this.filterIcons(e.target.value));

        // Single date picker
        document.getElementById('expenseDatePicker')?.addEventListener('click', () => this.openSingleDatePicker('expense'));
        document.getElementById('incomeDatePicker')?.addEventListener('click', () => this.openSingleDatePicker('income'));
        document.getElementById('singleDateClose')?.addEventListener('click', () => this.closeSingleDatePicker());
        document.getElementById('singleDateCancel')?.addEventListener('click', () => this.cancelSingleDatePicker());
        
        // Date preset buttons in forms
        document.querySelectorAll('.date-presets .preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const days = parseInt(btn.dataset.days);
                const type = btn.dataset.type;
                this.setPresetDate(type, days);
            });
        });

        this.initDateRangePicker();
        this.initSingleDatePicker();
        this.selectedReportPeriod = 6;
        document.querySelectorAll('.period-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.selectedReportPeriod = parseFloat(e.target.dataset.months);
                this.updateReports();
            });
        });
        
        // Currency selector
        document.querySelectorAll('.currency-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setCurrency(btn.dataset.currency);
            });
        });
        
        // Language selector
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });
        document.getElementById('seeAllBtn')?.addEventListener('click', () => this.showSection('transactions'));
        document.getElementById('filterIncomeBtn')?.addEventListener('click', () => this.filterTransactions('income'));
        document.getElementById('filterExpenseBtn')?.addEventListener('click', () => this.filterTransactions('expense'));
        document.getElementById('transactionSearchToggle')?.addEventListener('click', () => this.toggleTransactionSearch());
        document.getElementById('transactionSearchInput')?.addEventListener('input', () => this.updateTransactionsPage());
        this.setDefaultDates();
        this.updateCurrentMonth();
        setInterval(() => this.loadDataFromAPI().then(() => this.updateUI()).catch(() => {}), 5000);
    }

    updateCurrentMonth() {
        const months = this.t('months');
        const el = document.getElementById('currentMonth');
        if (el) el.textContent = months[new Date().getMonth()];
        // Also update transactions month display to current month
        const transEl = document.getElementById('transactionCurrentMonth');
        if (transEl) transEl.textContent = months[new Date().getMonth()];
    }

    setDefaultDates() {
        const today = new Date(), first = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        // Use local date format to avoid timezone issues
        const formatDate = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        const t = formatDate(today), f = formatDate(first), l = formatDate(lastDay);
        ['expenseDate','incomeDate'].forEach(id => { const el = document.getElementById(id); if (el) el.value = t; });
        ['expenseDateFrom','incomeDateFrom'].forEach(id => { const el = document.getElementById(id); if (el) el.value = f; });
        ['expenseDateTo','incomeDateTo'].forEach(id => { const el = document.getElementById(id); if (el) el.value = t; });
        
        // Set default date range for transactions page to current month
        this.dateRangeStart = first;
        this.dateRangeEnd = lastDay;
        document.getElementById('transactionDateFrom').value = f;
        document.getElementById('transactionDateTo').value = l;
    }

    showSection(name) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.bottom-nav-btn').forEach(b => b.classList.remove('active'));
        
        // Map expenses to transactions section with expense filter
        if (name === 'expenses') {
            document.getElementById('transactions')?.classList.add('active');
            document.querySelectorAll('[data-section="expenses"]').forEach(b => b.classList.add('active'));
            this.updateHeaderTitle('transactions');
            this.initTransactionDates();
            this.transactionFilter = 'expense';
            document.getElementById('filterIncomeBtn')?.classList.remove('active-filter');
            document.getElementById('filterExpenseBtn')?.classList.add('active-filter');
            this.updateTransactionsPage();
        } 
        // Map income to transactions section with income filter
        else if (name === 'income') {
            document.getElementById('transactions')?.classList.add('active');
            document.querySelectorAll('[data-section="income"]').forEach(b => b.classList.add('active'));
            this.updateHeaderTitle('transactions');
            this.initTransactionDates();
            this.transactionFilter = 'income';
            document.getElementById('filterIncomeBtn')?.classList.add('active-filter');
            document.getElementById('filterExpenseBtn')?.classList.remove('active-filter');
            this.updateTransactionsPage();
        } 
        else {
            document.getElementById(name)?.classList.add('active');
            document.querySelectorAll('[data-section="'+name+'"]').forEach(b => b.classList.add('active'));
            this.updateHeaderTitle(name);
            
            if (name === 'dashboard') this.updateDashboard();
            else if (name === 'transactions') { 
                this.initTransactionDates(); 
                this.transactionFilter = '';
                document.getElementById('filterIncomeBtn')?.classList.remove('active-filter');
                document.getElementById('filterExpenseBtn')?.classList.remove('active-filter');
                this.updateTransactionsPage(); 
            }
            else if (name === 'reports') this.updateReports();
            else if (name === 'settings') this.updateSettings();
            else if (name === 'addCategory') {
                this.initIconPicker();
            }
        }
    }

    updateHeaderTitle(name) {
        const userNameEl = document.querySelector('.user-name');
        const userGreetingEl = document.querySelector('.user-greeting');
        const userAvatarEl = document.querySelector('.user-avatar');
        if (name === 'dashboard') {
            if (userNameEl) userNameEl.textContent = this.t('myBudget');
            if (userGreetingEl) userGreetingEl.textContent = this.t('welcomeBack');
            if (userAvatarEl) userAvatarEl.style.display = 'flex';
        } else if (name === 'transactions') {
            if (userNameEl) userNameEl.textContent = this.t('allTransactions');
            if (userGreetingEl) userGreetingEl.textContent = '';
            if (userAvatarEl) userAvatarEl.style.display = 'none';
        } else if (name === 'reports') {
            if (userNameEl) userNameEl.textContent = this.t('reports');
            if (userGreetingEl) userGreetingEl.textContent = '';
            if (userAvatarEl) userAvatarEl.style.display = 'none';
        } else if (name === 'settings') {
            if (userNameEl) userNameEl.textContent = this.t('settings');
            if (userGreetingEl) userGreetingEl.textContent = '';
            if (userAvatarEl) userAvatarEl.style.display = 'none';
        } else if (name === 'addCategory') {
            const type = document.getElementById('categoryType')?.value;
            if (userNameEl) userNameEl.textContent = type === 'expense' ? this.t('addExpense') : this.t('addIncome');
            if (userGreetingEl) userGreetingEl.textContent = '';
            if (userAvatarEl) userAvatarEl.style.display = 'none';
        } else {
            if (userNameEl) userNameEl.textContent = '';
            if (userGreetingEl) userGreetingEl.textContent = '';
            if (userAvatarEl) userAvatarEl.style.display = 'none';
        }
    }

    showModal(id) { 
        document.getElementById(id).style.display = 'block'; 
        this.populateCategorySelects(); 
    }
    hideModal(m) { if (m) m.style.display = 'none'; }
    
    updateAddCategoryTitle(type) {
        const titleEl = document.getElementById('addCategoryTitle');
        if (titleEl) {
            titleEl.textContent = type === 'expense' ? this.t('addNewExpenseCategory') : this.t('addNewIncomeCategory');
        }
    }
    
    initIconPicker() {
        const iconGrid = document.getElementById('iconGrid');
        const selectedIconInput = document.getElementById('selectedIcon');
        
        if (!iconGrid) return;
        
        this.renderIcons();
        
        // Add click handlers
        iconGrid.addEventListener('click', (e) => {
            const option = e.target.closest('.icon-option');
            if (option) {
                iconGrid.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                selectedIconInput.value = option.dataset.icon;
            }
        });
    }
    
    renderIcons(filter = '') {
        const iconGrid = document.getElementById('iconGrid');
        const selectedIconInput = document.getElementById('selectedIcon');
        
        if (!iconGrid) return;
        
        const allIcons = getAllIconNames();
        const filtered = filter ? allIcons.filter(name => name.toLowerCase().includes(filter.toLowerCase())) : allIcons;
        
        iconGrid.innerHTML = filtered.map(iconName => 
            `<div class="icon-option" data-icon="${iconName}">
                ${getCategoryIconHTML(iconName)}
            </div>`
        ).join('');
        
        // Select default icon
        const defaultOption = iconGrid.querySelector(`[data-icon="${selectedIconInput.value}"]`);
        if (defaultOption) defaultOption.classList.add('selected');
    }
    
    filterIcons(searchTerm) {
        this.renderIcons(searchTerm);
    }
    


    async addExpense() {
        const exp = { id: Date.now(), date: document.getElementById('expenseDate').value, category: document.getElementById('expenseCategory').value, description: '', amount: parseFloat(document.getElementById('expenseAmount').value) };
        if (this.useLocalStorage) {
            this.data.expenses.push(exp);
            this.saveToLocalStorage();
            this.updateUI(); this.hideModal(document.getElementById('expenseModal')); this.showMessage(this.t('expenseAdded'), 'success');
            return;
        }
        try {
            await fetch(this.apiBaseUrl + '/api/expenses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(exp) });
            await this.loadDataFromAPI(); this.updateUI(); this.hideModal(document.getElementById('expenseModal')); this.showMessage(this.t('expenseAdded'), 'success');
        } catch (e) { this.showMessage(this.t('errorAddingExpense'), 'error'); }
    }

    async addIncome() {
        const inc = { id: Date.now(), date: document.getElementById('incomeDate').value, category: document.getElementById('incomeCategory').value, description: '', amount: parseFloat(document.getElementById('incomeAmount').value) };
        if (this.useLocalStorage) {
            this.data.income.push(inc);
            this.saveToLocalStorage();
            this.updateUI(); this.hideModal(document.getElementById('incomeModal')); this.showMessage(this.t('incomeAdded'), 'success');
            return;
        }
        try {
            await fetch(this.apiBaseUrl + '/api/income', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(inc) });
            await this.loadDataFromAPI(); this.updateUI(); this.hideModal(document.getElementById('incomeModal')); this.showMessage(this.t('incomeAdded'), 'success');
        } catch (e) { this.showMessage(this.t('errorAddingIncome'), 'error'); }
    }

    async addCategory() {
        const type = document.getElementById('categoryType').value;
        const name = document.getElementById('categoryName').value.trim();
        const icon = document.getElementById('selectedIcon').value || 'wallet';
        
        if (!name) {
            this.showMessage(this.t('enterCategoryNameError'), 'error');
            return;
        }
        
        // Check if we're editing an existing category
        if (this.editingCategory) {
            await this.updateCategory(this.editingCategory.type, this.editingCategory.name, name, icon);
            return;
        }
        
        if (this.data.categories[type].includes(name)) {
            this.showMessage(this.t('categoryExists'), 'error');
            return;
        }
        
        try {
            const response = await fetch(this.apiBaseUrl + '/api/categories', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ type, name, icon }) 
            });
            
            if (!response.ok) {
                throw new Error('Failed to add category');
            }
            
            // Reload data from API to get updated categories
            await this.loadDataFromAPI();
            
            this.showMessage(this.t('categoryAdded'), 'success');
            
            // Reset form
            document.getElementById('categoryName').value = '';
            document.getElementById('selectedIcon').value = 'wallet';
            document.getElementById('addCategoryTitle').textContent = this.t('addNewCategory');
            this.renderIcons();
            
            // Update UI
            this.updateUI();
            
            // Go back to settings after a delay
            setTimeout(() => {
                this.showSection('settings');
            }, 1500);
        } catch (e) { 
            console.error('Error adding category:', e);
            this.showMessage(this.t('errorAddingCategory'), 'error'); 
        }
    }
    
    async updateCategory(type, oldName, newName, icon) {
        try {
            const response = await fetch(this.apiBaseUrl + '/api/categories/update', { 
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ type, oldName, newName, icon }) 
            });
            
            if (!response.ok) {
                throw new Error('Failed to update category');
            }
            
            // Reload data from API
            await this.loadDataFromAPI();
            
            this.showMessage(this.t('categoryUpdated'), 'success');
            
            // Reset form and editing state
            this.editingCategory = null;
            document.getElementById('categoryName').value = '';
            document.getElementById('selectedIcon').value = 'wallet';
            document.getElementById('addCategoryTitle').textContent = this.t('addNewCategory');
            this.renderIcons();
            
            // Update UI
            this.updateUI();
            
            // Go back to settings after a delay
            setTimeout(() => {
                this.showSection('settings');
            }, 1500);
        } catch (e) { 
            console.error('Error updating category:', e);
            this.showMessage(this.t('errorUpdatingCategory'), 'error'); 
        }
    }

    async deleteExpense(id) {
        try { await fetch(this.apiBaseUrl + '/api/expenses/' + id, { method: 'DELETE' }); this.data.expenses = this.data.expenses.filter(e => e.id !== id); this.updateUI(); this.showMessage(this.t('deleted'), 'success'); } catch (e) { this.showMessage(this.t('error'), 'error'); }
    }

    async deleteIncome(id) {
        try { await fetch(this.apiBaseUrl + '/api/income/' + id, { method: 'DELETE' }); this.data.income = this.data.income.filter(i => i.id !== id); this.updateUI(); this.showMessage(this.t('deleted'), 'success'); } catch (e) { this.showMessage(this.t('error'), 'error'); }
    }

    updateUI() { this.updateDashboard(); this.populateCategorySelects(); this.updateSettings(); this.updateTransactionsPage(); }

    updateDashboard() {
        const { expenses, income } = this.getFilteredData();
        const totalExp = expenses.reduce((s, e) => s + e.amount, 0);
        const totalInc = income.reduce((s, i) => s + i.amount, 0);
        const balance = totalInc - totalExp;
        const balanceEl = document.getElementById('budgetBalance');
        if (balanceEl) {
            balanceEl.textContent = this.formatCurrency(balance, true);
            balanceEl.classList.toggle('negative', balance < 0);
        }
        document.getElementById('totalIncome').textContent = this.formatCurrency(totalInc);
        document.getElementById('totalExpenses').textContent = this.formatCurrency(totalExp);
        this.updateIncomeVsSpendingChart();
        this.updateTransactionsList();
    }

    updateIncomeVsSpendingChart() {
        const canvas = document.getElementById('incomeVsSpendingChart');
        if (!canvas) return;
        
        // Only update if on dashboard section
        const dashboardSection = document.getElementById('dashboard');
        if (!dashboardSection || !dashboardSection.classList.contains('active')) return;
        
        const { expenses, income } = this.getFilteredData();
        
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Get number of days in current month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Initialize all days of the month with zero values
        const dailyData = {};
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            dailyData[dateStr] = { income: 0, spending: 0 };
        }
        
        // Add actual transaction data
        expenses.forEach(e => {
            if (dailyData[e.date]) {
                dailyData[e.date].spending += e.amount;
            }
        });
        income.forEach(i => {
            if (dailyData[i.date]) {
                dailyData[i.date].income += i.amount;
            }
        });
        
        // Sort dates and prepare data
        const sortedDates = Object.keys(dailyData).sort((a, b) => new Date(a) - new Date(b));
        const labels = sortedDates.map(d => {
            const date = new Date(d);
            return date.getDate();
        });
        const incomeData = sortedDates.map(d => dailyData[d].income);
        const spendingData = sortedDates.map(d => dailyData[d].spending);
        
        // Destroy existing chart if it exists
        if (this.charts.incomeVsSpending) {
            this.charts.incomeVsSpending.destroy();
        }
        
        // Create new chart
        this.charts.incomeVsSpending = new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: this.t('income'),
                        data: incomeData,
                        borderColor: '#04D38B',
                        backgroundColor: 'rgba(4, 211, 139, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: this.t('spending'),
                        data: spendingData,
                        borderColor: '#FF6B6B',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        align: 'center',
                        labels: { 
                            color: '#FFFFFF', 
                            font: { size: 19, weight: 'bold' },
                            usePointStyle: false,
                            boxWidth: 10,
                            boxHeight: 10,
                            padding: 15,
                            generateLabels: function(chart) {
                                const datasets = chart.data.datasets;
                                return datasets.map((dataset, i) => ({
                                    text: dataset.label,
                                    fillStyle: dataset.borderColor,
                                    strokeStyle: dataset.borderColor,
                                    fontColor: '#FFFFFF',
                                    lineWidth: 0,
                                    hidden: !chart.isDatasetVisible(i),
                                    index: i
                                }));
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#888' },
                        grid: { color: '#3A3A3A' }
                    },
                    x: {
                        ticks: { color: '#888', maxRotation: 0, autoSkip: true, maxTicksLimit: 15 },
                        grid: { color: '#3A3A3A' }
                    }
                }
            }
        });
    }

    updateTransactionsList() {
        const list = document.getElementById('transactionsList'); if (!list) return;
        const all = [...this.data.expenses.map(e => ({...e, type: 'expense'})), ...this.data.income.map(i => ({...i, type: 'income'}))].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
        if (all.length === 0) { list.innerHTML = '<div class="empty-transactions">' + getCategoryIconHTML('receipt') + '<p>' + this.t('noTransactions') + '</p></div>'; return; }
        list.innerHTML = all.map(t => '<div class="transaction-item"><div class="transaction-icon">' + this.getCategoryIcon(t.category) + '<span class="type-indicator ' + t.type + '"><i class="fas fa-arrow-' + (t.type === 'income' ? 'down' : 'up') + '"></i></span></div><div class="transaction-details"><span class="transaction-name">' + t.category + '</span><span class="transaction-date">' + this.formatDate(t.date) + '</span></div><span class="transaction-amount ' + t.type + '">' + (t.type === 'expense' ? '-' : '+') + this.formatCurrency(t.amount) + '</span></div>').join('');
    }

    getCategoryIcon(cat) {
        // Check if we have a custom icon stored for this category
        if (this.data.categoryIcons && this.data.categoryIcons[cat]) {
            return getCategoryIconHTML(this.data.categoryIcons[cat]);
        }
        
        // Default icon mapping for existing categories
        const defaultIcons = { 
            food: 'restaurant', transport: 'car', shopping: 'shopping', bills: 'receipt', 
            entertainment: 'game', health: 'health', salary: 'briefcase', freelance: 'laptop', 
            investment: 'investment', gift: 'gift', продукты: 'grocery', транспорт: 'car',
            ипотека: 'home', коммуналка: 'electricity', интернет: 'wifi', машина: 'car',
            заправка: 'gas', аптека: 'pill', врачи: 'doctor', кафе: 'coffee', рестораны: 'restaurant'
        };
        
        const iconName = defaultIcons[cat.toLowerCase()] || 'wallet';
        return getCategoryIconHTML(iconName);
    }

    getFilteredData() {
        const m = new Date().getMonth(), y = new Date().getFullYear();
        return {
            expenses: this.data.expenses.filter(e => { const d = new Date(e.date); return d.getMonth() === m && d.getFullYear() === y; }),
            income: this.data.income.filter(i => { const d = new Date(i.date); return d.getMonth() === m && d.getFullYear() === y; })
        };
    }



    populateCategorySelects() {
        // Populate expense category grid
        const expenseGrid = document.getElementById('expenseCategoryGrid');
        const selectedExpense = document.getElementById('expenseCategory')?.value;
        if (expenseGrid) {
            expenseGrid.innerHTML = '';
            this.data.categories.expense.forEach(cat => {
                const iconHTML = this.getCategoryIconForGrid(cat);
                const item = document.createElement('div');
                item.className = 'category-grid-item' + (cat === selectedExpense ? ' selected' : '');
                item.dataset.category = cat;
                item.innerHTML = `<div class="category-icon">${iconHTML}</div><span>${cat}</span>`;
                item.addEventListener('click', () => this.selectCategory('expense', cat));
                expenseGrid.appendChild(item);
            });
        }
        
        // Populate income category grid
        const incomeGrid = document.getElementById('incomeCategoryGrid');
        const selectedIncome = document.getElementById('incomeCategory')?.value;
        if (incomeGrid) {
            incomeGrid.innerHTML = '';
            this.data.categories.income.forEach(cat => {
                const iconHTML = this.getCategoryIconForGrid(cat);
                const item = document.createElement('div');
                item.className = 'category-grid-item' + (cat === selectedIncome ? ' selected' : '');
                item.dataset.category = cat;
                item.innerHTML = `<div class="category-icon">${iconHTML}</div><span>${cat}</span>`;
                item.addEventListener('click', () => this.selectCategory('income', cat));
                incomeGrid.appendChild(item);
            });
        }
        
        // Keep filter selects for transactions page
        ['expenseCategoryFilter'].forEach(id => { const sel = document.getElementById(id); if (!sel) return; const v = sel.value; sel.innerHTML = '<option value="">All</option>'; this.data.categories.expense.forEach(c => sel.innerHTML += '<option value="' + c + '">' + c + '</option>'); sel.value = v; });
        ['incomeCategoryFilter'].forEach(id => { const sel = document.getElementById(id); if (!sel) return; const v = sel.value; sel.innerHTML = '<option value="">All</option>'; this.data.categories.income.forEach(c => sel.innerHTML += '<option value="' + c + '">' + c + '</option>'); sel.value = v; });
    }
    
    selectCategory(type, category) {
        const gridId = type === 'expense' ? 'expenseCategoryGrid' : 'incomeCategoryGrid';
        const inputId = type === 'expense' ? 'expenseCategory' : 'incomeCategory';
        
        // Remove selected class from all items
        document.querySelectorAll(`#${gridId} .category-grid-item`).forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selected class to clicked item
        const selectedItem = document.querySelector(`#${gridId} .category-grid-item[data-category="${category}"]`);
        if (selectedItem) {
            selectedItem.classList.add('selected');
        }
        
        // Set hidden input value
        document.getElementById(inputId).value = category;
    }
    
    getCategoryIconForGrid(category) {
        // Check if we have a custom icon stored for this category
        if (this.data.categoryIcons && this.data.categoryIcons[category]) {
            return getCategoryIconHTML(this.data.categoryIcons[category]);
        }
        // Default icon
        return getCategoryIconHTML('wallet');
    }



    updateTransactionsPage() {
        const list = document.getElementById('transactionsFullList'); if (!list) return;
        const filtered = this.getFilteredTransactions();
        if (filtered.length === 0) { 
            list.innerHTML = '<div class="empty-transactions">' + getCategoryIconHTML('receipt') + '<p>' + this.t('noTransactions') + '</p></div>'; 
        } else {
            const grouped = this.groupTransactionsByDate(filtered);
            let html = '';
            Object.keys(grouped).forEach(date => {
                html += '<div class="transaction-date-group"><div class="transaction-date-header">' + this.formatDateHeader(date) + '</div>';
                grouped[date].forEach(t => {
                    html += '<div class="transaction-item" data-id="' + t.id + '" data-type="' + t.type + '"><div class="transaction-icon">' + this.getCategoryIcon(t.category) + '<span class="type-indicator ' + t.type + '"><i class="fas fa-arrow-' + (t.type === 'income' ? 'down' : 'up') + '"></i></span></div><div class="transaction-details"><span class="transaction-name">' + t.category + '</span><span class="transaction-desc">' + (t.description || '') + '</span></div><span class="transaction-amount ' + t.type + '">' + (t.type === 'expense' ? '-' : '+') + this.formatCurrency(t.amount) + '</span></div>';
                });
                html += '</div>';
            });
            list.innerHTML = html;
            this.attachSwipeHandlers();
        }
        const allInDateRange = this.getAllTransactionsInDateRange();
        const totalInc = allInDateRange.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const totalExp = allInDateRange.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        document.getElementById('transactionTotalIncome').textContent = this.formatCurrency(totalInc);
        document.getElementById('transactionTotalExpenses').textContent = this.formatCurrency(totalExp);
        this.updateTransactionMonth();
    }

    groupTransactionsByDate(transactions) {
        const grouped = {};
        transactions.forEach(t => {
            const date = t.date;
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(t);
        });
        return grouped;
    }

    formatDateHeader(dateStr) {
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const transDate = new Date(date);
        transDate.setHours(0, 0, 0, 0);
        
        if (transDate.getTime() === today.getTime()) return this.t('today');
        if (transDate.getTime() === yesterday.getTime()) return this.t('yesterday');
        
        const months = this.t('months');
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    updateTransactionMonth() {
        // Use the selected date range, not always current month
        if (this.dateRangeStart && this.dateRangeEnd) {
            this.updateTransactionMonthDisplay();
        } else {
            const months = this.t('months');
            const el = document.getElementById('transactionCurrentMonth');
            if (el) el.textContent = months[new Date().getMonth()];
        }
    }

    initDateRangePicker() {
        this.dateRangeStart = null;
        this.dateRangeEnd = null;
        this.selectingStart = true;
        document.getElementById('transactionMonthSelector')?.addEventListener('click', () => this.openDateRange());
        document.getElementById('dateRangeClose')?.addEventListener('click', () => this.applyDateRange());
        document.getElementById('dateRangeClear')?.addEventListener('click', () => this.clearDateRange());
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.applyPreset(parseInt(e.target.dataset.months)));
        });
    }

    clearDateRange() {
        // Reset to current month instead of all time
        const today = new Date();
        const first = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const formatDate = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        this.dateRangeStart = first;
        this.dateRangeEnd = lastDay;
        this.selectingStart = true;
        document.getElementById('transactionDateFrom').value = formatDate(first);
        document.getElementById('transactionDateTo').value = formatDate(lastDay);
        document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
        const el = document.getElementById('transactionCurrentMonth');
        const months = this.t('months');
        if (el) el.textContent = months[today.getMonth()];
        this.updateTransactionsPage();
        this.closeDateRange();
    }

    applyPreset(months) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.dateRangeEnd = new Date(today);
        
        const startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - months);
        startDate.setDate(startDate.getDate() + 1);
        this.dateRangeStart = startDate;
        
        this.selectingStart = true;
        this.renderDateRangeCalendars();
        
        document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    initTransactionDates() {
        if (!document.getElementById('transactionDateFrom').value) {
            document.getElementById('transactionDateFrom').value = '';
            document.getElementById('transactionDateTo').value = '';
            this.dateRangeStart = null;
            this.dateRangeEnd = null;
        }
        const el = document.getElementById('transactionCurrentMonth');
        if (el && !this.dateRangeStart && !this.dateRangeEnd) {
            el.textContent = this.t('allTime');
        }
    }

    openDateRange() {
        if (!this.dateRangeStart || !this.dateRangeEnd) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            this.dateRangeStart = new Date(today);
            this.dateRangeEnd = new Date(today);
        }
        document.getElementById('dateRangeModal').classList.add('active');
        this.renderDateRangeCalendars();
        setTimeout(() => this.scrollToCurrentMonth(), 100);
    }

    scrollToCurrentMonth() {
        const currentMonthEl = document.querySelector('.dr-month:last-child');
        if (currentMonthEl) {
            currentMonthEl.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    closeDateRange() {
        document.getElementById('dateRangeModal').classList.remove('active');
    }

    applyDateRange() {
        const formatDate = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        const fromDate = formatDate(this.dateRangeStart);
        const toDate = formatDate(this.dateRangeEnd);
        document.getElementById('transactionDateFrom').value = fromDate;
        document.getElementById('transactionDateTo').value = toDate;
        this.updateTransactionMonthDisplay();
        this.updateTransactionsPage();
        this.closeDateRange();
    }

    updateTransactionMonthDisplay() {
        const months = this.t('months');
        const el = document.getElementById('transactionCurrentMonth');
        if (el && this.dateRangeStart && this.dateRangeEnd) {
            const sameMonth = this.dateRangeStart.getMonth() === this.dateRangeEnd.getMonth() && 
                              this.dateRangeStart.getFullYear() === this.dateRangeEnd.getFullYear();
            if (sameMonth) {
                el.textContent = months[this.dateRangeStart.getMonth()];
            } else {
                const startStr = months[this.dateRangeStart.getMonth()].substring(0,3);
                const endStr = months[this.dateRangeEnd.getMonth()].substring(0,3);
                el.textContent = startStr + ' - ' + endStr;
            }
        }
    }

    renderDateRangeCalendars() {
        const months = this.t('months');
        const weekdays = this.t('weekdays');
        const container = document.getElementById('dateRangeCalendars');
        let html = '';
        
        document.getElementById('startDateDisplay').textContent = this.dateRangeStart.getDate() + ' ' + months[this.dateRangeStart.getMonth()];
        document.getElementById('endDateDisplay').textContent = this.dateRangeEnd.getDate() + ' ' + months[this.dateRangeEnd.getMonth()];
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const startYear = currentYear - 2;
        
        for (let y = startYear; y <= currentYear; y++) {
            const endMonth = y === currentYear ? currentMonth : 11;
            for (let m = 0; m <= endMonth; m++) {
                const month = m;
                const year = y;
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDay = (firstDay.getDay() + 6) % 7;
            
            html += '<div class="dr-month"><div class="dr-month-name">' + months[month] + '</div>';
            html += '<div class="dr-weekdays">' + weekdays.map(d => '<div class="dr-weekday">' + d + '</div>').join('') + '</div>';
            html += '<div class="dr-days">';
            
            for (let i = 0; i < startDay; i++) html += '<div class="dr-day other"></div>';
            
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const d = new Date(year, month, day, 12, 0, 0);
                const startDay = new Date(this.dateRangeStart.getFullYear(), this.dateRangeStart.getMonth(), this.dateRangeStart.getDate());
                const endDay = new Date(this.dateRangeEnd.getFullYear(), this.dateRangeEnd.getMonth(), this.dateRangeEnd.getDate());
                const currentDay = new Date(year, month, day);
                const isFuture = currentDay > today;
                const isStart = currentDay.getTime() === startDay.getTime();
                const isEnd = currentDay.getTime() === endDay.getTime();
                const inRange = currentDay > startDay && currentDay < endDay;
                const cls = 'dr-day' + (isStart || isEnd ? ' selected' : '') + (inRange ? ' in-range' : '') + (isFuture ? ' disabled' : '');
                const onclick = isFuture ? '' : ' onclick="budgetTracker.selectDateRange(' + day + ',' + month + ',' + year + ')"';
                html += '<div class="' + cls + '"' + onclick + '>' + day + '</div>';
            }
            html += '</div></div>';
            }
        }
        container.innerHTML = html;
    }

    selectDateRange(day, month, year) {
        const date = new Date(year, month, day, 12, 0, 0);
        if (this.selectingStart) {
            this.dateRangeStart = date;
            this.dateRangeEnd = date;
            this.selectingStart = false;
        } else {
            if (date < this.dateRangeStart) {
                this.dateRangeEnd = this.dateRangeStart;
                this.dateRangeStart = date;
            } else {
                this.dateRangeEnd = date;
            }
            this.selectingStart = true;
        }
        this.renderDateRangeCalendars();
    }

    filterTransactions(type) {
        if (this.transactionFilter === type) {
            this.transactionFilter = '';
        } else {
            this.transactionFilter = type;
        }
        this.updateTransactionsPage();
        this.updateFilterButtonStyles();
    }

    updateFilterButtonStyles() {
        const incomeBtn = document.getElementById('filterIncomeBtn');
        const expenseBtn = document.getElementById('filterExpenseBtn');
        if (incomeBtn) {
            if (this.transactionFilter === 'income') {
                incomeBtn.style.opacity = '1';
                incomeBtn.style.transform = 'scale(1.05)';
            } else {
                incomeBtn.style.opacity = this.transactionFilter === 'expense' ? '0.5' : '1';
                incomeBtn.style.transform = 'scale(1)';
            }
        }
        if (expenseBtn) {
            if (this.transactionFilter === 'expense') {
                expenseBtn.style.opacity = '1';
                expenseBtn.style.transform = 'scale(1.05)';
            } else {
                expenseBtn.style.opacity = this.transactionFilter === 'income' ? '0.5' : '1';
                expenseBtn.style.transform = 'scale(1)';
            }
        }
    }

    getAllTransactionsInDateRange() {
        const f = document.getElementById('transactionDateFrom')?.value, d = document.getElementById('transactionDateTo')?.value;
        const all = [...this.data.expenses.map(e => ({...e, type: 'expense'})), ...this.data.income.map(i => ({...i, type: 'income'}))];
        return all.filter(tr => {
            if (f) {
                const fromDate = new Date(f);
                fromDate.setHours(0, 0, 0, 0);
                const trDate = new Date(tr.date);
                trDate.setHours(0, 0, 0, 0);
                if (trDate < fromDate) return false;
            }
            if (d) {
                const toDate = new Date(d);
                toDate.setHours(23, 59, 59, 999);
                const trDate = new Date(tr.date);
                if (trDate > toDate) return false;
            }
            return true;
        });
    }

    getFilteredTransactions() {
        const t = this.transactionFilter || '', f = document.getElementById('transactionDateFrom')?.value, d = document.getElementById('transactionDateTo')?.value;
        const searchText = document.getElementById('transactionSearchInput')?.value.toLowerCase() || '';
        const all = [...this.data.expenses.map(e => ({...e, type: 'expense'})), ...this.data.income.map(i => ({...i, type: 'income'}))];
        return all.filter(tr => {
            if (t && tr.type !== t) return false;
            if (searchText && !tr.category.toLowerCase().includes(searchText) && !(tr.description && tr.description.toLowerCase().includes(searchText))) return false;
            if (f) {
                const fromDate = new Date(f);
                fromDate.setHours(0, 0, 0, 0);
                const trDate = new Date(tr.date);
                trDate.setHours(0, 0, 0, 0);
                if (trDate < fromDate) return false;
            }
            if (d) {
                const toDate = new Date(d);
                toDate.setHours(23, 59, 59, 999);
                const trDate = new Date(tr.date);
                if (trDate > toDate) return false;
            }
            return true;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    toggleTransactionSearch() {
        const searchBox = document.getElementById('transactionSearchBox');
        const searchInput = document.getElementById('transactionSearchInput');
        if (searchBox.style.display === 'none') {
            searchBox.style.display = 'block';
            searchInput.focus();
        } else {
            searchBox.style.display = 'none';
            searchInput.value = '';
            this.updateTransactionsPage();
        }
    }



    updateSettings() {
        const b = document.getElementById('monthlyBudget'); if (b) b.value = this.data.monthlyBudget;
        this.updateCurrencyButtons();
        this.updateLanguageButtons();
        const expList = document.getElementById('expenseCategoriesList'); 
        if (expList) expList.innerHTML = this.data.categories.expense.map(c => {
            const iconHTML = this.getCategoryIconForGrid(c);
            return '<div class="category-item"><div class="category-icon-small">' + iconHTML + '</div><span class="category-name">' + c + '</span><div class="category-actions"><button class="edit-btn" onclick="budgetTracker.editCategory(\'expense\',\'' + c.replace(/'/g, "\\'") + '\')"><i class="fas fa-pen"></i></button><button class="remove-btn" onclick="budgetTracker.removeCategory(\'expense\',\'' + c.replace(/'/g, "\\'") + '\')"><i class="fas fa-times"></i></button></div></div>';
        }).join('');
        const incList = document.getElementById('incomeCategoriesList'); 
        if (incList) incList.innerHTML = this.data.categories.income.map(c => {
            const iconHTML = this.getCategoryIconForGrid(c);
            return '<div class="category-item"><div class="category-icon-small">' + iconHTML + '</div><span class="category-name">' + c + '</span><div class="category-actions"><button class="edit-btn" onclick="budgetTracker.editCategory(\'income\',\'' + c.replace(/'/g, "\\'") + '\')"><i class="fas fa-pen"></i></button><button class="remove-btn" onclick="budgetTracker.removeCategory(\'income\',\'' + c.replace(/'/g, "\\'") + '\')"><i class="fas fa-times"></i></button></div></div>';
        }).join('');
    }
    
    editCategory(type, name) {
        this.editingCategory = { type, name };
        document.getElementById('categoryType').value = type;
        document.getElementById('categoryName').value = name;
        const currentIcon = this.data.categoryIcons && this.data.categoryIcons[name] ? this.data.categoryIcons[name] : 'wallet';
        document.getElementById('selectedIcon').value = currentIcon;
        document.getElementById('addCategoryTitle').textContent = this.t('editCategory');
        this.showSection('addCategory');
        this.initIconPicker();
    }

    async removeCategory(type, name) { 
        if (!confirm(`${this.t('deleteConfirm')} "${name}"?`)) return;
        
        try {
            await fetch(this.apiBaseUrl + '/api/categories', { 
                method: 'DELETE', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ type, name }) 
            });
            
            this.data.categories[type] = this.data.categories[type].filter(c => c !== name);
            if (this.data.categoryIcons && this.data.categoryIcons[name]) {
                delete this.data.categoryIcons[name];
            }
            
            this.showMessage(this.t('categoryDeleted'), 'success');
            this.updateUI();
        } catch (e) {
            this.showMessage(this.t('errorDeletingCategory'), 'error');
        }
    }


    updateReports() { 
        this.initializeCharts(); 
        this.updateTopLists();
        this.updateCategoryCards();
    }

    initializeCharts() {
        const period = this.selectedReportPeriod || 6;
        const tc = document.getElementById('monthlyTrendsChart');
        const cc = document.getElementById('categoryAnalysisChart');
        const ic = document.getElementById('incomeCategoryChart');
        
        if (tc) { 
            if (this.charts.trends) this.charts.trends.destroy(); 
            this.charts.trends = new Chart(tc, { 
                type: 'line', 
                data: this.getMonthlyTrendsData(period), 
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { 
                        legend: { 
                            labels: { color: '#fff' } 
                        } 
                    }, 
                    scales: { 
                        x: { ticks: { color: '#888' }, grid: { color: '#3A3A3A' } }, 
                        y: { ticks: { color: '#888' }, grid: { color: '#3A3A3A' } } 
                    } 
                } 
            }); 
        }
        
        if (cc) { 
            if (this.charts.category) this.charts.category.destroy(); 
            this.charts.category = new Chart(cc, { 
                type: 'doughnut', 
                data: this.getCategoryData(period), 
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: { 
                        legend: { 
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return label + ': ' + percentage + '%';
                                }
                            }
                        },
                        datalabels: {
                            color: '#fff',
                            font: {
                                weight: 'bold',
                                size: 14
                            },
                            formatter: (value, ctx) => {
                                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return percentage + '%';
                            }
                        }
                    } 
                },
                plugins: [{
                    id: 'datalabels',
                    afterDatasetsDraw: function(chart) {
                        const ctx = chart.ctx;
                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            if (!meta.hidden) {
                                meta.data.forEach((element, index) => {
                                    const total = dataset.data.reduce((a, b) => a + b, 0);
                                    const percentageValue = (dataset.data[index] / total) * 100;
                                    
                                    // Only show percentage if >= 4%
                                    if (percentageValue >= 4) {
                                        ctx.fillStyle = '#fff';
                                        const fontSize = 13;
                                        const fontStyle = 'bold';
                                        const fontFamily = 'Inter';
                                        ctx.font = fontStyle + ' ' + fontSize + 'px ' + fontFamily;
                                        
                                        const percentage = percentageValue.toFixed(1) + '%';
                                        
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        
                                        const position = element.tooltipPosition();
                                        ctx.fillText(percentage, position.x, position.y);
                                    }
                                });
                            }
                        });
                    }
                }]
            }); 
        }
        
        if (ic) { 
            if (this.charts.incomeCategory) this.charts.incomeCategory.destroy(); 
            this.charts.incomeCategory = new Chart(ic, { 
                type: 'doughnut', 
                data: this.getIncomeCategoryData(period), 
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false,
                    cutout: '75%',
                    plugins: { 
                        legend: { 
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return label + ': ' + percentage + '%';
                                }
                            }
                        }
                    } 
                },
                plugins: [{
                    id: 'datalabels',
                    afterDatasetsDraw: function(chart) {
                        const ctx = chart.ctx;
                        chart.data.datasets.forEach((dataset, i) => {
                            const meta = chart.getDatasetMeta(i);
                            if (!meta.hidden) {
                                meta.data.forEach((element, index) => {
                                    const total = dataset.data.reduce((a, b) => a + b, 0);
                                    const percentageValue = (dataset.data[index] / total) * 100;
                                    
                                    // Only show percentage if >= 4%
                                    if (percentageValue >= 4) {
                                        ctx.fillStyle = '#fff';
                                        const fontSize = 13;
                                        const fontStyle = 'bold';
                                        const fontFamily = 'Inter';
                                        ctx.font = fontStyle + ' ' + fontSize + 'px ' + fontFamily;
                                        
                                        const percentage = percentageValue.toFixed(1) + '%';
                                        
                                        ctx.textAlign = 'center';
                                        ctx.textBaseline = 'middle';
                                        
                                        const position = element.tooltipPosition();
                                        ctx.fillText(percentage, position.x, position.y);
                                    }
                                });
                            }
                        });
                    }
                }]
            }); 
        }
    }

    getMonthlyTrendsData(months) {
        const now = new Date();
        const labels = [];
        const expData = [];
        const incData = [];
        
        // Handle week view (0.25 months = ~7 days)
        if (months < 1) {
            const daysToShow = 7;
            for (let i = daysToShow - 1; i >= 0; i--) {
                const d = new Date(now);
                d.setDate(d.getDate() - i);
                const dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                labels.push(dayLabel);
                
                const dayStr = d.toISOString().split('T')[0];
                const dayExp = this.data.expenses.filter(e => e.date === dayStr).reduce((sum, e) => sum + e.amount, 0);
                const dayInc = this.data.income.filter(i => i.date === dayStr).reduce((sum, i) => sum + i.amount, 0);
                
                expData.push(dayExp);
                incData.push(dayInc);
            }
        } else if (months === 1) {
            // Month view - show daily data for current month
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                labels.push(day);
                
                const dayExp = this.data.expenses.filter(e => e.date === dateStr).reduce((sum, e) => sum + e.amount, 0);
                const dayInc = this.data.income.filter(i => i.date === dateStr).reduce((sum, i) => sum + i.amount, 0);
                
                expData.push(dayExp);
                incData.push(dayInc);
            }
        } else {
            // Multi-month view - show monthly totals
            const monthsToShow = Math.ceil(months);
            for (let i = monthsToShow - 1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const monthName = d.toLocaleDateString('en-US', { month: 'short' });
                labels.push(monthName);
                
                const monthExp = this.data.expenses.filter(e => {
                    const ed = new Date(e.date);
                    return ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear();
                }).reduce((sum, e) => sum + e.amount, 0);
                
                const monthInc = this.data.income.filter(i => {
                    const id = new Date(i.date);
                    return id.getMonth() === d.getMonth() && id.getFullYear() === d.getFullYear();
                }).reduce((sum, i) => sum + i.amount, 0);
                
                expData.push(monthExp);
                incData.push(monthInc);
            }
        }
        
        return { 
            labels, 
            datasets: [
                { label: this.t('income'), data: incData, borderColor: '#04D38C', backgroundColor: 'rgba(4,211,140,0.1)', tension: 0.4, fill: true }, 
                { label: this.t('expenses'), data: expData, borderColor: '#FF6B6B', backgroundColor: 'rgba(255,107,107,0.1)', tension: 0.4, fill: true }
            ] 
        };
    }

    getCategoryData(months) {
        const now = new Date();
        let cutoffDate;
        if (months < 1) {
            // Week view
            cutoffDate = new Date(now);
            cutoffDate.setDate(cutoffDate.getDate() - 7);
        } else {
            cutoffDate = new Date(now.getFullYear(), now.getMonth() - months, 1);
        }
        
        const totals = {};
        this.data.expenses.filter(e => new Date(e.date) >= cutoffDate).forEach(e => {
            totals[e.category] = (totals[e.category] || 0) + e.amount;
        });
        
        const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6);
        return { 
            labels: sorted.map(s => s[0]), 
            datasets: [{ 
                data: sorted.map(s => s[1]), 
                backgroundColor: ['#A78BFA','#FCD34D','#34D399','#60A5FA','#F472B6','#D1D5DB'],
                borderWidth: 0,
                spacing: 3
            }] 
        };
    }

    getIncomeCategoryData(months) {
        const now = new Date();
        let cutoffDate;
        if (months < 1) {
            // Week view
            cutoffDate = new Date(now);
            cutoffDate.setDate(cutoffDate.getDate() - 7);
        } else {
            cutoffDate = new Date(now.getFullYear(), now.getMonth() - months, 1);
        }
        
        const totals = {};
        this.data.income.filter(i => new Date(i.date) >= cutoffDate).forEach(i => {
            totals[i.category] = (totals[i.category] || 0) + i.amount;
        });
        
        const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]).slice(0, 6);
        return { 
            labels: sorted.map(s => s[0]), 
            datasets: [{ 
                data: sorted.map(s => s[1]), 
                backgroundColor: ['#A78BFA','#FCD34D','#34D399','#60A5FA','#F472B6','#D1D5DB'],
                borderWidth: 0,
                spacing: 3
            }] 
        };
    }

    updateTopLists() {
        const period = this.selectedReportPeriod || 6;
        const now = new Date();
        let cutoffDate;
        if (period < 1) {
            // Week view
            cutoffDate = new Date(now);
            cutoffDate.setDate(cutoffDate.getDate() - 7);
        } else {
            cutoffDate = new Date(now.getFullYear(), now.getMonth() - period, 1);
        }
        
        // Top Expenses
        const filteredExpenses = this.data.expenses.filter(e => new Date(e.date) >= cutoffDate);
        const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
        const topExpenses = filteredExpenses
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);
        
        const expList = document.getElementById('topExpensesList');
        if (expList) {
            if (topExpenses.length === 0) {
                expList.innerHTML = '<div class="empty-list">' + this.t('noExpenses') + '</div>';
            } else {
                expList.innerHTML = topExpenses.map((e, i) => {
                    const percentage = totalExpenses > 0 ? ((e.amount / totalExpenses) * 100).toFixed(1) : 0;
                    return `
                    <div class="top-item">
                        <span class="top-rank">${i + 1}</span>
                        <div class="top-details">
                            <span class="top-category">${e.category}</span>
                            <span class="top-desc">${e.description || ''}</span>
                        </div>
                        <div class="top-amount-wrapper">
                            <span class="top-amount expense">${this.formatCurrency(e.amount)}</span>
                            <span class="top-percentage">${percentage}%</span>
                        </div>
                    </div>
                `}).join('');
            }
        }
        
        // Top Income
        const filteredIncome = this.data.income.filter(i => new Date(i.date) >= cutoffDate);
        const totalIncome = filteredIncome.reduce((sum, i) => sum + i.amount, 0);
        const topIncome = filteredIncome
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5);
        
        const incList = document.getElementById('topIncomeList');
        if (incList) {
            if (topIncome.length === 0) {
                incList.innerHTML = '<div class="empty-list">' + this.t('noIncome') + '</div>';
            } else {
                incList.innerHTML = topIncome.map((i, idx) => {
                    const percentage = totalIncome > 0 ? ((i.amount / totalIncome) * 100).toFixed(1) : 0;
                    return `
                    <div class="top-item">
                        <span class="top-rank">${idx + 1}</span>
                        <div class="top-details">
                            <span class="top-category">${i.category}</span>
                            <span class="top-desc">${i.description || ''}</span>
                        </div>
                        <div class="top-amount-wrapper">
                            <span class="top-amount income">${this.formatCurrency(i.amount)}</span>
                            <span class="top-percentage">${percentage}%</span>
                        </div>
                    </div>
                `}).join('');
            }
        }
    }

    updateCategoryCards() {
        const period = this.selectedReportPeriod || 6;
        const now = new Date();
        let cutoffDate;
        if (period < 1) {
            cutoffDate = new Date(now);
            cutoffDate.setDate(cutoffDate.getDate() - 7);
        } else {
            cutoffDate = new Date(now.getFullYear(), now.getMonth() - period, 1);
        }
        
        const colors = ['#A78BFA','#FCD34D','#34D399','#60A5FA','#F472B6','#D1D5DB'];
        
        // Expense category cards
        const expenseTotals = {};
        this.data.expenses.filter(e => new Date(e.date) >= cutoffDate).forEach(e => {
            expenseTotals[e.category] = (expenseTotals[e.category] || 0) + e.amount;
        });
        const sortedExpenses = Object.entries(expenseTotals).sort((a, b) => b[1] - a[1]).slice(0, 6);
        
        const expenseCardsEl = document.getElementById('expenseCategoryCards');
        if (expenseCardsEl) {
            expenseCardsEl.innerHTML = sortedExpenses.map((item, i) => {
                const [category, amount] = item;
                const color = colors[i % colors.length];
                return `
                    <div class="category-card">
                        <div class="category-icon" style="background: ${color}20; color: ${color};">
                            ${this.getCategoryIcon(category)}
                        </div>
                        <div class="category-info">
                            <span class="category-name">${category}</span>
                            <span class="category-amount">${this.formatCurrency(amount)}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        // Income category cards
        const incomeTotals = {};
        this.data.income.filter(i => new Date(i.date) >= cutoffDate).forEach(i => {
            incomeTotals[i.category] = (incomeTotals[i.category] || 0) + i.amount;
        });
        const sortedIncome = Object.entries(incomeTotals).sort((a, b) => b[1] - a[1]).slice(0, 6);
        
        const incomeCardsEl = document.getElementById('incomeCategoryCards');
        if (incomeCardsEl) {
            incomeCardsEl.innerHTML = sortedIncome.map((item, i) => {
                const [category, amount] = item;
                const color = colors[i % colors.length];
                return `
                    <div class="category-card">
                        <div class="category-icon" style="background: ${color}20; color: ${color};">
                            ${this.getCategoryIcon(category)}
                        </div>
                        <div class="category-info">
                            <span class="category-name">${category}</span>
                            <span class="category-amount">${this.formatCurrency(amount)}</span>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    generateReports() { 
        this.initializeCharts(); 
        this.updateTopLists();
        this.updateCategoryCards();
    }


    formatCurrency(amt, showSign = false) { 
        const isNegative = amt < 0;
        const num = Math.abs(amt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (showSign && isNegative) {
            return '-' + this.currency + num;
        }
        return this.currency + num;
    }
    
    setCurrency(currency) {
        this.currency = currency;
        localStorage.setItem('currency', currency);
        document.querySelectorAll('.currency-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.currency === currency);
        });
        this.updateUI();
    }
    
    updateCurrencyButtons() {
        document.querySelectorAll('.currency-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.currency === this.currency);
        });
    }
    
    formatDate(d) { 
        const date = new Date(d);
        const months = this.t('months');
        return `${date.getDate()} ${months[date.getMonth()].substring(0, 3)}`;
    }

    showMessage(text, type) {
        const existing = document.querySelector('.message'); if (existing) existing.remove();
        const msg = document.createElement('div'); msg.className = 'message ' + type; msg.textContent = text;
        document.body.appendChild(msg); setTimeout(() => msg.remove(), 3000);
    }



    attachSwipeHandlers() {
        // Swipe-to-delete disabled - was causing accidental deletions
        // Transactions can be deleted from the edit screen instead
    }

    setPresetDate(type, days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        
        const inputId = type === 'expense' ? 'expenseDate' : 'incomeDate';
        const displayId = type === 'expense' ? 'expenseDateDisplay' : 'incomeDateDisplay';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        document.getElementById(inputId).value = `${year}-${month}-${day}`;
        document.getElementById(displayId).textContent = this.formatDateDisplay(date);
    }

    initSingleDatePicker() {
        this.selectedSingleDate = new Date();
        this.singleDateType = null;
    }

    openSingleDatePicker(type) {
        this.singleDateType = type;
        const inputId = type === 'expense' ? 'expenseDate' : 'incomeDate';
        const currentValue = document.getElementById(inputId).value;
        
        if (currentValue) {
            this.selectedSingleDate = new Date(currentValue + 'T00:00:00');
        } else {
            this.selectedSingleDate = new Date();
        }
        
        document.getElementById('singleDateModal').classList.add('active');
        this.updateSingleDateDisplay();
        this.renderSingleDateCalendar();
    }

    closeSingleDatePicker() {
        if (this.selectedSingleDate && this.singleDateType) {
            const inputId = this.singleDateType === 'expense' ? 'expenseDate' : 'incomeDate';
            const displayId = this.singleDateType === 'expense' ? 'expenseDateDisplay' : 'incomeDateDisplay';
            
            const year = this.selectedSingleDate.getFullYear();
            const month = String(this.selectedSingleDate.getMonth() + 1).padStart(2, '0');
            const day = String(this.selectedSingleDate.getDate()).padStart(2, '0');
            
            document.getElementById(inputId).value = `${year}-${month}-${day}`;
            document.getElementById(displayId).textContent = this.formatDateDisplay(this.selectedSingleDate);
        }
        document.getElementById('singleDateModal').classList.remove('active');
    }

    cancelSingleDatePicker() {
        document.getElementById('singleDateModal').classList.remove('active');
    }

    updateSingleDateDisplay() {
        document.getElementById('singleDateDisplay').textContent = this.formatDateDisplay(this.selectedSingleDate);
    }

    formatDateDisplay(date) {
        const months = this.t('months');
        return `${date.getDate()} ${months[date.getMonth()]}`;
    }

    renderSingleDateCalendar() {
        const container = document.getElementById('singleDateCalendar');
        const months = this.t('months');
        const weekdays = this.t('weekdays');
        
        let html = '';
        const today = new Date();
        const currentMonth = this.selectedSingleDate.getMonth();
        const currentYear = this.selectedSingleDate.getFullYear();
        
        for (let monthOffset = -1; monthOffset <= 2; monthOffset++) {
            const date = new Date(currentYear, currentMonth + monthOffset, 1);
            const year = date.getFullYear();
            const month = date.getMonth();
            
            html += `<div class="dr-month">`;
            html += `<span class="dr-month-name">${months[month]} ${year}</span>`;
            html += `<div class="dr-weekdays">`;
            weekdays.forEach(day => html += `<div class="dr-weekday">${day}</div>`);
            html += `</div><div class="dr-days">`;
            
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
            
            const prevMonthDays = new Date(year, month, 0).getDate();
            for (let i = adjustedFirstDay - 1; i >= 0; i--) {
                html += `<div class="dr-day other">${prevMonthDays - i}</div>`;
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDate = new Date(year, month, day);
                const isSelected = this.selectedSingleDate && 
                    dayDate.toDateString() === this.selectedSingleDate.toDateString();
                const isToday = dayDate.toDateString() === today.toDateString();
                
                let classes = 'dr-day';
                if (isSelected) classes += ' selected';
                if (isToday && !isSelected) classes += ' today';
                
                html += `<div class="${classes}" data-date="${year}-${month}-${day}">${day}</div>`;
            }
            
            const remainingDays = 42 - (adjustedFirstDay + daysInMonth);
            for (let i = 1; i <= remainingDays; i++) {
                html += `<div class="dr-day other">${i}</div>`;
            }
            
            html += `</div></div>`;
        }
        
        container.innerHTML = html;
        
        container.querySelectorAll('.dr-day:not(.other)').forEach(day => {
            day.addEventListener('click', () => {
                const [year, month, dayNum] = day.dataset.date.split('-').map(Number);
                this.selectedSingleDate = new Date(year, month, dayNum);
                this.updateSingleDateDisplay();
                this.renderSingleDateCalendar();
            });
        });
    }

}

// Don't instantiate here - let the adapter modify the prototype first
// The adapter or a separate script will create the instance
