// script.js
const monthYearDisplay = document.getElementById("month-year")
const datesContainer = document.getElementById("dates")
const prevMonthButton = document.getElementById("prev-month")
const nextMonthButton = document.getElementById("next-month")

let currentDate = new Date()

function renderCalendar() {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Clear previous dates 
    datesContainer.innerHTML = ""

    // Display month and year 
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`

    // Add blank spaces for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
        const blank = document.createElement("div")
        datesContainer.appendChild(blank)
    }

    // Add dates of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement("div")
        dateElement.textContent = day
        dateElement.classList.add("date")

        // Highlight today's date
        const today = new Date()
        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dateElement.classList.add("today")
        }

        datesContainer.appendChild(dateElement)
    }
}

// Navigation
prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    renderCalendar()
})

nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    renderCalendar()
})

// Initial render
renderCalendar()