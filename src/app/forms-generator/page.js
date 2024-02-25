'use client'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import Preview from './Preview';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const fields = ["Registration ID", "Department", "Year", "Email Address", "Contact Number", "College", "Github Profile", "Linkedin Profile"]



function page() {
  const [events, setEvents] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formFields, setFormFields] = useState([])
  const [formDescription, setFormDescription] = useState("")
  const [preview, setPreview] = useState(false)
  const router = useRouter()
  const fetchEvents = async () => {
    const { data } = await axios.get('/api/event');
    if (data.hasOwnProperty('events')) {
      setEvents(data.events)
    }
  }
  useEffect(() => {
    fetchEvents()
  }, [])

  const handleCheckboxChange = (checked, item) => {
    if (checked) {
      setFormFields(prevFields => [...prevFields, item]);
    } else {
      setFormFields(prevFields => prevFields.filter(prevField => prevField !== item));
    }
  };

  const handlePreview = () => {
    if (!selectedEvent) {
      return toast.error("Select a event to preview")
    }
    setPreview(true)
  }

  const handleGenerate = async () => {
    if (!selectedEvent) {
      return toast.error("Select a event to preview")
    }
    setIsLoading(true)
    const body = {
      eventId: selectedEvent.id,
      formFields: formFields,
      formDescription: formDescription
    }
    const { data } = await axios.post('/api/form', body);
    if (data.hasOwnProperty('success')) {
      toast.success("Form Generate sucessfully")
      router.push(`/events/forms/${data.form.id}`)
    } else {
      toast.error("Something went wrong")
    }
    setIsLoading(false)
  }

  return (
    !preview ? <div className='p-4 w-full'>
      <p className='tracking-wider text-lg font-bold'>Forms Generator</p>
      <div className='flex flex-col gap-4'>
        <div className='my-2 gap-16 flex items-center justify-between'>
          <p>Select a event</p>
          <Select disabled={isLoading} onValueChange={(value) => setSelectedEvent(value)}>
            <SelectTrigger className='w-2/3'>
              <SelectValue placeholder={selectedEvent ? `${selectedEvent.name}` : `Select a Event`} />
            </SelectTrigger>
            <SelectContent>
              {
                events?.length == 0 ? "No Events" :
                  events?.map((event) => (
                    <SelectItem key={event.id} value={event}>{event.name}</SelectItem>
                  ))
              }
            </SelectContent>
          </Select>
        </div>
        <div className='my-2 flex items-center justify-between'>
          <p>Form Description</p>
          <Textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} disabled={isLoading} className='w-2/3' />
        </div>
        <div className='my-2 flex items-center justify-between'>
          <p>Choose Required Fields</p>
          <div className='w-2/3 grid grid-cols-4 gap-4'>
            {
              fields.map((item, index) => (
                <div className='flex items-center gap-1'><Checkbox disabled={isLoading}
                  checked={formFields?.includes(item)}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange(checked, item)
                  }}
                  value={item} id={index} /><Label htmlFor={index}>{item}</Label></div>
              ))
            }
          </div>
        </div>
        <p className='italic text-center text-gray-500'>(Note: Select checkbox according to the order)</p>
      </div>
      <div className='flex gap-4 my-4'>
        <Button onClick={handleGenerate} disabled={isLoading}>
          {isLoading && <ReloadIcon className='w-4 h-4 mr-2 animate-spin' />}
          Generate
        </Button>
        <Button onClick={handlePreview} disabled={isLoading}>
          Preview
        </Button>
      </div>
    </div>
      :
      <Preview selectedEvent={selectedEvent} setPreview={setPreview} formFields={formFields} formDescription={formDescription} />
  )
}

export default page