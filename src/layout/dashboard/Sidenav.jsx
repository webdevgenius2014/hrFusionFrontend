import React from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List';
import { mainListItems } from './listItems';

const Sidenav = () => {
  return (
    <List component="nav">
      {mainListItems}
    </List>
  )
}

export default Sidenav