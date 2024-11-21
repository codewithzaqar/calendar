// script.js
const monthYearDisplay = document.getElementById("month-year");
const datesContainer = document.getElementById("dates");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
const modal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const eventNameInput = document.getElementById("event-name");
const addEventButton = document.getElementById("add-event");
const eventList = document.getElementById("event-list");
const selectedDateDisplay = document.getElementById("selected-date");

let currentDate = new Date();
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
let selectedDate = null;

function saveEvents() {
  localStorage.setItem("calendarEvents", JSON.stringify(events));
}

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  datesContainer.innerHTML = "";
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  for (let i = 0; i < firstDayIndex; i++) {
    const blank = document.createElement("div");
    datesContainer.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateElement = document.createElement("div");
    dateElement.textContent = day;
    dateElement.classList.add("date");

    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (events[dateKey]) {
      dateElement.classList.add("event");
    }

    dateElement.addEventListener("click", () => openEventModal(dateKey));
    datesContainer.appendChild(dateElement);
  }
}

function openEventModal(date) {
  selectedDate = date;
  selectedDateDisplay.textContent = date;
  renderEventList();
  modal.classList.remove("hidden");
}

function closeEventModal() {
  modal.classList.add("hidden");
}

function addEvent() {
  const eventName = eventNameInput.value.trim();
  if (eventName) {
    if (!events[selectedDate]) events[selectedDate] = [];
    events[selectedDate].push(eventName);
    saveEvents();
    renderEventList();
    renderCalendar();
    eventNameInput.value = "";
  }
}

function removeEvent(index) {
  events[selectedDate].splice(index, 1);
  if (events[selectedDate].length === 0) delete events[selectedDate];
  saveEvents();
  renderEventList();
  renderCalendar();
}

function renderEventList() {
  eventList.innerHTML = "";
  if (events[selectedDate]) {
    events[selectedDate].forEach((event, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${event} <button onclick="removeEvent(${index})">x</button>`;
      eventList.appendChild(li);
    });
  }
}

prevMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

closeModal.addEventListener("click", closeEventModal);
addEventButton.addEventListener("click", addEvent);

renderCalendar();
