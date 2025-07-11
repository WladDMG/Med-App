<!-- LOGOS & BADGES -->
<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/></a>
  <a href="https://reactnative.dev/" target="_blank"><img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native"/></a>
  <a href="https://expo.dev/" target="_blank"><img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo"/></a>
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/></a>
  <a href="https://www.mongodb.com/" target="_blank"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/></a>
</p>

<h1 align="center">Med-App</h1>

<p align="center">
  <b>Projeto Completo: Sistema Médico com Cadastro de Pacientes e Marcação de Consultas</b><br>
  <b>Full Project: Medical App System with Patient Registration and Appointment Scheduling</b>
</p>

---

## 🇧🇷 Descrição do Projeto

O Med-App é um sistema completo para clínicas e consultórios médicos, permitindo o cadastro e gerenciamento de pacientes, usuários (profissionais de saúde) e a marcação de consultas. O sistema oferece um backend robusto e seguro, além de um aplicativo mobile moderno e intuitivo para facilitar o acesso de médicos e pacientes.

- **Backend:** API REST com NestJS, MongoDB, autenticação com JWT e validação, gerenciamento de usuários, pacientes e consultas.
- **Frontend:** App mobile com React Native + Expo, consumo da API com Axios, com telas de login, cadastro de pacientes, agendamento e gerenciamento de consultas.

## 🇺🇸 Project Description

Med-App is a complete system for medical clinics and offices, enabling patient registration and management, user (health professional) management, and appointment scheduling. The system provides a robust and secure backend, as well as a modern and intuitive mobile app for both doctors and patients.

- **Backend:** REST API built with NestJS, MongoDB, JWT authentication and validation, user, patient, and appointment management.
- **Frontend:** Mobile app using React Native + Expo, consuming the API for login, patient registration, appointment scheduling, and management screens.

---

## 🛠️ Tecnologias Usadas | Technologies Used

O Med-App utiliza tecnologias modernas para garantir segurança, escalabilidade e uma ótima experiência de uso, tanto para profissionais de saúde quanto para pacientes.

Med-App uses modern technologies to ensure security, scalability, and a great user experience for both health professionals and patients.

### Backend
- NestJS
- TypeScript
- MongoDB + Mongoose
- JWT + Passport (auth)
- class-validator (data validation)

### Frontend
- React Native
- Expo
- Axios (API requests)
- React Navigation (optional)
- AsyncStorage (JWT storage, if implemented)

---

## 📁 Estrutura do Repositório | Repository Structure

O repositório está organizado para separar claramente o backend (API) do frontend (aplicativo mobile), facilitando o desenvolvimento e a manutenção.

The repository is organized to clearly separate the backend (API) from the frontend (mobile app), making development and maintenance easier.

```
Med-App/
├── backend/         # Backend - NestJS API
├── frontend/        # Frontend - React Native + Expo App
└── README.md        # Documentação / Documentation
```

---

## ⚙️ Configuração e Setup

Siga os passos abaixo para rodar o sistema completo localmente:

Follow the steps below to run the complete system locally:

### Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com o conteúdo:

```
MONGO_URI=mongodb://localhost:27017/medapp
JWT_SECRET=sua_chave_secreta
PORT=3000
```

Inicie a API:

```bash
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

Use o Expo Go no celular ou um emulador Android/iOS para rodar o app.

---

## 🚦 Endpoints e Funcionalidades | Endpoints & Features

O backend expõe endpoints REST para autenticação, cadastro de pacientes, usuários e marcação de consultas. O frontend consome esses endpoints, oferecendo telas intuitivas para médicos e pacientes.

The backend exposes REST endpoints for authentication, patient registration, user management, and appointment scheduling. The frontend consumes these endpoints, providing intuitive screens for doctors and patients.

### Backend Endpoints

- `POST /auth/register` — cria um novo usuário / creates a new user
- `POST /auth/login` — autentica e retorna token JWT / authenticates and returns JWT token
- `GET /users` — (protegido) lista usuários / (protected) lists users
- `PATCH /users/:id` — (protegido) edita usuário / (protected) edits user
- `DELETE /users/:id` — (protegido) deleta usuário / (protected) deletes user
- `POST /consultas` — agenda uma nova consulta / schedules a new appointment
- `GET /consultas` — lista consultas agendadas / lists scheduled appointments
- `PATCH /consultas/:id` — edita uma consulta / edits an appointment
- `DELETE /consultas/:id` — cancela uma consulta / cancels an appointment

Use Postman ou Insomnia para testar, passando o token no header.

### Frontend Funcionalidades

- Tela de cadastro de paciente / Patient registration screen
- Tela de login com armazenamento do JWT / Login screen with JWT storage
- Telas protegidas para agendamento, listagem, edição e cancelamento de consultas / Protected screens for scheduling, listing, editing, and canceling appointments
- Gerenciamento de usuários (profissionais de saúde) / User management (health professionals)

---

## 🚀 Deploy

O Med-App pode ser facilmente implantado em serviços cloud modernos:

Med-App can be easily deployed to modern cloud services:

- **Backend:** Pode ser hospedado em Heroku, AWS, Render ou qualquer serviço que suporte Node.js + MongoDB.  
  Can be hosted on Heroku, AWS, Render, or any Node.js + MongoDB service.
- **Frontend:** Pode ser publicado diretamente via Expo ou exportado para APK/IPA.  
  Can be published via Expo or exported as APK/IPA.

---

## 👤 Autor | Author

Wladmir Silveira  
wladdmg@gmail.com  
[https://github.com/WladDMG](https://github.com/WladDMG)

---

## 📝 Licença | License

Este projeto está licenciado sob a licença MIT.  
This project is licensed under the MIT License.

---

## 🙏 Agradecimentos | Acknowledgments

- NestJS pela robustez e arquitetura no backend.
- React Native e Expo pela simplicidade no desenvolvimento mobile.
- MongoDB por seu banco escalável e flexível.

