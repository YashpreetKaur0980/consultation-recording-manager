# Consultation Recording Manager

## Project Overview
Consultation Recording Manager is a web application built using Next.js and TypeScript to manage consultation records efficiently. The application allows users to authenticate themselves, create and manage consultation records, track consultation statuses, and view dashboard analytics.

---

## Features

### Authentication
* User Registration
* User Login
* Logout Functionality
* Protected Dashboard Access
* Welcome User Message


### Consultation Management
* Add New Consultation
* View All Consultations
* Edit Existing Consultations
* Delete Consultations

### Dashboard Features
* Dashboard Analytics
* Total Consultations Count
* Pending Consultations Count
* Completed Consultations Count
* Reviewed Consultations Count
* Flagged Consultations Count

### Additional Features
* Search Consultations by Client Name
* Export Consultations to CSV
* Consultation Status Tracking
* Recording Upload User Interface
* LocalStorage Data Persistence
* Responsive User Interface

---

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* LocalStorage

---

## Project Structure
app/
* page.tsx (Dashboard)
* login/page.tsx
* register/page.tsx
* add-consultation/page.tsx

---

## Installation and Setup

1. Clone the repository:

git clone <repository-url>

2. Navigate to the project folder:

cd consultation-recording-manager

3. Install dependencies:

npm install

4. Run the development server:

npm run dev

5. Open the application:

http://localhost:3000

---

## Usage

### Register

Create a new user account using the registration page.

### Login

Sign in using your registered credentials.

### Dashboard

View consultation statistics and recent consultations.

### Add Consultation

Create a new consultation record with details such as client name, astrologer name, consultation date, duration, notes, and status.

### Edit Consultation

Update consultation details and status.

### Delete Consultation

Remove consultations from the dashboard.

### Export CSV

Download consultation records as a CSV file.

---

## Status Workflow

New consultations are typically created with a default status of:

Pending

The administrator can manually update the consultation status to:

* Completed
* Reviewed
* Flagged

This approach ensures that consultation completion is verified before being marked accordingly.

---

## Future Improvements

* Toast Notifications
* Custom Confirmation Modal
* Dark Mode
* Edit Profile Functionality
* Backend Integration with Database
* Permanent Audio File Storage

---

## Author

Developed by Yashpreet Kaur.
