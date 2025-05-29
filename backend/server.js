import express from "express"
import notesRouter from "./src/routes/notesRouter.js";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
});

