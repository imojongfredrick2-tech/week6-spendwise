// ======================================
// SPENDWISE BUDGET TRACKER
// ======================================

// 1. VARIABLES AND ARRAYS

let budget = 0;

// Store multiple expenses in an array
let expenses = [];


// 2. SELECT HTML ELEMENTS

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const expenseDate = document.getElementById("expenseDate");

const totalBudget = document.getElementById("totalBudget");
const totalExpenses = document.getElementById("totalExpenses");
const remainingBalance = document.getElementById("remainingBalance");

const expenseTableBody = document.getElementById("expenseTableBody");
const budgetMessage = document.getElementById("budgetMessage");


// 3. FORMAT CURRENCY

function formatCurrency(amount) {
	return "KSh " + amount.toFixed(2);
}


// 4. SET BUDGET USING EVENT LISTENER

budgetForm.addEventListener("submit", function(event) {

	event.preventDefault();

	const enteredBudget = Number(budgetInput.value);

	if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {
		alert("Please enter a valid budget.");
		return;
	}

	budget = enteredBudget;

	updateDashboard();

	budgetMessage.textContent = "Your budget has been updated successfully.";

	budgetForm.reset();
});


// 5. ADD EXPENSE USING AN ARRAY

expenseForm.addEventListener("submit", function(event) {

	event.preventDefault();

	const name = expenseName.value.trim();
	const amount = Number(expenseAmount.value);
	const category = expenseCategory.value;
	const date = expenseDate.value;

	// Validate user input
	if (
		name === "" ||
		!Number.isFinite(amount) ||
		amount <= 0 ||
		category === "" ||
		date === ""
	) {
		alert("Please fill in all fields correctly.");
		return;
	}

	// Create an expense object
	const newExpense = {
		name: name,
		amount: amount,
		category: category,
		date: date
	};

	// Store expense in the array
	expenses.push(newExpense);

	// Update dashboard
	updateDashboard();

	// Clear form
	expenseForm.reset();

});


// 6. CALCULATE TOTAL EXPENSES USING A LOOP

function calculateTotalExpenses() {

	let total = 0;

	for (let i = 0; i < expenses.length; i++) {

		total += expenses[i].amount;

	}

	return total;
}


// 7. UPDATE DASHBOARD DYNAMICALLY

function updateDashboard() {

	const total = calculateTotalExpenses();

	const remaining = budget - total;

	// Update dashboard figures
	totalBudget.textContent = formatCurrency(budget);

	totalExpenses.textContent = formatCurrency(total);

	remainingBalance.textContent = formatCurrency(remaining);


	// 8. CONDITIONAL STATEMENTS

	if (budget === 0) {

		budgetMessage.textContent =
			"Please set your budget to get started.";

	} else if (remaining < 0) {

		budgetMessage.textContent =
			"Warning! You have exceeded your budget.";

	} else if (remaining === 0) {

		budgetMessage.textContent =
			"You have used your entire budget.";

	} else if (total >= budget * 0.8) {

		budgetMessage.textContent =
			"Warning! You have used 80% or more of your budget.";

	} else {

		budgetMessage.textContent =
			"Great! You are managing your budget well.";

	}

	// Display expense records
	displayExpenses();

}


// 9. DISPLAY EXPENSES USING A LOOP AND DOM

function displayExpenses() {

	// Clear existing table records
	expenseTableBody.innerHTML = "";

	// Check if there are expenses
	if (expenses.length === 0) {

		const row = document.createElement("tr");
		const cell = document.createElement("td");

		cell.colSpan = 5;
		cell.textContent = "No expenses yet.";

		row.appendChild(cell);
		expenseTableBody.appendChild(row);

		return;
	}

	// Loop through all expense records
	for (let i = 0; i < expenses.length; i++) {

		const expense = expenses[i];

		const row = document.createElement("tr");

		const nameCell = document.createElement("td");
		const amountCell = document.createElement("td");
		const categoryCell = document.createElement("td");
		const dateCell = document.createElement("td");
		const actionCell = document.createElement("td");

		nameCell.textContent = expense.name;
		amountCell.textContent = formatCurrency(expense.amount);
		categoryCell.textContent = expense.category;
		dateCell.textContent = expense.date;

		// Create delete button
		const deleteButton = document.createElement("button");

		deleteButton.textContent = "Delete";
		deleteButton.type = "button";
		deleteButton.dataset.index = i;
		deleteButton.className = "delete-btn";

		actionCell.appendChild(deleteButton);

		row.appendChild(nameCell);
		row.appendChild(amountCell);
		row.appendChild(categoryCell);
		row.appendChild(dateCell);
		row.appendChild(actionCell);

		expenseTableBody.appendChild(row);

	}

}


// 10. DELETE EXPENSE USING EVENT DELEGATION

expenseTableBody.addEventListener("click", function(event) {

	if (event.target.classList.contains("delete-btn")) {

		const index = Number(event.target.dataset.index);

		expenses.splice(index, 1);

		updateDashboard();

	}

});


// 11. INITIAL DASHBOARD DISPLAY

updateDashboard();
