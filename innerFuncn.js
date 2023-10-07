let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    
        const expenseForm = document.getElementById('expense-form');
        const expenseList = document.getElementById('expense-list');
    
        function renderExpenses() {
            expenseList.innerHTML = '';
            expenses.forEach((expense, index) => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `
                    ${expense.description}: ${expense.amount} (${expense.category})
                    <button class="btn btn-secondary btn-sm float-right" onclick="deleteExpense(${index})">Delete</button>
                    <button class="btn btn-secondary btn-sm float-right mr-2" onclick="editExpense(${index})">Edit</button>
                `;
                expenseList.appendChild(li);
            });
        }
    
        function addExpense(e) {
            e.preventDefault();
            const amount = document.getElementById('amount').value;
            const description = document.getElementById('description').value;
            const category = document.getElementById('category').value;
            expenses.push({ amount, description, category });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            expenseForm.reset();
        }
    
        function editExpense(index) {
            const expense = expenses[index];
            document.getElementById('amount').value = expense.amount;
            document.getElementById('description').value = expense.description;
            document.getElementById('category').value = expense.category;
            deleteExpense(index);
        }
    
        function deleteExpense(index) {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        }
    
        expenseForm.addEventListener('submit', addExpense);
        renderExpenses();