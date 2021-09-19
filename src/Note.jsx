import {useState} from 'react';

const Note = ({note, deleteNote, changeNote, i}) => {

    const [changingNote, setChangingNote] = useState(false);
    const [newNote, setNewNote] = useState(note);

    let changeTextNote = (e) => {
        setNewNote(e.currentTarget.value)
    }

    let oldNote = note;
    let saveNewNote = (e) => {
        e.preventDefault();
        changeNote(oldNote, newNote)
        setNewNote(oldNote)
        setChangingNote(false)
    }

    return <div className='noteDiv'>
        {changingNote && <form onSubmit={saveNewNote}><input type='text' value={newNote} autoFocus={true}
                                                             onChange={changeTextNote}
                                                             onBlur={saveNewNote} /></form>}
        {!changingNote && <>
            <span className='note' onClick={() => setChangingNote(true)}>{i}. {note}</span>
            <span className='close' onClick={() => deleteNote(note)}>❌</span>
        </>}
    </div>
}

export default Note