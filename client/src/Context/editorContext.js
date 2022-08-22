import React, {useState} from "react"

const EditorContext = React.createContext()

function EditorContextProvider(props){ 
    const [open, setOpen] = useState(false)

    const handleOpenChange = (e) => {
        setOpen(!open ? true : false)
    }

    return(
        <EditorContext.Provider value={{
            open,
            handleOpenChange
        }}>
           {props.children}
        </EditorContext.Provider>
    )
}

export {EditorContext, EditorContextProvider}