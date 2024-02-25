'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import EventDialog from './EventDialog'
import Statistic from './Statistc'

function page() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  return (
    <div>
      <Button onClick={()=>setEventDialogOpen(true)} >Create Event</Button>
      <EventDialog eventDialogOpen={eventDialogOpen} setEventDialogOpen={setEventDialogOpen}/>
      <Statistic/>
      
    </div>
    
    
    
  )
}

export default page