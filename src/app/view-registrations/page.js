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
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';
import nextBase64 from 'next-base64';
import Loading from '../components/loading';
import { FormData } from './FormData';

function page() {
    const [events, setEvents] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [form, setForm] = useState(null)
    const fetchEvents = async () => {
        const { data } = await axios.get('/api/event');
        if (data.hasOwnProperty('events')) {
            setEvents(data.events)
        }
    }
    useEffect(() => {
        fetchEvents()
    }, [])
    const fetchFormResponses = async () => {
        setIsLoading(true)
        const { data } = await axios.post('/api/form/responses', { eventId: selectedEvent.id });
        if (data.hasOwnProperty('success')) {
            setForm(data.form)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        if (selectedEvent) {
            fetchFormResponses();
        }
    }, [selectedEvent])
    return (
        <div className='m-2 flex flex-col gap-4'>
            <p className='text-2xl font-bold'>View Registrations</p>
            <div className='my-2'>
                <Label>Select a event</Label>
                <Select onValueChange={(value) => setSelectedEvent(value)}>
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
                </Select >
            </div >
            {
                isLoading ? <Loading />
                    :
                    form ? <div>Event Form: <Link className='text-blue-400 hover:underline' href={`/events/forms/events/forms/${encodeURIComponent(nextBase64.encode(form.id))}`}>Form Link</Link></div>
                        : selectedEvent && <p>No Form Generated</p>
            }
            <div className='no-scrollbar'>
                {
                    form && (form.responses > 0 ? <FormData /> : selectedEvent && <p className='text-center'>No Resgistrations yet</p>)
                }
                <FormData />
            </div>
        </div >
    )
}

export default page