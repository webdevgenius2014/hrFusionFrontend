import React from 'react'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List';
import { MainListItems } from './listItems';
import {  useDispatch } from 'react-redux'
import {superAdminData } from '../../redux/SuperAdminSlice'


const Sidenav = () => {
  return (
    <List component="nav">
    <MainListItems />     
    </List>
  )
}

export default Sidenav