# 🎗️ GIVE JOY – Volontariato negli Ospedali Pediatrici

Benvenuto nel repository di **GIVE JOY**, un'applicazione web full-stack pensata per portare un sorriso e un po’ di leggerezza nei reparti pediatrici degli ospedali italiani 🧸👶🏼  
Un progetto dove la **tecnologia incontra l’umanità**, realizzato con passione e cura per creare valore sociale.

## 🌟 Obiettivo

L’obiettivo di GIVE JOY è semplice e potente: **offrire ai bambini ospedalizzati esperienze di gioco, animazione e creatività** attraverso eventi organizzati da volontari.  
La piattaforma permette di **visualizzare ospedali, prenotare eventi** e gestire tutte le attività tramite un backoffice dedicato agli amministratori.  
Una piattaforma digitale progettata per **donare tempo, emozioni e sorrisi.**



### 🧠 **Frontend** 
- 🟨 **JavaScript** – Linguaggio principale
- ⚛️ **React** – Per la costruzione dinamica delle interfacce
- 🎨 **React Bootstrap** – UI moderna e responsive
- 📦 **Redux Toolkit** – Per la gestione dello stato globale
- 🎭 **React Router DOM** – Per la navigazione client-side
- 📤 **fetch** – Per le chiamate API al backend
- 🎨 **CSS** – Personalizzazione visiva tramite ID e media query

### 🛡️ **Backend** (REST API)
- ☕ **Java** – Linguaggio principale del backend
- 🚀 **Spring Boot** – Per lo sviluppo rapido e modulare
- 🔐 **Spring Security + JWT** – Autenticazione sicura con token
- 🛢️ **JPA + MySQL (o H2)** – Persistenza dati
- 🖼️ **Cloudinary** – Upload immagini per eventi e ospedali (formato leggero, gestito con `multipart/form-data`)
- 📬 **Spring Mail** – Invio automatico email di conferma prenotazione

---

## 🔐 Autenticazione & Ruoli

- 👥 **Utente**: può registrarsi, loggarsi e prenotare eventi
- 👑 **Admin**: può creare, modificare ed eliminare eventi e ospedali attraverso un pannello dedicato (CRUD completo)

✔️ **JWT Token**  
✔️ **Controlli visivi e logici basati sul ruolo**

---

## 🧪 Funzionalità principali

- 🏥 Visualizzazione ospedali con descrizioni e immagini
- 📅 Prenotazione eventi da parte degli utenti loggati
- 📤 Upload immagini gestito tramite Cloudinary
- 📬 Invio email automatica dopo ogni prenotazione
- 🧑‍💼 Backoffice admin (eventi + ospedali)
- 👁️ Accesso condizionato e visibilità dinamica dei contenuti
- 📱 Interfaccia completamente **responsive**
- 🧠 UX curata nei minimi dettagli (modali, feedback, toast)

---

## 🗺️ Navigazione

 Percorso  Descrizione 

 `/`  Home page ispirazionale con carosello 
 `/ospedali` | Visualizza tutti gli ospedali registrati 
 `/eventi` | Visualizza e prenota gli eventi disponibili 
 `/profilo` | Gestisci gli eventi prenotati (utente normale) 
 `/backoffice-ospedali` | CRUD ospedali (solo admin) 
 `/backoffice-eventi` | CRUD eventi (solo admin) 

---

## ☁️ Cloudinary – Upload Immagini

Nel backend, ogni immagine caricata (ospedali o eventi) viene inviata a **Cloudinary**:
- Ottimizzazione automatica del formato
- Ridimensionamento efficiente
- Ritorno dell'URL da salvare nel DB
- Visualizzazione in frontend senza appesantire la UI

---

## 🚀 Link collegamento a BACK-END
https://github.com/CriPe91/CapstoneFinalProjectBE.git

