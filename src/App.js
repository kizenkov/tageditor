import './App.scss';
import {useState} from 'react';
import Note from './Note';
import Tag from './Tag';
import data from './data.json';

function App() {
    const [tags, setTags] = useState(data.tags.map(el => el));
    const [notes, setNotes] = useState(data.notes.map(el => el));
    const [currentNote, setCurrentNote] = useState('');
    const [sortedListByTag, setSortedListByTag] = useState([]);

    let addTag = (noteWithTag) => {
        let endPositionOfTag = noteWithTag.indexOf(' ', noteWithTag.indexOf('#'));
        if (!noteWithTag.includes(' ', noteWithTag.indexOf('#'))) endPositionOfTag = noteWithTag.length;
        !tags.includes(noteWithTag.slice(noteWithTag.indexOf('#'), endPositionOfTag)) &&
        setTags([...tags, noteWithTag.slice(noteWithTag.indexOf('#'), endPositionOfTag).toLowerCase()])
    }

    let addNote = (e) => {
        e.preventDefault();
        let trimCurrentNote = currentNote.trim();
        if (notes.includes(trimCurrentNote) || trimCurrentNote === '') return
        setNotes([...notes, trimCurrentNote])
        if (trimCurrentNote.includes('#')) {
            addTag(trimCurrentNote)
        }
        setCurrentNote('');
    }

    let changeNote = (oldNote, newNote) => {
        let newNotes = notes.slice().map(el => el === oldNote ? newNote : el)
        !notes.includes(newNote) && setNotes(newNotes)
        addTag(newNote.trim())
        setSortedListByTag([])
    }

    let deleteNote = (el) => {
        let newNotes = notes.slice().filter(note => note !== el)
        setNotes(newNotes)
        let sortedList = sortedListByTag.slice().filter(note => note !== el)
        setSortedListByTag(sortedList)

        let endPositionOfTag = el.indexOf(' ', el.indexOf('#'));
        if (!el.includes(' ', el.indexOf('#'))) endPositionOfTag = el.length;
        let tagToDelete = el.slice(el.indexOf('#'), endPositionOfTag)

        let include = false;
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i].includes(tagToDelete)) {
                include = true
            }
        }
        !include && setTags(tags.slice().filter(el => el !== tagToDelete))
    }

    let deleteTag = (el) => {
        setTags(tags.slice().filter(tag => tag !== el))
        setNotes(notes.slice().filter(note => !note.includes(el)))
        setSortedListByTag(sortedListByTag.slice().filter(note => !note.includes(el)))
    }

    let filterNotesByTag = (el) => {
        setSortedListByTag(notes.slice().filter(note => note.toLowerCase().includes(el)))
    }

    let noteList = notes.map((el, i) => <Note key={el} i={i + 1} note={el} deleteNote={deleteNote}
                                              changeNote={changeNote} tags={tags}/>)

    let tagList = tags.map(el => <Tag key={el} tag={el} filterNotesByTag={filterNotesByTag} deleteTag={deleteTag}/>)

    let sortedList = sortedListByTag.map((el, i) => <div className='note' key={el}>{i + 1}. {el}</div>)

    return (
        <div className='tagNoteEditor'>
            <h1>TagNoteEditor</h1>
            <form onSubmit={addNote}>
                <textarea autoFocus
                          value={currentNote}
                          placeholder='Enter new note'
                          onChange={(e) => setCurrentNote(e.currentTarget.value)}/>
                <button type='submit'>Create</button>
            </form>
            <div className='lists'>
                <h2>List of tags (click to sort)</h2>
                {tagList}
                <hr/>
                <div className='grid'>
                    <div className='listOfNotes'>
                        <h2>List of notes (click to change)</h2>
                        {noteList}
                    </div>
                    <div className='listOfNotes'>
                        <h2>Sorted list by tag</h2>
                        {sortedList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
