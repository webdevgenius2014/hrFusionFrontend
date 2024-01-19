import React from 'react'
import List from '@mui/material/List';
import { MainListItems } from './listItems';


const Sidenav = () => {
  return (
    <List component="nav">
    <MainListItems />     
    </List>
  )
}

export default Sidenav