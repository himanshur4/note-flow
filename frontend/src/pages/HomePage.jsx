import { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NoteCardSkeleton from '../components/NoteCardSkeleton';
import api from '../lib/axios.js';
import { getCachedNotes, setCachedNotes } from '../lib/notesCache.js';
import NotesNotFound from '../components/NotesNotFound.jsx';

const GRID_CLASSES = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
const SLOW_TOAST_ID = 'notes-slow';
const SLOW_NOTICE_DELAY_MS = 3000;

const HomePage = () => {
    // Show the notes saved from the last visit right away, then bring them up to date.
    const [notes, setNotes] = useState(getCachedNotes);
    const [status, setStatus] = useState('loading'); // loading | ready | rateLimited | failed
    const refreshRequest = useRef(null);

    useEffect(() => {
        const controller = new AbortController();
        refreshRequest.current = controller;

        const slowTimer = setTimeout(() => {
            toast.loading("Waking up the server, this can take up to a minute...", { id: SLOW_TOAST_ID });
        }, SLOW_NOTICE_DELAY_MS);
        const stopSlowNotice = () => {
            clearTimeout(slowTimer);
            toast.dismiss(SLOW_TOAST_ID);
        };

        const fetchNotes = async () => {
            try {
                const res = await api.get('/notes', { signal: controller.signal });
                setNotes(res.data);
                setStatus('ready');
            } catch (error) {
                if (controller.signal.aborted) return;
                console.log("Error fetching notes", error);
                if (error.response?.status === 429) {
                    setStatus('rateLimited');
                } else {
                    setStatus('failed');
                    toast.error("Couldn't reach the server");
                }
            } finally {
                stopSlowNotice();
            }
        };
        fetchNotes();

        return () => {
            controller.abort();
            stopSlowNotice();
        };
    }, []);

    useEffect(() => {
        if (notes) setCachedNotes(notes);
    }, [notes]);

    // A refresh still in flight may have read the list before this change, so its result is out of date.
    const updateNotes = (update) => {
        refreshRequest.current?.abort();
        setStatus('ready');
        setNotes(update);
    };

    return (<div className='min-h-screen'>
        <Navbar />
        {status === 'rateLimited' && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            {!notes && status === 'loading' && (
                <div className={GRID_CLASSES}>
                    {Array.from({ length: 6 }, (_, i) => <NoteCardSkeleton key={i} />)}
                </div>
            )}
            {!notes && status === 'failed' && (
                <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                    <h3 className="text-2xl font-bold">Couldn't load your notes</h3>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            )}
            {notes?.length === 0 && <NotesNotFound />}
            {notes?.length > 0 && (
                <div className={GRID_CLASSES}>{
                    notes.map(note => (
                        <NoteCard key={note._id} note={note} setNotes={updateNotes} />
                    ))
                }</div>
            )}
        </div>
    </div>
    )
}

export default HomePage
