// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function (e) {
  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Show loader
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate results
function calculateResults() {
  console.log('Calculating...');

  // UI vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // show results after calculations
    document.querySelector('#results').style.display = 'block';

    // hide the loading spinner again
    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

function showError(message) {
  // Hide results
  document.querySelector('#results').style.display = 'none';

  // Hide loader
  document.querySelector('#loading').style.display = 'none';

  // create a div
  const errorDiv = document.createElement('div');

  // get UI elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // add bootstrap classes
  errorDiv.className = 'alert alert-danger';

  // place the div in the DOM
  card.insertBefore(errorDiv, heading);

  // add text
  errorDiv.appendChild(document.createTextNode(message));

  // clear error after 3 seconds
  setTimeout(clearError, 3000);


}

function clearError() {
  document.querySelector('.alert').remove();
}