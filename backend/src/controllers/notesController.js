import Note from "../models/Note.js";

// Enough to fill the 3-line preview on a note card at any screen width.
const PREVIEW_LENGTH=300;

export const getAllNotes=async(_,res)=>{
    try {
        // The list only shows previews. The full content is loaded when a note is opened.
        const notes=await Note.aggregate([
            {$sort:{createdAt:-1}},
            {$project:{title:1,createdAt:1,content:{$substrCP:["$content",0,PREVIEW_LENGTH]}}},
        ]);
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const getNoteById=async(req,res)=>{
    try {
        const {id}=req.params;
        const note=await Note.findById(id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const createNote=async(req,res)=>{
     try {
        const {title,content}=req.body;
        const newNote=new Note({title,content});
        await newNote.save();
        res.status(201).json({message:'Note created successfully',newNote})
     } catch (error) {
        console.error("Error in createNote controller");
        res.status(500).json({message:"Internal server error"});
     }
};

export const updateNote=async (req,res)=>{
   try {
        const {title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedNote) {
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Note updated successfully",updatedNote})
   } catch (error) {
        console.error("Error in updateNote controller");
        res.status(500).json({message:"Internal server error"});
   }
};

export const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params;
        const toBeDeletedNode=await Note.findByIdAndDelete(id);
        if(!toBeDeletedNode){
            return res.status(404).json({message:"Note not found"});
        }
        res.json({message:"Note deleted successfully",toBeDeletedNode});
    } catch (error) {
        console.error("Error in deleteNote controller");
        res.status(500).json({message:"Internal server error"});
    }
};

