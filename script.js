const weeksUntil = document.querySelector('.weeks.until');
const monthsUntil = document.querySelector('.month.until');
const daysUntil = document.querySelector('.days.until');
const numberDateUntil = document.querySelector(".number_date.until");

const weeksFrom = document.querySelector('.weeks.from');
const monthsFrom = document.querySelector('.month.from');
const daysFrom = document.querySelector('.days.from');
const numberDateFrom = document.querySelector(".number_date.from");

const settings_button = document.querySelector(".settings");
const inputDate = document.querySelector("#date");
const saveButton = document.querySelector(".save-btn");
const notificationCard = document.querySelector(".notificationCard");
const datesTargets = document.querySelectorAll(".date");
const AllowBtn = document.querySelector(".AllowBtn");

let targetDate = moment("20-12-2025", "DD-MM-YYYY");
let fromDate = moment("29-08-2025", "DD-MM-YYYY");

function updateCountdown() {
  const today = moment();

  // Hasta (future)
  const diffUntil = targetDate.diff(today, "days");
  numberDateUntil.textContent = targetDate.format("MMMM D, YYYY");
  daysUntil.textContent = `${diffUntil} days left.`;
  weeksUntil.textContent = `${(diffUntil / 7).toFixed(2)} Weeks`;
  monthsUntil.textContent = `${(diffUntil / 30).toFixed(2)} Months`;

  // Desde (past)
  const diffFrom = today.diff(fromDate, "days");
  numberDateFrom.textContent = fromDate.format("MMMM D, YYYY");
  daysFrom.textContent = `${diffFrom} days since.`;
  weeksFrom.textContent = `${(diffFrom / 7).toFixed(2)} Weeks`;
  monthsFrom.textContent = `${(diffFrom / 30).toFixed(2)} Months`;
}

function showInfoCard(message) {
  notificationCard.style.display = "flex";
  notificationCard.querySelector(".notificationPara").textContent = message;
}

function hideInfoCard() {
  notificationCard.style.display = "none";
}

function hideElement(element) {
  if (!element) return;
  element.classList.remove("fade-in");
  element.style.opacity = "0";
  element.style.transform = "translate(-50%, -50%) scale(0.95)";
  element.style.visibility = "hidden";
}

function showPopUp() {
  const container = document.querySelector(".container2");
  container.style.visibility = "visible";
  container.style.display = 'block';
  container.classList.add("fade-in");
}

function hidePopUp() {
  const container = document.querySelector(".container2");
  hideElement(container);
}

function getData() {
  const inputValue = inputDate.value;

  if (!inputValue) {
    alert("Please select a date first.");
    return false;
  }

  const selectedDate = moment(inputValue, "YYYY-MM-DD");
  if (selectedDate.isBefore(moment(), "day")) {
    fromDate = selectedDate;
    showInfoCard("Past date updated successfully!");
  } else {
    targetDate = selectedDate;
    showInfoCard("Future date updated successfully!");
  }

  updateCountdown();
  return true;
}

function saveChanges() {
  const valid = getData();
  if (valid) hidePopUp();
}

datesTargets.forEach((element) => {
  element.addEventListener("click", () => showInfoCard("Click the settings gear to change the date"));
});
settings_button.addEventListener("click", showPopUp);
saveButton.addEventListener("click", saveChanges);
AllowBtn.addEventListener("click", hideInfoCard);

updateCountdown();
