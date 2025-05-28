export const getAllNotes=(req,res)=>{
     res.send(`<h1 style="background-color:red;">You got 5 notes</h1>`);
}

export const createNote=(req,res)=>{
     res.status(201).json({message:'notes created'})
};

export const updateNote=(req,res)=>{
    res.status(200).json({message:"note updated successfully!"});
};

export const deleteNote=(req,res)=>{
    res.status(200).json({message:"note deleted successfully!"});
};

