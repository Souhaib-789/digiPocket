//COMMENTED CODE NOT FOR USE

//   // Sample income and expense arrays
// const incomeArray = [
//   { amount: "100000", category: "Salary", transaction_date: "August 14 23" },
//   { amount: "5000", category: "Grants", transaction_date: "January 1 23" },
//   // ... more income transactions
// ];

// const expenseArray = [
//   { amount: "5000", category: "Groceries", transaction_date: "August 14 23" },
//   { amount: "2000", category: "Entertainment", transaction_date: "January 1 23" },
//   // ... more expense transactions
// ];

// // Create a function to parse the transaction_date into month names
// const getMonthName = (dateString) => {
//   const date = new Date(dateString);
//   const monthNames = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
//   return monthNames[date.getMonth()];
// };

// // Combine income and expense arrays, and create the data for the bar graph
// const combinedArray = [...incomeArray, ...expenseArray];
// const dataForBarGraph = [];


// const calculate = () => {

//   const months = [];
//   combinedArray.forEach(item => {
//     const monthName = getMonthName(item.transaction_date);
//     if (!months.includes(monthName)) {
//       months.push(monthName);
//     }
//   });
  
//   months.forEach(month => {
//   const incomeCount = incomeArray.filter(item => getMonthName(item.transaction_date) === month).length;
//   const expenseCount = expenseArray.filter(item => getMonthName(item.transaction_date) === month).length;

//   dataForBarGraph.push({
//     value: incomeCount,
//     label: month,
//     frontColor: Colors.PRIMARY_COLOR,
//   });

//   dataForBarGraph.push({
//     value: expenseCount,
//     label: month,
//     frontColor: Colors.LLGREY,
//   });
// });
// console.log('0000' , dataForBarGraph);

// }


  // const transactionsByMonth = incomes.map(expense => ({
  //   ...incomes,
  //   transactionMonth: new Date(incomes.transaction_date).getMonth(),
  // }));
  
  // const incomeByMonth = transactionsByMonth.reduce((result, expense) => {
  //   const month = expense.transactionMonth;
  //   if (!result[month]) {
  //     result[month] = [];
  //   }
  //   result[month].push(expense);
  //   return result;
  // }, {});
  
  // const expensesCountByMonth = Object.keys(incomeByMonth).map(month => ({
  //   label: month, // Convert month back to integer (0-11)
  //   value: incomeByMonth[month].length,
  //   labelWidth: 30,
  //   frontColor: Colors.PRIMARY_COLOR,
  // }));
  // console.log(expensesCountByMonth);