const Tag = ({filterNotesByTag, deleteTag, tag}) => {

    return <div className='listOfTags' >
        <span className='tag' onClick={() => filterNotesByTag(tag)}>{tag}</span>
        <span className='close' onClick={() => deleteTag(tag)}>❌</span>
    </div>
}

export default Tag