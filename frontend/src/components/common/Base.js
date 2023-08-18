import React from 'react'
import Addtask from '../Addtask'
import './Base.css'
import Header from '../Header'
import ListMain from '../ListMain'
import { Grid } from '@mui/material'
const Base = () => {
  return (
    <Grid >
      <Header />
      <Addtask />
      <ListMain />
    </Grid>
  )
}

export default Base
