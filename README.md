# SkillNova — Intern Management System

SkillNova is a full-stack web application designed to streamline the tracking, evaluation, and management of interns. The system provides role-based workspaces for administrators, mentors, and interns, featuring a secure architecture and dynamic data visualizations.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS, JavaScript |
| Backend | Python, FastAPI, SQLAlchemy (Async ORM), Uvicorn |
| Database | MySQL (via `aiomysql` async driver) |
| Security | JWT Authentication, Passlib (Bcrypt hashing), Cryptography |

---

## 📁 Project Structure

```
skillnova-intern-management/
├── frontend/                  # React.js Frontend (User Interface)
│   ├── public/                # Static assets (images, icons)
│   ├── src/
│   │   ├── components/        # Reusable UI components (Navbar, Sidebar)
│   │   ├── pages/             # Page views (Login, Dashboard, AdminPortal)
│   │   ├── App.jsx            # Main application router and view control
│   │   └── main.jsx           # App entry point (Vite layout)
│   ├── index.html
│   ├── package.json           # Frontend dependencies (React, Tailwind CSS)
│   └── vite.config.js         # Vite configuration
│
├── backend/                   # Python FastAPI Backend (Server Logic)
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py        # JWT login, signup, and token generation logic
│   │   │   └── interns.py     # API endpoints for managing intern profiles
│   │   ├── core/
│   │   │   ├── config.py      # App configurations & Secret Keys
│   │   │   └── security.py    # Password hashing (Bcrypt) and JWT helper functions
│   │   ├── db/
│   │   │   ├── session.py     # Async SQLAlchemy engine and session setup
│   │   │   └── base.py        # Database connection entry point
│   │   ├── models/
│   │   │   └── models.py      # SQLAlchemy database tables schema (User, Intern)
│   │   ├── schemas/
│   │   │   └── schemas.py     # Pydantic models for request/response validation
│   │   └── main.py            # FastAPI main entry point & CORS configuration
│   ├── .env                   # Environment variables (not committed to Git)
│   ├── .env.example           # Secure template for setting up credentials
│   └── requirements.txt       # Python backend dependencies
│
└── README.md
```

---

## ✅ Prerequisites

Make sure the following are installed before proceeding:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Python](https://www.python.org/) (v3.10 or above)
- [MySQL](https://dev.mysql.com/downloads/) (v8.0 or above) / MySQL Workbench
- [Git](https://git-scm.com/)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/flash-sagittario/skillnova-intern-management.git
cd skillnova-intern-management
```

---

### 2. Database Setup

> **How does the schema get created?**  
> This project uses **SQLAlchemy ORM** — there are no raw `.sql` files to import. Your Python models in `backend/app/models/models.py` define the database structure, and when the backend boots, `Base.metadata.create_all` automatically generates all MySQL tables on first run.

The only thing you need to do manually is create the **empty database container** once:

1. Open **MySQL Workbench**, **phpMyAdmin**, or the MySQL CLI.
2. Run this single command:
   ```sql
   CREATE DATABASE IF NOT EXISTS skillnova_db;
   ```
   > Make sure the name matches the database in your `.env` file's `DATABASE_URL`.

---

### 3. 🐍 Backend Setup (FastAPI)

```bash
cd backend
```

#### a. Create and activate a virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

#### b. Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Open `.env` and set the following:

```env
DATABASE_URL=mysql+aiomysql://root:YOUR_PASSWORD@localhost:3306/YOUR_DATABASE_NAME
SECRET_KEY=your_super_secret_jwt_signing_key
ALGORITHM=HS256
```

> **⚠️ Important:** Never commit `.env` to version control. It is already excluded in `.gitignore`.

#### c. Install dependencies

Install the required packages alongside the async MySQL driver:

```bash
python -m pip install -r requirements.txt
python -m pip install aiomysql
```

#### d. Start the backend server

```bash
python -m uvicorn app.main:app --reload
```

The API will be live at: `http://127.0.0.1:8000`  
Interactive Swagger docs: `http://127.0.0.1:8000/docs`

---

### 4. 💻 Frontend Setup (React + Vite)

Open a **new terminal window** and navigate to the frontend directory:

```bash
cd frontend
```

#### a. Install Node packages

```bash
npm install
```

#### b. Launch the development server

```bash
npm run dev
```

The client interface will be available at: `http://localhost:5173`

---

## 🔒 Verification & Startup Order

Always start the stack in this order:

1. **Start MySQL** (via XAMPP, MySQL Workbench, or Windows Services) — ensure it's active on port `3306`.
2. **Create the blank database** (only needed once — see Database Setup above).
3. **Run the backend** (`python -m uvicorn app.main:app --reload`) — SQLAlchemy will auto-generate all tables on first boot.
4. **Run the frontend** (`npm run dev`) in a separate terminal.

To confirm full connectivity, open `http://localhost:5173`, launch **DevTools** (`F12` → Network tab), and test the authentication endpoint (`/auth`). A successful JWT token response confirms both layers are communicating.

---

## 📡 API Endpoints (Quick Reference)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT token |
| GET | `/api/interns/` | Fetch all intern profiles |
| POST | `/api/interns/` | Add a new intern |
| PUT | `/api/interns/{id}` | Update an intern profile |
| DELETE | `/api/interns/{id}` | Delete an intern profile |

Full interactive documentation available at `http://127.0.0.1:8000/docs` when the backend is running.

---

## 🔑 Environment Variables Reference

| Variable | Description |
|---|---|
| `DATABASE_URL` | Async MySQL connection string (`mysql+aiomysql://...`) |
| `SECRET_KEY` | Secret key used for JWT signing — keep this private |
| `ALGORITHM` | JWT hashing algorithm (default: `HS256`) |

---

## 🤝 Contributing

This project was built as part of an internship at **UptoSkills**. Contributions and suggestions are welcome — feel free to open an issue or submit a pull request.


