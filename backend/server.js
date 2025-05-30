import express from "express"
import "dotenv/config";
import cors from "cors";

import connectDB from "./src/config/db.js";
import rateLimiter from "./src/middleware/rateLimiter.js";
import notesRouter from "./src/routes/notesRouter.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRouter);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`);
    });
});

