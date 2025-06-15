# Note-Flow 📝🌊

**Note-Flow** is a full-stack, minimalistic note-taking application that allows users to write, manage, and organize notes in a clean UI. It's fast, intuitive, and built for productivity.

---

## 🚀 Features

- ✍️ Create, edit, and delete notes
- 🧠 Notes persist in a MongoDB database
- 💡 Clean and responsive UI

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **React.js**
- **Tailwind CSS**
---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/himanshur4/note-flow.git
cd note-flow
```

### 2. Start the backend
```bash
cd server
npm install
# Add your environment variables in .env
npm run dev
```

### 3. Start the frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 📁 Folder Structure

```
/client         # React frontend
/server         # Express backend
```

---

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/1e02eba0-1db0-45c7-91f1-2d7dd2183fa7)

---

## 🙌 Contributing

Pull requests are welcome! If you spot a bug or have an idea for an improvement, feel free to contribute.

---

## 📄 License

[MIT](LICENSE)
