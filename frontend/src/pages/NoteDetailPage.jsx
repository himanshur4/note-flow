import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { updateCachedNotes } from "../lib/notesCache.js";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error in fetching notes", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("Are you sure to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      updateCachedNotes((notes) => notes.filter((cached) => cached._id !== id));
      toast.success("Note deleted successfully🎉");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:",error);
      toast.error("Failed to delete note");
    }
  }
  const handleSave=async()=>{
    if(!note.title.trim()||!note.content.trim()){
      toast.error("Please add a title or content");
      return;
    }
    setSaving(true);
    try {
      const res = await api.put(`/notes/${id}`,note);
      updateCachedNotes((notes) => notes.map((cached) => (cached._id === id ? res.data.updatedNote : cached)));
      toast.success("Note updated successfuly🎉");
      navigate('/');
    } catch (error) {
      console.log("Error in updating note",error);
      toast.error("Failed to update note!");

    }finally{
      setSaving(false); 
    }
  }

  if (loading) {
    return <Loader />
  }
  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 text-center">
        <h3 className="text-2xl font-bold">Couldn't load this note</h3>
        <Link to={'/'} className="btn btn-ghost">
          <ArrowLeftIcon className="size-5" />
          Back to Notes
        </Link>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-base-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={'/'} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note title" className="input input-bordered" value={note.title} onChange={(e)=>setNote({...note,title:e.target.value})}/>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Write your note here..." className="textarea textarea-bordered h-32" value={note.content} onChange={(e)=>setNote({...note,content:e.target.value})}/>
              </div>
              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                    {saving?"Saving...":"Save Changes"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage