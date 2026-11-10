// =================================
// 1. VARIABLES AND ARRAYS
// =================================

let totalBudget = 0;

// Store multiple expenses in an array
let expenses = [];

// Get HTML elements
const budgetForm = document.getElementById("budgetForm");
const expenseForm = document.getElementById("expenseForm");

const budgetInput = document.getElementById("budgetInput");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");

const totalBudgetDisplay = document.getElementById("totalBudget");
const totalExpensesDisplay = document.getElementById("totalExpenses");
const remainingBalanceDisplay = document.getElementById("remainingBalance");

const expenseList = document.getElementById("expenseList");
const feedback = document.getElementById("feedback");


// =================================
// 2. SET THE BUDGET
// =================================

budgetForm.addEventListener("submit", function(event) {

	event.preventDefault();

	const budget = Number(budgetInput.value);

	if (budget <= 0 || !Number.isFinite(budget)) {
		feedback.textContent = "Please enter a valid budget.";
		return;
	}

	totalBudget = budget;

	updateDashboard();

	feedback.textContent = "Budget successfully updated!";

	budgetForm.reset();
});


// =================================
// 3. ADD EXPENSES USING ARRAYS
// =================================

expenseForm.addEventListener("submit", function(event) {

	event.preventDefault();

	const name = expenseName.value.trim();
	const amount = Number(expenseAmount.value);
	const category = expenseCategory.value;
	const date = expenseDate.value;

	// Validate expense information
	if (
		name === "" ||
		amount <= 0 ||
		!Number.isFinite(amount) ||
		category === "" ||
		date === ""
	) {
		feedback.textContent = "Please enter valid expense details.";
		return;
	}

	// Calculate current expenses
	let currentTotal = 0;

	for (let i = 0; i < expenses.length; i++) {
		currentTotal += expenses[i].amount;
	}

	// Decision making
	if (currentTotal + amount > totalBudget) {
		feedback.textContent =
			"Warning: This expense exceeds your remaining budget!";
		return;
	}

	// Create a new expense object
	const newExpense = {
		name: name,
		amount: amount,
		category: category,
		date: date
	};

	// Add expense to array
	expenses.push(newExpense);

	feedback.textContent = "Expense added successfully!";

	expenseForm.reset();

	// Refresh dashboard
	updateDashboard();
});


// =================================
// 4. UPDATE DASHBOARD
// =================================

function updateDashboard() {

	let totalExpenses = 0;

	// Loop through expenses
	for (let i = 0; i < expenses.length; i++) {
		totalExpenses += expenses[i].amount;
	}

	// Calculate remaining balance
	const remainingBalance = totalBudget - totalExpenses;

	// Update dashboard values
	totalBudgetDisplay.textContent =
		"KSh " + totalBudget.toFixed(2);

	totalExpensesDisplay.textContent =
		"KSh " + totalExpenses.toFixed(2);

	remainingBalanceDisplay.textContent =
		"KSh " + remainingBalance.toFixed(2);

	// Display budget feedback
	if (totalBudget === 0) {
		feedback.textContent = "Please set your budget first.";
	} else if (remainingBalance === 0) {
		feedback.textContent = "You have used your entire budget.";
	} else if (remainingBalance < totalBudget * 0.2) {
		feedback.textContent = "Warning: Your remaining budget is low!";
	}

	// Display expense records
	displayExpenses();
}


// =================================
// 5. DISPLAY EXPENSES USING LOOPS
// =================================

function displayExpenses() {

	// Clear previous records
	expenseList.innerHTML = "";

	// Loop through the expense array
	for (let i = 0; i < expenses.length; i++) {

		const expense = expenses[i];

		const row = document.createElement("tr");

		const nameCell = document.createElement("td");
		nameCell.textContent = expense.name;

		const amountCell = document.createElement("td");
		amountCell.textContent =
			"KSh " + expense.amount.toFixed(2);

		const categoryCell = document.createElement("td");
		categoryCell.textContent = expense.category;

		const dateCell = document.createElement("td");
		dateCell.textContent = expense.date;

		const actionCell = document.createElement("td");

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Delete";

		// Delete expense using an event listener
		deleteButton.addEventListener("click", function() {

			expenses.splice(i, 1);

			feedback.textContent = "Expense deleted successfully!";

			updateDashboard();
		});

		actionCell.appendChild(deleteButton);

		row.appendChild(nameCell);
		row.appendChild(amountCell);
		row.appendChild(categoryCell);
		row.appendChild(dateCell);
		row.appendChild(actionCell);

		expenseList.appendChild(row);
	}
}


// =================================
// 6. INITIAL DASHBOARD DISPLAY
// =================================

updateDashboard();
