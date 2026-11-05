// The last-loaded notes list, saved in the browser so the home page can show notes
// instantly on every visit and refresh them in the background.
const STORAGE_KEY = "noteflow:notes";

// An empty list counts as nothing saved, so "No notes yet" only shows once the server confirms it.
export const getCachedNotes = () => {
    try {
        const notes = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(notes) && notes.length > 0 ? notes : null;
    } catch {
        return null;
    }
};

export const setCachedNotes = (notes) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
        // Storage is full or blocked. The app still works, just without the instant load.
    }
};

// For changes made outside the home page, so the list is already correct when it opens.
export const updateCachedNotes = (update) => {
    const notes = getCachedNotes();
    if (notes) setCachedNotes(update(notes));
};
