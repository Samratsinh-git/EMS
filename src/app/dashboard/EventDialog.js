'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as React from "react"
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"

export default function EventDialog({ eventDialogOpen, setEventDialogOpen }) {
    const [date, setDate] = useState(null)
    const [name, setName] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleEventSubmit = async () => {
        try {
            setIsLoading(true)
            if (!date || !name) {
                return toast.error('Enter all details');
            }
            const body = {
                name: name,
                startDate: date,
                organizationId: await localStorage.getItem('orgId')
            }
            const resp = { data: body }
            const { data } = await axios.post('/api/event', resp);
            if (data.hasOwnProperty('success')) {
                toast.success(data.message)
                setEventDialogOpen(false)
            } else {
                toast.error("Something went wrong")
            }
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={eventDialogOpen} onOpenChange={() => setEventDialogOpen(!eventDialogOpen)}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Create Event</DialogTitle>
                    <DialogDescription>
                        Add all necessary event details
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="">
                        <Label htmlFor="name" className="text-right">
                            Event Name
                        </Label>
                        <Input disabled={isLoading} onChange={(e) => {
                            setName(e.target.value)
                        }} value={name} id="name" placeholder="Event Name" />
                    </div>
                    <div className="">
                        <Label htmlFor="date">
                            Event Date
                        </Label><br />
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    disabled={isLoading}
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleEventSubmit} type="submit">
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
