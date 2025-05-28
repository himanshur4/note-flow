import express from "express"
import notesRouter from "./src/routes/notesRouter.js";
import "dotenv/config";
import connectDB from "./src/lib/db.js";

const app=express();
const PORT=process.env.PORT||5001;

connectDB();

app.use(express.json());

app.use("/api/notes",notesRouter);

app.listen(PORT,()=>{
    console.log(`Server running on PORT:${PORT}`);
});
