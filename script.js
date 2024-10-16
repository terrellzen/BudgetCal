// Object to hold budget data
let budgetData = {};

// Function to calculate budget based on user inputs
function calculateBudget() {
    // Get values from input fields, defaulting to 0 if empty
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const electric = parseFloat(document.getElementById('electric').value) || 0;
    const internet = parseFloat(document.getElementById('internet').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const groceries = parseFloat(document.getElementById('groceries').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const others = parseFloat(document.getElementById('others').value) || 0;
    const income = parseFloat(document.getElementById('income').value) || 0;

    // Calculate total expenses and remaining income
    const totalExpenses = rent + electric + internet + utilities + groceries + gas + others;
    const remainingIncome = income - totalExpenses;

    // Calculate percentages
    const percentageUsed = (totalExpenses / income) * 100 || 0;
    const percentageLeft = (remainingIncome / income) * 100 || 0;
    const percentageRentUsed = (rent / income) * 100 || 0; // Percentage of income used for rent

    // Store data in the budgetData object
    budgetData = {
        rent,
        electric,
        internet,
        utilities,
        groceries,
        gas,
        others,
        income,
        totalExpenses,
        remainingIncome,
        percentageUsed,
        percentageLeft,
        percentageRentUsed
    };

    // Display results in the result div
    const resultAlert = document.getElementById('resultAlert');
    resultAlert.innerHTML = `
        Total Expenses: $${totalExpenses.toFixed(2)}<br>
        Remaining Income: $${remainingIncome.toFixed(2)}<br>
        Percentage of Income Used: ${percentageUsed.toFixed(2)}% ($${totalExpenses.toFixed(2)})<br>
        Percentage of Income Left: ${percentageLeft.toFixed(2)}% ($${remainingIncome.toFixed(2)})<br>
        Percentage of Income Used for Rent: ${percentageRentUsed.toFixed(2)}% ($${rent.toFixed(2)})
    `;
    resultAlert.style.display = 'block'; // Show the alert

    // Show both save buttons
    document.getElementById('savePdfBtn').style.display = 'inline-block';
    document.getElementById('saveJsonBtn').style.display = 'inline-block';
}

// Event handler to save the budget data as a PDF
document.getElementById('savePdfBtn').onclick = function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Monthly Budget Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Rent: $${budgetData.rent.toFixed(2)}`, 20, 30);
    doc.text(`Electric: $${budgetData.electric.toFixed(2)}`, 20, 40);
    doc.text(`Internet: $${budgetData.internet.toFixed(2)}`, 20, 50);
    doc.text(`Utilities: $${budgetData.utilities.toFixed(2)}`, 20, 60);
    doc.text(`Groceries: $${budgetData.groceries.toFixed(2)}`, 20, 70);
    doc.text(`Gas: $${budgetData.gas.toFixed(2)}`, 20, 80);
    doc.text(`Others: $${budgetData.others.toFixed(2)}`, 20, 90);
    doc.text(`Income: $${budgetData.income.toFixed(2)}`, 20, 100);
    doc.text(`Total Expenses: $${budgetData.totalExpenses.toFixed(2)}`, 20, 110);
    doc.text(`Remaining Income: $${budgetData.remainingIncome.toFixed(2)}`, 20, 120);
    doc.text(`Percentage of Income Used: ${budgetData.percentageUsed.toFixed(2)}%`, 20, 130);
    doc.text(`Percentage of Income Left: ${budgetData.percentageLeft.toFixed(2)}%`, 20, 140);
    doc.text(`Percentage of Income Used for Rent: ${budgetData.percentageRentUsed.toFixed(2)}%`, 20, 150);

    // Save the PDF
    doc.save('budget_report.pdf');
};

// Event handler to save the budget data as a JSON file
document.getElementById('saveJsonBtn').onclick = function() {
    // Convert budget data object to JSON string
    const json = JSON.stringify(budgetData, null, 2);
    // Create a Blob from the JSON string
    const blob = new Blob([json], { type: 'application/json' });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'budget_data.json'; // File name for the downloaded file
    a.click(); // Simulate a click to download the file
    URL.revokeObjectURL(url); // Clean up the URL object
};
