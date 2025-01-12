let expensesByDate = {}; // Object to store expenses by date

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const calendar = document.getElementById('calendar');
const expenseTables = document.getElementById('expense-tables');
const showExpensesBtn = document.getElementById('show-expenses-btn');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (!category || isNaN(amount) || amount <= 0 || !date) {
        alert('Please fill in all fields correctly');
        return;
    }

    if (!expensesByDate[date]) {
        expensesByDate[date] = [];
    }

    const expense = { category, amount };
    expensesByDate[date].push(expense);

    amountInput.value = '';
    dateInput.value = '';

    showExpenses(date);
});

showExpensesBtn.addEventListener('click', function() {
    const selectedDate = calendar.value;
    if (selectedDate) {
        showExpenses(selectedDate);
    } else {
        alert('Please select a date first');
    }
});

function showExpenses(date) {
    if (!expensesByDate[date]) {
        expenseTables.innerHTML = `<p>No expenses found for ${date}</p>`;
        return;
    }

    let tableHTML = `<h3>Expenses for ${date}</h3>
        <table>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

    let total = 0;
    expensesByDate[date].forEach((expense, index) => {
        tableHTML += `
            <tr>
                <td>${expense.category}</td>
                <td>${expense.amount}</td>
                <td><button onclick="deleteExpense('${date}', ${index})">Delete</button></td>
            </tr>`;
        total += expense.amount;
    });

    tableHTML += `
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>${total}</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>`;

    expenseTables.innerHTML = tableHTML;
}

function deleteExpense(date, index) {
    expensesByDate[date].splice(index, 1);
    showExpenses(date);
}
