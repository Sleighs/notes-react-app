import React, {useState} from "react"

const ThemeContext = React.createContext()

function ThemeContextProvider(props){ 
    const [theme, setTheme] = useState('dark')

    const handleThemeChange = (e) => {
        const { value } = e.target
        
        var rootEle = document.getElementById('root')

        switch(value){
        case 'dark':
            rootEle.style.color = 'white';
            rootEle.style.backgroundColor = 'rgb(40, 40, 40)';
            break;
        case 'light':
            rootEle.style.color = 'black';
            rootEle.style.backgroundColor = 'white';
            break;
        case 'red':
            rootEle.style.color = 'white';
            rootEle.style.backgroundColor = 'darkred';
            break;
        case 'blue':
            rootEle.style.color = 'white';
            rootEle.style.backgroundColor = 'rgb(0, 50, 100)';
            break;
        }

        setTheme(prevTheme => {
            return (
                value
            )
        })
    }
    return(
        <ThemeContext.Provider value={{
            theme,
            handleThemeChange
        }}>
           {props.children}
        </ThemeContext.Provider>
    )
}

export {ThemeContext, ThemeContextProvider}