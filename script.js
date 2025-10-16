const today = moment();
const targetDate = moment("20-12-2025", "DD-MM-YYYY");
const difference = targetDate.diff(today, "days");

document.querySelector(".date").textContent = `${difference} days left.`;
