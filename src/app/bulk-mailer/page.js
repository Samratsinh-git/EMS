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
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import nextBase64 from 'next-base64';

const fields = ["Name", "Department", "Year", "Email Address", "Contact Number", "College", "Github Profile", "Linkedin Profile"]



function page() {
    const [events, setEvents] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [submit, setSubmit] = useState(false)
    const fetchEvents = async () => {
        const { data } = await axios.get('/api/event');
        if (data.hasOwnProperty('events')) {
            setEvents(data.events)
        }
    }
    useEffect(() => {
        fetchEvents()
    }, [])

    const handleMail = async () => {
        if (!selectedEvent) {
            return toast.error("Select a event to bulk mail")
        }
        setIsLoading(true)
        const { data } = await axios.post('/api/email/send-bulk', {
            eventId: selectedEvent.id,
            message: message

        })
        if (data.hasOwnProperty("success")) {
            setSubmit(true)
        }
        setIsLoading(false)
    }

    return (
        <div className='p-4 w-full'>
            <p className='tracking-wider text-lg font-bold'>Bulk Mailer</p>
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
                    <p>Enter a message</p>
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} disabled={isLoading} className='w-2/3' />
                </div>
            </div>
            <div className='flex gap-4 my-4'>
                <Button onClick={handleMail} disabled={isLoading}>
                    {isLoading && <ReloadIcon className='w-4 h-4 mr-2 animate-spin' />}
                    Bulk Mail
                </Button>
            </div>
            {
                submit && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Mails have been sent to all participants successfully.</span>
                </div>
            }
        </div>
    )
}

export default page