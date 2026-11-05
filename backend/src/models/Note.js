import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});

// The home page lists notes newest first; this avoids sorting the whole collection on every load.
noteSchema.index({createdAt:-1});

const Note=mongoose.model("Note",noteSchema);

export default Note