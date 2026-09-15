# 📒 PhoneBook

Aplicație full-stack de agendă telefonică (CRUD) construită cu **React**, **FastAPI** și **MongoDB**.

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/backend-FastAPI-009688?logo=fastapi&logoColor=white)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb&logoColor=white)

## Demo

<!-- Adauga aici un link live si/sau un screenshot/GIF cu aplicatia in functiune -->
🔗 **Live demo:** _(adaugă link după deploy)_

![Screenshot placeholder](https://via.placeholder.com/800x450?text=Screenshot+aplicatie)

## Funcționalități

- ➕ Adăugare contact (nume, telefon, email, adresă)
- 📋 Listare contacte, sortate alfabetic
- 🔍 Căutare live după nume sau telefon
- ✏️ Editare contact existent
- 🗑️ Ștergere contact (cu confirmare)
- ⚠️ Gestionare erori afișate direct în interfață

## Stack tehnologic

| Layer     | Tehnologie                          |
|-----------|--------------------------------------|
| Frontend  | React 18, Vite                       |
| Backend   | FastAPI, Motor (MongoDB async driver)|
| Database  | MongoDB                              |
| Deploy    | Render (backend) · Vercel (frontend) |

## Structura proiectului

```
phonebook/
├── backend/            # API REST cu FastAPI
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
└── frontend/           # Interfata React (Vite)
    ├── src/
    │   ├── components/
    │   │   ├── ContactForm.jsx
    │   │   └── ContactList.jsx
    │   ├── App.jsx
    │   └── api.js
    └── .env.example
```

## Instalare și rulare locală

### 1. MongoDB
Ai nevoie de o instanță MongoDB:
- **Local:** instalează MongoDB Community Server și pornește serviciul (`mongod`)
- **Cloud (recomandat pentru demo):** creează un cluster gratuit pe [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) și copiază connection string-ul

### 2. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # editează MONGO_URI dacă folosești Atlas
uvicorn main:app --reload --port 8000
```
API disponibil la `http://localhost:8000` · documentație Swagger la `http://localhost:8000/docs`

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env          # ajustează VITE_API_URL dacă backend-ul ruleaza in alta parte
npm run dev
```
Aplicația pornește la `http://localhost:5173`

## API Reference

| Metodă | Rută             | Descriere                   |
|--------|------------------|-------------------------------|
| GET    | `/contacts`      | Listă contacte (+ `?search=`) |
| GET    | `/contacts/{id}` | Un singur contact             |
| POST   | `/contacts`      | Adaugă contact                |
| PUT    | `/contacts/{id}` | Actualizează contact          |
| DELETE | `/contacts/{id}` | Șterge contact                |

## Roadmap / Îmbunătățiri planificate

- [ ] Autentificare utilizatori (JWT)
- [ ] Paginare pentru liste mari de contacte
- [ ] Grupare contacte alfabetic (A–Z)
- [ ] Import/export CSV
- [ ] Testare automată (pytest pentru backend)
- [ ] Deploy live (Render + Vercel)

## Autor

Creat de **Statescu** ca proiect de învățare/portofoliu full-stack.
