import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';

const HomePage = () => {
    const [isRlReached, setIsRlReached] = useState(true);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get('/notes');
                console.log(res.data);
                setNotes(res.data);
                setIsRlReached(false);
            } catch (error) {
                console.log("Error fetching notes");
                console.log(error)
                if (error.response?.status === 429) {
                    setIsRlReached(true);
                }
                else {
                    toast.error("Failed to load notes")
                }
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, [])
    return (<div className='min-h-screen'>
        <Navbar />
        {!loading ? <div>
            {isRlReached && <RateLimitedUI />}
        </div> : <Loader />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            {notes.length > 0 && !isRlReached && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{
                    notes.map(note => (
                        <NoteCard key={note._id} note={note} />
                    ))
                }</div>
            )}
        </div>
    </div>
    )
}

export default HomePage