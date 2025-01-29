# Expense Tracker Application

**Live Application:** [Expense Tracker](https://expense-tracker.live/)

**Demo Credentials:**  
- **Username:** loki 
- **Password:** asdfasdf  

## Table of Contents
- [Expense Tracker Application](#expense-tracker-application)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Features](#features)
    - [Current Features](#current-features)
    - [Upcoming Features](#upcoming-features)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Database](#database)
    - [Cloud \& Deployment](#cloud--deployment)
    - [Other Tools](#other-tools)
  - [Installation and Setup](#installation-and-setup)
    - [Clone the Repository](#clone-the-repository)
    - [Database Setup](#database-setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Screenshots](#screenshots)
    - [1. Login Page](#1-login-page)
    - [2. Expenses Page](#2-expenses-page)
    - [3. Dashboard](#3-dashboard)

## Project Description
Expense Tracker is a full-stack web application that helps users manage and visualize their expenses efficiently. Built with React (Vite) and TailwindCSS on the frontend and Django REST Framework on the backend, it provides an intuitive interface and insightful analytics via Chart.js. The application is deployed on AWS for scalability and performance.

## Features

### Current Features
- **User Authentication**: Secure login and registration.
- **Expense Management**: Add, edit, or delete expenses effortlessly.
- **Infinite Scroll**: Browse expenses seamlessly.
- **Data Visualization**: Interactive charts for spending insights.
- **Responsive Design**: Works flawlessly on all devices.

### Upcoming Features
- Advanced visualizations with filters.
- Expense filtering by date, category, or amount.
- Search functionality for quick access.
- Support for recurring expenses.
- Dark mode.

## Technologies Used

### Frontend
- [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/), [Chart.js](https://www.chartjs.org/)

### Backend
- [Django](https://www.djangoproject.com/), [Django REST Framework](https://www.django-rest-framework.org/)

### Database
- [PostgreSQL](https://www.postgresql.org/)

### Cloud & Deployment
- [AWS](https://aws.amazon.com/) (EC2, Elastic Load Balancer, RDS)

### Other Tools
- [Git](https://git-scm.com/), [pnpm](https://pnpm.io/), [pip](https://pypi.org/project/pip/), [VS Code](https://code.visualstudio.com/)


## Installation and Setup

### Clone the Repository
```bash
git clone https://github.com/vistej/expense-tracker.git
cd expense-tracker
```

### Database Setup
1. Install [PostgreSQL](https://www.postgresql.org/download/).
2. Create a new database for the project.

### Backend Setup
1. Install [Python](https://www.python.org/downloads/) (version 3.x recommended).
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  
   # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Update `config/django/base.py` with your database credentials (if needed).
5. Run migrations:
   ```bash
   python manage.py migrate
   ```
6. Seed initial data (e.g., categories):
   ```bash
   python manage.py runscript seed_categories
   ```
7. Start the backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Install [pnpm](https://pnpm.io/installation):
   ```bash
   npm install -g pnpm
   ```
2. Install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```


## Screenshots

### 1. Login Page
![Login Page](/assets/login.png)  
*Secure user authentication with a clean and modern design.*

### 2. Expenses Page
![Expenses Page](/assets/expenses.png)  
*Easily add, edit, or delete expenses with an intuitive interface.*

### 3. Dashboard
![Dashboard](/assets/dashboard.png)  
*Interactive charts and visualizations to track spending habits.*