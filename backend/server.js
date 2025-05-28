import express from "express"
import notesRouter from "./src/routes/notesRouter.js";
import dotenv from "dotenv";
import connectDB from "./src/lib/db.js";

dotenv.config()

const app=express();
const PORT=process.env.PORT||5001
connectDB();

app.use("/api/notes",notesRouter);
app.listen(PORT,()=>{
    console.log(`Server running on PORT:${PORT}`);
});
