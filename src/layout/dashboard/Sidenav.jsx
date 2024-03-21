import React from 'react'
import List from '@mui/material/List';
import { MainListItems } from './listItems';


const Sidenav = (props) => {
  return (
    <List component="nav">
    <MainListItems open={props?.open} />     
    </List>
  )
}

export default Sidenav