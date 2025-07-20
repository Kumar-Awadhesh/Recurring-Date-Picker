# Recurring-Date-Picker
Recurring Date Picker is an app where user can schedule there work on calendar, and it can be repeated.

Purpose:-

This app helps users select dates that repeat on a regular schedule, such as:

Every day

Every Monday and Friday

The same day every month/year

Useful for setting up tasks, reminders, or events that happen repeatedly.

Tech Stack:-

React (with Hooks)

Vite (for fast development)

date-fns (for manipulating dates)

react-datepicker (for selecting dates)

Main Features:-

Feature	Description
Recurrence Types	Select between daily, weekly, monthly, yearly
Interval Selection	Choose how often the event should repeat (e.g., every 2 weeks)
Weekly Day Selection	Choose specific days of the week (only for weekly recurrence)
Date Range	Choose a start date and an optional end date
Date Preview	Instantly see a list of all recurring dates based on your settings

How It Works:-

1. Recurrence Type
User selects one of:

"daily": Every X days

"weekly": On specific weekdays every X weeks

"monthly": Same day every X months

"yearly": Same day every X years

2. Interval
User inputs how often the recurrence should happen.
Example: “Every 3 days” or “Every 2 weeks”.

3. Day of the Week
Only shown when recurrenceType is "weekly".
User can select which days (e.g., Mon/Wed/Fri).

4. Start & End Date
User selects:

A required start date

An optional end date (defaults to 1 year if not set)

5. Date Preview
The app calculates all recurring dates using generateRecurringDates() and shows them in a scrollable preview box.

Key Functions Explained:-

handleDayOfWeekToggle(day)
Toggles the selection of weekdays.
Used when recurrence is weekly.

generateRecurringDates()
Main logic to calculate the recurring dates based on:

Start/end date

Interval

Recurrence type

Selected weekdays (for weekly)

It uses functions from date-fns:

addDays, addMonths, addYears

isBefore, format, etc.

Dependencies You Must Instal
bash

npm install date-fns react-datepicker

Good to Know:-

The app is completely reusable and scalable.

You can style it with your own CSS.

The date preview helps users instantly verify their settings.

