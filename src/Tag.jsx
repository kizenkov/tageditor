const Tag = ({filterNotesByTag, deleteTag, tag, light}) => {
    return <div className='listOfTags'>
        <span className={light ? 'tag lightTag' : 'tag'} onClick={() => filterNotesByTag(tag)}>{tag}</span>
        <span className='close' onClick={() => deleteTag(tag)}>❌</span>
    </div>
}

export default Tag