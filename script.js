// Get DOM elements
const assetNameInput = document.getElementById('assetName');
const amountInvestedInput = document.getElementById('amountInvested');
const currentValueInput = document.getElementById('currentValue');
const investmentList = document.getElementById('investmentList');
const totalValueDisplay = document.getElementById('totalValue');

let investments = [];

// Add new investment
document.getElementById('addInvestmentBtn').addEventListener('click', addInvestment);

function addInvestment() {
  const assetName = assetNameInput.value;
  const amountInvested = parseFloat(amountInvestedInput.value);
  const currentValue = parseFloat(currentValueInput.value);

  if (assetName && !isNaN(amountInvested) && !isNaN(currentValue)) {
    const investment = { assetName, amountInvested, currentValue };
    investments.push(investment);
    updateInvestmentList();
    updateTotalValue();
    updateChart();
    clearForm();
  } else {
    alert('Please fill all fields correctly.');
  }
}

// Update the investment list
function updateInvestmentList() {
  investmentList.innerHTML = ''; // Clear current list

  investments.forEach((investment, index) => {
    const percentageChange = ((investment.currentValue - investment.amountInvested) / investment.amountInvested * 100).toFixed(2);
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${investment.assetName}</td>
      <td>$${investment.amountInvested}</td>
      <td>$${investment.currentValue}</td>
      <td>${percentageChange}%</td>
      <td>
        <button onclick="removeInvestment(${index})">Remove</button>
      </td>
    `;

    investmentList.appendChild(row);
  });
}

// Remove an investment
function removeInvestment(index) {
  investments.splice(index, 1);
  updateInvestmentList();
  updateTotalValue();
  updateChart();
}

// Update total portfolio value
function updateTotalValue() {
  const totalValue = investments.reduce((sum, investment) => sum + investment.currentValue, 0);
  totalValueDisplay.textContent = totalValue.toFixed(2);
}

// Clear form after adding investment
function clearForm() {
  assetNameInput.value = '';
  amountInvestedInput.value = '';
  currentValueInput.value = '';
}

// Update Pie Chart
let portfolioChart = new Chart(document.getElementById('portfolioChart'), {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
    }]
  },
  options: {
    responsive: true
  }
});

function updateChart() {
  const labels = investments.map(investment => investment.assetName);
  const data = investments.map(investment => investment.currentValue);

  portfolioChart.data.labels = labels;
  portfolioChart.data.datasets[0].data = data;
  portfolioChart.update();
}
