import express from "express"
import "dotenv/config";
import cors from "cors";

import connectDB from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import notesRouter from "./src/routes/notesRouter.js";

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://noteflow-gamma.vercel.app/',    
        /\.vercel\.app$/                    
    ],
    credentials: true,
    // Lets browsers reuse the preflight check instead of repeating it before every write.
    maxAge: 86400
}));

// Above the rate limiter so uptime checks are instant and don't use up the limit.
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

// Listen before the database is ready: queries wait briefly for the connection, and if the
// database is down, requests get an error instead of hanging with no server to answer them.
app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`);
});

connectDB();

