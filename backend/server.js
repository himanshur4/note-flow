import express from "express"
import "dotenv/config";
import cors from "cors";
import path from "path";

import connectDB from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import notesRouter from "./src/routes/notesRouter.js";

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://notes-making.vercel.app',    // Add your Vercel domain here
        /\.vercel\.app$/                      // Allow all Vercel preview deployments
    ],
    credentials: true
}));

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));

    });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
});

