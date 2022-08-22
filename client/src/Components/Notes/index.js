import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'universal-cookie';
import { EditorContext } from '../../Context/editorContext';
import { ThemeContext } from '../../Context/themeContext'
import { makeId } from '../../scripts/math';
import './style.css'

export default function Notes() {
  const {open, handleOpenChange} = useContext(EditorContext)
  const {theme, handleThemeChange} = useContext(ThemeContext)

  // Get cookies
  const cookies = new Cookies()
  const notesCookie = cookies.get('notes')

  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [currentId, setCurrentId] = useState('')
  const [currentEditorNote, setCurrentEditorNote] = useState('')

  const noteList = () => {
    return (
        notes.map((item,i) =>
            <div className="note-link note-row" key={i} 
                onClick={(e)=>{
                    // opens note in editor
                    setCurrentEditorNote(item.note)
                    setCurrentId(item.id)
                    setCurrentNote('')
                    if (!open){
                        handleOpenChange()
                    }
                }}
            >
                <div className='note-link-text'>{item.note}</div>
                <div className='note-link-date'>{item.date}</div>
            </div>
        )
    )
  }

  const addNote = () => {
    setNotes(prevData => {
        const date = new Date()
        const id = makeId(9)
        return ([
            ...prevData,
            {
                id: id,
                note: currentNote,
                date: 
                    date.getMonth()+ '-'
                    + date.getDay() + '-'
                    + date.getFullYear() + ' '
                    + date.getHours() + ':'
                    + date.getMinutes()
            }
        ])
    })
    setCurrentNote('')
    cookies.set('notes', notes, {path:'/', maxAge: 120000,})
  }

  const showDate = id => {
    var arr = [...notes]
    var filtered = arr.filter(item => item.id === id)

    return filtered[0].date
  }

  useEffect(()=>{
    if (notesCookie){
        setNotes(notesCookie)
    }
  }, [])

  return (
    <div className={`notes-container ${theme}-theme  ${theme}-layout`}>
        <div className={`note-list ${theme}-list ` + (open ? `list-small` : `list-wide`)}>
            <div className={'note-row ' + (open ? 'new-note-closed' : 'new-note-open')}>
                <input 
                    className={`note-new ${theme}-theme`}
                    placeholder='new note' 
                    value={currentNote} 
                    onChange={(e) => {
                        setCurrentNote(e.target.value)
                    }}
                />
                <button className='add-note-btn' onClick={()=>{
                    if (currentNote.length > 0){
                        addNote()
                    }
                }}>+</button>
            </div>
            {noteList()}
            <button className='clear-note-btn' onClick={()=>{
                setNotes([])
            }}>Clear Notes</button>
        </div>

        <div className={`note-editor ${theme}-editor ` + (open ? `editor-open ` : `editor-closed `)}>
            <div className='editor-textarea-container'>
                <div className='note-header'>
                    <div className='editor-date'>{!currentId || currentId.length <= 1? '' : showDate(currentId)}</div>
                    <div className='editor-buttons'>
                    
                    <button 
                        className="save-note-btn" 
                        onClick={()=>{
                            handleOpenChange()
                            let newArr = [...notes]; 
                            let updated = newArr.map((item) => {
                                if (item.id === currentId){
                                    let date = new Date();
                                    return {
                                        ...item, 
                                        note: currentEditorNote,
                                        date:  
                                            date.getMonth()+ '-'
                                            + date.getDay() + '-'
                                            + date.getFullYear() + ' '
                                            + date.getHours() + ':'
                                            + date.getMinutes()
                                    }
                                } else {
                                    return item
                                }
                            })

                            cookies.set('notes', updated, {path:'/', maxAge: 120000,})
                        }}
                    >
                        Save
                    </button>
                    <button 
                        className="delete-note-btn" 
                        onClick={()=>{
                            let newArr = [...notes]; 
                            let updated = newArr.filter((item) => item.id !== currentId)

                            setNotes(updated)
                            setCurrentEditorNote('')
                            setCurrentNote('')
                            setCurrentId('')
                            handleOpenChange()
                        }}
                    >
                        Delete
                    </button>
                    </div>
                </div>
                
                <textarea 
                    className={`editor-textarea ${theme}-theme`}
                    name='editor-textarea'
                    value={currentEditorNote} 
                    onChange={(e) => {
                        setCurrentEditorNote(e.target.value);

                        let newArr = [...notes]; 
                        let updated = newArr.map((item) => {
                            if (item.id === currentId){
                                let date = new Date();
                                return {...item, 
                                    note: e.target.value,
                                    date: 
                                        date.getMonth()+ '-'
                                        + date.getDay() + '-'
                                        + date.getFullYear() + ' '
                                        + date.getHours() + ':'
                                        + date.getMinutes()
                                }
                            } else {
                                return item
                            }
                        })

                        setNotes(updated)

                        cookies.set('notes', updated, {path:'/', maxAge: 120000,})
                    }}
                />
            </div>
        </div>
    </div>
  )
}
