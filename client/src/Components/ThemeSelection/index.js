import React, {useContext } from 'react'
import { ThemeContext } from '../../Context/themeContext'
import './style.css'

export default function ThemeSelection() {
  const {theme, handleThemeChange} = useContext(ThemeContext)
  
  return (
    <div className={`${theme}-theme theme-selection-container`}>
        <select className={`theme-select-dropdown ${theme}-dropdown`} name="theme-select" 
            value={theme} 
            onChange={handleThemeChange}
        >
            <option>dark</option>
            <option>light</option>
            <option>red</option>
            <option>blue</option>
        </select>
    </div>
  )
}