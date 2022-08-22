import React, {useContext} from 'react'
import { ThemeContext } from '../../Context/themeContext'
import { ThemeSelection } from '../.'
import './style.css';

export default function Header() {
  const {theme} = useContext(ThemeContext)
  
  return (
    <div className={`${theme}-theme header`}>
      <div className='header-title'>Notes</div>
      <ThemeSelection />
    </div>
  )
}
