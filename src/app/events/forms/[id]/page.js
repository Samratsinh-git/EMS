'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/loading';
import axios from 'axios';
import nextBase64 from 'next-base64';

function page({ params }) {
    const id = nextBase64.decode(decodeURIComponent(params.id));
    const [pageLoading, setPageLoading] = useState(true);
    const [form, setForm] = useState(null)
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
    useEffect(() => {
        fetchForm();
    }, [])
    if (pageLoading) return <Loading />
    return (
        <div>{form.id}</div>
    )
}

export default page