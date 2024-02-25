import React from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
function Preview({ selectedEvent, formFields, formDescription, setPreview }) {
    return (
        <div className='max-w-[80%] mx-auto flex items-center flex-col'>
            <p className='my-4 text-2xl font-bold'>Registration for {selectedEvent?.name}</p>
            <p className='text-justify'>{formDescription}</p>
            <div className='my-4 flex flex-col w-full gap-2'>
                {
                    formFields &&
                    formFields.map((field) => (
                        <div>
                            <Label>{field}</Label>
                            <Input />
                        </div>
                    ))
                }
            </div>
            <Button onClick={() => setPreview(false)}>BACK</Button>
        </div>

    )
}

export default Preview