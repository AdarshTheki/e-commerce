# 🔐 Security Policy

## 🧩 Supported Versions

Only the latest version receives active support and security patches.

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅ Yes    |
| <1.0.0  | ❌ No     |

---

## 🚨 Reporting a Vulnerability

If you find a security issue, please **do not disclose it publicly**.

- Contact: **adarshverma549@gmail.com**
- Subject: `[Security Report] Vulnerability in MERN App`
- Please include:
  - Detailed description of the issue
  - Steps to reproduce
  - A proof-of-concept (if possible)

We'll review and respond within **72 hours** and aim to patch validated vulnerabilities within **7 days**.

---

## 🛡️ Security Measures

### ✅ Backend (Node.js + Express)

- JWT-based authentication with refresh token rotation
- OAuth login via Google and GitHub using Passport.js
- HTTP headers secured with `helmet`
- Rate-limiting and DDoS protection
- Input validation with `express-validator`
- Passwords hashed with `bcrypt`

### ✅ Database (MongoDB)

- Mongoose schema validation
- Prevents NoSQL injection
- Environment-based database credentials
- User data isolation

### ✅ Frontend (React + Vite)

- No use of `dangerouslySetInnerHTML`
- Sensitive tokens handled via HttpOnly cookies
- Protected routes via role-based access

---

## 🔍 Regular Maintenance

- Monthly dependency audit via `npm audit` and `snyk`
- Linting and CI/CD checks for safe code delivery
- GitHub Dependabot enabled for patch alerts

---

## 🙏 Responsible Disclosure

We appreciate responsible disclosures and will acknowledge valid reports in our project changelog.

---

## 📅 Last Updated

- August 2, 2025
