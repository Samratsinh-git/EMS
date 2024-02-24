'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../../../components/loading';
import axios from 'axios';

function page({ params }) {
    const [pageLoading, setPageLoading] = useState(true);
    const fetchForm = async () => {
        try {
            const { data } = await axios.get(`/api/event/${params.id}`);
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
        <div></div>
    )
}

export default page