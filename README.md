# CreditLift – Full-Stack Fintech Marketplace & Credit Improvement Engine

> **A full-stack loan marketplace that connects borrowers to lenders, analyzes credit profiles, and provides AI-driven credit improvement plans.**

---

# 🏗️ System Architecture

CreditLift follows a **decoupled, microservice-inspired architecture**, separating the frontend, backend API, database, and business rule engine.

## Architecture Diagram

```text
                    +---------------------------+
                    |   React Frontend          |
                    |   (Hosted on Vercel)      |
                    +------------+--------------+
                                 |
                                 | REST API (Axios)
                                 |
                                 ▼
                    +---------------------------+
                    |     FastAPI Backend       |
                    |     (Hosted on Render)    |
                    +------------+--------------+
                                 |
               +-----------------+-----------------+
               |                                   |
               ▼                                   ▼
     +-------------------+             +------------------------+
     | SQLite Database   |             | Python Rule Engine     |
     | (SQLAlchemy ORM)  |             | (YAML Driven Rules)    |
     +-------------------+             +------------------------+
```

---

## High-Level Design

### Frontend

- React Single Page Application (SPA)
- Functional Components & Hooks
- Axios for API communication
- Interactive Dashboard
- Score Simulator
- EMI Calculator
- Loan Offer Filtering

### Backend

- FastAPI REST API
- SQLAlchemy ORM
- Pydantic Validation
- CORS Enabled
- CRUD Operations

### Rule Engine

A standalone configurable Python module that reads all business rules from a `rules.yaml` configuration file.

Business rules can be modified without changing application code.

### Bridge Layer

The backend communicates with the Rule Engine through a dedicated

```
engine_bridge.py
```

This keeps the API independent of the business logic.

---

# 🧠 System Design Decisions

## 1. Database — SQLite + SQLAlchemy

### Why SQLite?

- Lightweight
- Portable
- Zero setup
- Ideal for evaluation

### Why SQLAlchemy?

Provides ORM abstraction allowing migration to

- PostgreSQL
- Supabase
- AWS RDS

without changing application logic.

---

## 2. Config Driven Rule Engine

Instead of hardcoding rules like

```python
if cibil_score >= 650:
```

the engine loads

```
rules.yaml
```

at startup.

This allows business analysts to modify:

- Minimum Credit Score
- Interest Rates
- Eligibility Rules
- Credit Gap Thresholds

without requiring developers to redeploy the application.

---

## 3. CORS & Deployment Strategy

Backend

- Render

Frontend

- Vercel

CORS

```python
allow_origins=["*"]
```

allows requests from

- localhost
- Vercel Preview URLs
- Production URL

---

## 4. Score Gating Logic

The endpoint

```
GET /customers/{id}/offers
```

calculates dynamically

- locked
- unlocked
- score_gap

using

```
score_gap =
offer.min_score_required
-
customer.cibil_score
```

This provides instant feedback on how many points are required to unlock better loan offers.

---

# 📂 Project Structure

```text
creditlift-fullstack/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── engine_bridge.py
│   ├── migrations/
│   │     └── 001_init.sql
│   ├── requirements.txt
│   ├── runtime.txt
│   └── run_migration.py
│
├── rule_engine/
│   ├── engine.py
│   ├── rules.yaml
│   ├── test_cases.py
│   └── test_output.txt
│
├── frontend/
│   ├── src/
│   │    ├── App.jsx
│   │    ├── components/
│   │    │     ├── Dashboard/
│   │    │     ├── Offers/
│   │    │     ├── Bonus/
│   │    │     └── Common/
│   │    ├── services/
│   │    │     └── api.js
│   │    └── data.json
│   │
│   └── package.json
│
├── postman_collection.json
├── render.yaml
└── README.md
```

---

# 💻 Tech Stack

| Layer | Technology | Purpose |
|--------|------------|---------|
| Frontend | React, Axios, CSS Modules | UI Development |
| Backend | FastAPI, Uvicorn, SQLAlchemy | REST API |
| Database | SQLite | Relational Database |
| ORM | SQLAlchemy | Database Abstraction |
| Rule Engine | Python, PyYAML | Business Logic |
| Deployment | Render, Vercel | Cloud Hosting |
| Testing | Postman, React Testing Library | API & UI Testing |

---

# 🚀 Running the Project Locally

## Prerequisites

- Python 3.12
- Node.js
- npm

---

## Backend Setup

```bash
cd backend
```

### Create Virtual Environment

Windows

```bash
python -m venv venv
venv\Scripts\activate
```

Mac/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Create Database

```bash
python run_migration.py
```

### Start FastAPI

```bash
python -m uvicorn main:app --reload
```

Backend

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run React

```bash
npm start
```

Frontend

```
http://localhost:3000
```

---

# 🌐 Live Demo

## Frontend

https://credlift.vercel.app

## Backend API

https://credlift-3hoq.onrender.com/docs

---

# 🧪 API Testing

Import

```
postman_collection.json
```

into Postman.

Included test cases

- Create Customer
- Update Customer
- Get Credit Profile
- Get Loan Offers
- Success Responses
- Validation Failures
- Duplicate Mobile
- Locked Offers

---

# 🎯 Features

## Credit Dashboard

- Credit Score Gauge
- Potential Score
- Impact Badges
- Credit Factors

---

## Loan Marketplace

- Locked & Unlocked Offers
- Dynamic Score Gap
- Eligibility Checking

---

## Rule Engine

- YAML Configurable
- No Hardcoded Business Rules
- Credit Gap Analysis
- Offer Eligibility

---

## Search & Filtering

- Debounced Search (300ms)
- Filter by
  - All
  - Locked
  - Unlocked

---

## Bonus Features

- Credit Score Simulator
- EMI Calculator
- Real-time Loan Eligibility

---

# 📌 Future Improvements

- PostgreSQL Migration
- JWT Authentication
- Redis Caching
- Docker Containerization
- CI/CD Pipeline
- AI-based Loan Recommendation System
- Credit History Analytics
- Notification Service
- Admin Dashboard

---

