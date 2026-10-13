# 🚀 Job Portal — Full-Stack Web Application

<p align="center">
  <strong>A modern job portal connecting candidates with recruiters.</strong>
</p>

<p align="center">
  Built with React, Spring Boot, Spring Security, JWT, and MySQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

---

## 📌 About the Project

Job Portal is a full-stack web application designed to simplify the job search and recruitment process. It provides separate experiences for candidates searching for opportunities and recruiters managing job listings and applications.

The application uses a React-based frontend and a Spring Boot REST API backend, with MySQL for persistent data storage and JWT-based authentication.

## ✨ Features

### 👨‍💻 Candidate
- Browse and search for job opportunities.
- View detailed job descriptions.
- Register and log in securely.
- Apply for jobs and upload a PDF resume.
- Manage candidate profile information.
- Save jobs for later.
- Track application status.
- View a candidate dashboard.

### 🏢 Recruiter
- Register and access a recruiter account.
- Create and manage job listings.
- Edit existing job details.
- View applicants for posted jobs.
- Review candidate application information.
- Update application statuses.
- Manage company profile information.
- View a recruiter dashboard.

### 🔐 Security
- JWT-based authentication.
- Role-based access control for candidates and recruiters.
- Password hashing through Spring Security.
- Protected API endpoints.
- Environment-based configuration for sensitive credentials.

### ⚙️ Additional Capabilities
- RESTful API architecture.
- Database persistence using Spring Data JPA and Hibernate.
- Resume storage using Cloudinary.
- AI integration using the Gemini API.
- Responsive user interface.

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Styling | Tailwind CSS, CSS |
| Routing | React Router |
| HTTP Client | Axios |
| Backend | Java, Spring Boot |
| API | Spring Web, REST |
| Security | Spring Security, JWT |
| ORM | Spring Data JPA, Hibernate |
| Database | MySQL |
| Build Tool | Maven |
| Resume Storage | Cloudinary |
| AI Integration | Gemini API |
| Version Control | Git, GitHub |

## 🏗️ Project Architecture

```text
job-portal/
│
├── backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── configuration/
│   │   ├── controller/
│   │   ├── dto/
│   │   │   ├── request/
│   │   │   └── response/
│   │   ├── entity/
│   │   ├── enums/
│   │   ├── repository/
│   │   ├── security/
│   │   └── service/
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── candidate/
│   │   │   ├── public/
│   │   │   └── recruiter/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

Install the following tools before starting:

- [Java JDK](https://adoptium.net/)
- [Node.js and npm](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) or a compatible hosted MySQL database
- [Git](https://git-scm.com/)
- An IDE such as Spring Tool Suite, IntelliJ IDEA, or VS Code

### 1. Clone the Repository

```bash
git clone https://github.com/Vengeance188/Job-Portal.git
cd Job-Portal
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Configure your environment variables before starting Spring Boot:

| Variable | Purpose |
|---|---|
| `DB_URL` | MySQL JDBC connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret used for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GEMINI_API_KEY` | Gemini API key |

The variable names must match the placeholders in `application.properties`. Use your own credentials and never commit them to GitHub.

Run the backend using Maven:

```bash
./mvnw spring-boot:run
```

On Windows Command Prompt:

```bat
mvnw.cmd spring-boot:run
```

Alternatively, configure the environment variables in your IDE's Spring Boot run configuration and launch `BackendApplication.java`.

**Backend address:** `http://localhost:9090`

### 3. Configure the Frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

**Frontend:** `http://localhost:5173`

Ensure the frontend API configuration points to the running backend at `http://localhost:9090`.

## 🔄 Application Workflow

1. A user registers as a candidate or recruiter.
2. The user logs in and receives an authentication token.
3. Candidates browse job listings and submit applications with their resumes.
4. Recruiters create job listings and review incoming applications.
5. Recruiters update application statuses.
6. Candidates can view their application progress.

## 🔒 Security Best Practices

- Keep database passwords and API keys out of source control.
- Store sensitive configuration in environment variables.
- Use a strong, randomly generated JWT secret.
- Rotate any credentials that have been exposed.
- Apply role-based authorization to protected endpoints.
- Use HTTPS and appropriate production security settings when deploying.

## 🚧 Future Enhancements

Potential improvements for future releases include:

- Email notifications for application updates.
- Advanced job recommendations.
- Recruiter and candidate messaging.
- Automated testing and CI/CD.
- Production deployment and monitoring.
- Enhanced analytics and reporting.

## 🎯 Project Objective

This project demonstrates practical full-stack development skills, including REST API development, database integration, authentication, authorization, file uploads, and frontend-backend integration.

It is designed as a portfolio project to showcase skills relevant to Java Full-Stack development.

## 👨‍💻 Author

**Abhinav Singh**

- GitHub: [@Vengeance188](https://github.com/Vengeance188)

---

<p align="center">
  <strong>Built with ☕ Java and a passion for full-stack development.</strong>
</p>
