import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loading() {
    return (
        <div className='h-[80vh] justify-center flex items-center'>
            <AiOutlineLoading3Quarters size={30} className='animate-spin' />
        </div>
    )
}

export default Loading