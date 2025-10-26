const weeks = document.querySelector('.weeks');
const months = document.querySelector('.month');
const days = document.querySelector('.days');
const numberDate = document.querySelector(".number_date");
const settings_button = document.querySelector(".settings");
const inputDate = document.querySelector("#date");
const saveButton = document.querySelector(".save-btn");

let targetDate = moment("20-12-2025", "DD-MM-YYYY");

function updateCountdown() {
  const today = moment();
  const difference = targetDate.diff(today, "days");

  numberDate.textContent = targetDate.format("MMMM D, YYYY");
  days.textContent = `${difference} days left.`;
  weeks.textContent = `${(difference / 7).toFixed(2)} Weeks`;
  months.textContent = `${(difference / 30).toFixed(2)} Months`;
}

function showPopUp() {
  const container = document.querySelector(".container");
  const container2 = document.querySelector(".container2");

  container.classList.add("fade-out");

  setTimeout(() => {
    container.style.visibility = "hidden";
    container.style.opacity = "0";
    container.style.transform = "scale(0.95)";

    container2.style.visibility = "visible";
    container2.classList.add("fade-in");
  }, 300);
}

function hidePopUp() {
  const container = document.querySelector(".container");
  const container2 = document.querySelector(".container2");

  container2.classList.remove("fade-in");
  container2.style.opacity = "0";
  container2.style.transform = "translate(-50%, -50%) scale(0.95)";
  container2.style.visibility = "hidden";

  container.style.visibility = "visible";

  setTimeout(() => {
    container.classList.add("fade-in");
    container.style.opacity = "1";
    container.style.transform = "translate(-50%, -50%) scale(1)";
  }, 20);
}

function getData() {
  const inputValue = inputDate.value;

  if (!inputValue) {
    alert("Please select a date first.");
    return false;
  }

  const selectedDate = moment(inputValue, "YYYY-MM-DD");

  if (selectedDate.isBefore(moment(), "day")) {
    alert("The selected date cannot be earlier than today.");
    return false;
  }

  targetDate = selectedDate;
  updateCountdown();
  return true;
}

function saveChanges() {
  const valid = getData();
  if (valid) hidePopUp();
}

settings_button.addEventListener("click", showPopUp);
saveButton.addEventListener("click", saveChanges);
updateCountdown();
