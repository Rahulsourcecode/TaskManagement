import React, { useState } from 'react'
import Addtask from '../components/Addtask'
import './Base.css'
import Header from '../components/Header'
import ListMain from '../components/ListMain'
import { Grid } from '@mui/material'
const Base = () => {
  const [reset , setReset] = useState(false)
  return (
    <Grid >
      <Header />
      <Addtask reset={setReset}/>
      <ListMain onReset={reset} reset={setReset}/>
    </Grid>
  )
}

export default Base
