# 🪪 Aadhaar OCR Web Application

A cleanly architected web application that allows users to upload front and back images of their Aadhaar card and extract the textual data using Google's Vision API. Users can also save and manage their extracted data for future reference.

---

## 🔗 Live Demo

👉 [Hosted Link Here](https://aadhaar-ocr-application.vercel.app/)

---

## 🚀 Features

- 📤 Upload front and back images of an Aadhaar card
- 🔍 Extract Aadhaar details using Google Vision API
- 💾 Save extracted data to the database
- 🔁 Retrieve and search saved records
- 🧱 Clean architecture backend (Domain → Application → Infrastructure → Interfaces)
- 🖥️ Smooth and user-friendly React frontend

---

## 🧾 Pages Overview

| Page              | Description                                         |
| ----------------- | --------------------------------------------------- |
| Main Page         | Upload images, trigger OCR, and view extracted data |
| Save Record Modal | Enter additional details and save the OCR result    |

---

## 🧱 Tech Stack

| Frontend        | Backend              | OCR Engine        | Database | Styling    |
| --------------- | -------------------- | ----------------- | -------- | ---------- |
| React.js (Vite) | Node.js + Express.js | Google Vision API | MongoDB  | Custom CSS |
| Axios           | TypeScript           |                   | Mongoose | iziToast   |

---

## 🗃️ Folder Structure

```
aadhaar-ocr-app/
├── backend
│   ├── index.ts
│   ├── tsconfig.json
│   └── src
│       ├── application
│       ├── domain
│       ├── infrastructure
│       ├── interfaces
│       └── shared
├── frontend
│   ├── index.html
│   ├── tsconfig.json
│   └── src
│       ├── apis
│       ├── components
│       ├── interfaces
│       ├── pages
│       ├── utils
│       └── validations
```

---

## 🛠️ Setup & Installation

### 📦 Clone the Repo

```bash
git clone https://github.com/AfsalRHM/OCR-Application.git
cd aadhaar-ocr-app
```

---

### 🎯 Backend Setup

```bash
cd backend
npm install
```

#### ✅ Configure Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/key.json
```

✅ *The `GOOGLE_APPLICATION_CREDENTIALS` should be an absolute path to your service account `key.json` file from Google Vision API.*

#### ▶️ Start the Backend

```bash
npm start
```

---

### 🎯 Frontend Setup

```bash
cd frontend
npm install
```

#### ✅ Configure Environment Variables

Create a `.env` file in the `frontend` folder:

```
VITE_API_BASE_URL=http://localhost:3000
```

#### ▶️ Start the Frontend

```bash
npm run dev
```

---

## 🧪 Sample JSON Output from OCR

```json
{
  "name": "RAHUL SHARMA",
  "dob": "01-01-1990",
  "gender": "Male",
  "aadhaarNumber": "1234 5678 9012",
  "address": "123 Main Street, City, State, India",
  "pincode": "123456"
}
```

---

## 🛡️ Security Notes

- Do not upload or commit your `key.json` file to any public repo.
- Always secure your `.env` and use `.gitignore` to prevent credential leaks.

---

## ❓ Facing Issues?

If you face any problems during setup or usage, raise an issue in the [GitHub Issues](https://github.com/AfsalRHM/OCR-Application/issues) tab.

---

**Happy Coding! 🚀**
