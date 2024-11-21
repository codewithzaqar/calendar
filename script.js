// script.js
const monthYearDisplay = document.getElementById("month-year");
const datesContainer = document.getElementById("dates");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const modal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const saveEventButton = document.getElementById("save-event");
const eventNameInput = document.getElementById("event-name");
const selectedDateDisplay = document.getElementById("selected-date");

let currentDate = new Date();
let events = {}; // Store events as { "YYYY-MM-DD": ["Event1", "Event2"] }
let selectedDate = null;

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Clear previous dates
  datesContainer.innerHTML = "";

  // Display month and year
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  // Add blank spaces for days before the first day of the month
  for (let i = 0; i < firstDayIndex; i++) {
    const blank = document.createElement("div");
    datesContainer.appendChild(blank);
  }

  // Add dates of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateElement = document.createElement("div");
    dateElement.textContent = day;
    dateElement.classList.add("date");

    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    // Highlight today's date
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateElement.classList.add("today");
    }

    // Highlight dates with events
    if (events[dateKey]) {
      dateElement.classList.add("event");
    }

    // Add click handler to open modal
    dateElement.addEventListener("click", () => openEventModal(dateKey));

    datesContainer.appendChild(dateElement);
  }
}

function openEventModal(date) {
  selectedDate = date;
  selectedDateDisplay.textContent = `Selected Date: ${date}`;
  eventNameInput.value = "";
  modal.classList.remove("hidden");
}

function closeEventModal() {
  modal.classList.add("hidden");
}

function saveEvent() {
  const eventName = eventNameInput.value.trim();
  if (eventName) {
    if (!events[selectedDate]) {
      events[selectedDate] = [];
    }
    events[selectedDate].push(eventName);
    closeEventModal();
    renderCalendar();
  }
}

// Navigation
prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

closeModal.addEventListener("click", closeEventModal);
saveEventButton.addEventListener("click", saveEvent);

// Initial render
renderCalendar();
