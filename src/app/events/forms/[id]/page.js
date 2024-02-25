'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/loading';
import axios from 'axios';
import nextBase64 from 'next-base64';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import Submit from './Submit';

function page({ params }) {
    const id = nextBase64.decode(decodeURIComponent(params.id));
    const [pageLoading, setPageLoading] = useState(true);
    const [form, setForm] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [submit, setSubmit] = useState(false)

    const fetchForm = async () => {
        try {
            const { data } = await axios.get(`/api/form/${id}`);
            if (data.hasOwnProperty('form')) {
                setForm(data.form);
            }
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setPageLoading()
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (body) => {
        setIsLoading(true)
        const r = { data: JSON.stringify(body), id: form.id }
        try {
            const { data } = await axios.put('/api/form/responses', r)
            if (data.hasOwnProperty('success')) {
                toast.success("Form Submitted Successfully");
                setSubmit(true)
            } else {
                return toast.error("Something went wrong");
            }
        } catch (e) {
            return toast.error("Something went wrong");
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchForm();
    }, [])
    if (pageLoading) return <Loading />
    return (
        submit ? <Submit /> :
            <div className='max-w-[80%] mx-auto flex items-center flex-col'>
                <p className='my-4 text-2xl font-bold'>Registration for {form?.event?.name}</p>
                <p className='text-justify'>{form?.formDescription}</p>
                <div className='my-4 flex flex-col w-full gap-2'>
                    {
                        form?.formFields.map((field) => {
                            return (
                                <div>
                                    <Label htmlFor={field}>{field}</Label>
                                    <Input id={field} disabled={isLoading} type="text" {...register(field, {
                                        required: true,
                                    })} />
                                    {errors[field] && errors[field].type === "required" && (
                                        <p className="mt-1 mb-0 text-red-600 text-sm">{field} is required.</p>
                                    )}
                                </div>
                            );
                        })
                    }
                </div>
                <Button onClick={handleSubmit(onSubmit)}>
                    {isLoading && <ReloadIcon className='mr-2 w-4 h-4 animate-spin' />}
                    SUBMIT
                </Button>
            </div>
    )
}

export default page