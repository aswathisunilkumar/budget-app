(function () {
  //helper method to get elements by ID
  const getElement = document.getElementById.bind(document);
  //variables/elements to be used
  const amountCredit = getElement("amount-credit");
  const amountDebit = getElement("amount-debit");
  const remAmount = getElement("rem-amount");
  const remPercentage = getElement("rem-percentage");
  const expenseAmount = getElement("expense-amount");
  const expensePercentage = getElement("expense-percentage");
  const budgetInfoList = getElement("budget-info-list");
  const description = getElement("description");
  const message = getElement("message");
  let balance = 0;
  let expense = 0;
  const transaction = {
    mode: String,
    amount: Number,
    description: String,
  };
  // Helper methods
  function getPercentage() {
    //to calculate percentage of amount and expense
    return (balance * 100) / (Math.abs(balance) + Math.abs(expense)); //balance will hold the rem amount in both cases
  }
  function printMessage(percentage) {
    if (percentage >= 50) {
      message.innerHTML = "Super saver!";
    } else if (percentage >= 30) {
      message.innerHTML = "Saver!";
    } else if (percentage >= 15) {
      message.innerHTML = "You have to watch on your expenses!";
    } else {
      message.innerHTML =
        "Don't worry, A hungry stomach and an empty pocket will teach you the best life lesson!";
    }
  }
  function addToList(transaction) {
    const div = document.createElement("div");
    div.classList.add("expense-item");
    div.innerHTML = `
          <h2>${transaction.mode}: ${transaction.amount} </h2>
          <h2>Description: ${transaction.description}</h2> `;
    budgetInfoList.appendChild(div);
  }
  //events used
  // when amount is credited
  amountCredit.addEventListener("click", (e) => {
    e.preventDefault();
    const cash = document.getElementById("amount");
    let percentage;
    balance = balance + parseInt(cash.value);
    remAmount.innerHTML = balance;
    transaction.mode = "Credit";
    transaction.amount = cash.value;
    transaction.description = description.value;
    percentage = getPercentage();
    remPercentage.innerHTML = percentage + "%";
    expensePercentage.innerHTML = 100 - percentage + "%";
    printMessage(percentage);
    addToList(transaction);
  });
  // when amount is debited
  amountDebit.addEventListener("click", (e) => {
    e.preventDefault();
    const cash = document.getElementById("amount");
    let percentage;
    balance = balance - parseInt(cash.value);
    expense = expense + parseInt(cash.value);
    expenseAmount.innerHTML = expense;
    remAmount.innerHTML = balance;
    transaction.mode = "Debit";
    transaction.amount = cash.value;
    transaction.description = description.value;
    percentage = getPercentage();
    remPercentage.innerHTML = percentage + "%";
    expensePercentage.innerHTML = 100 - percentage + "%";
    printMessage(percentage);
    addToList(transaction);
  });
})();