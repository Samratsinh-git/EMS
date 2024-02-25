"use client"
import Link from 'next/link'
import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { CiMail } from 'react-icons/ci'
import { GrCertificate, GrView } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";
import { FaWpforms } from "react-icons/fa";
import { IoIosLink, IoIosLogOut } from "react-icons/io";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function SideBar({ user }) {
    const router = useRouter()
    return (
        <div className='bg-slate-800 left-0 h-screen py-4'>
            <div className='px-4'>
                <p className='text-white my-4 font-bold text-2xl'>{user?.name}</p>
            </div>
            <div className='flex flex-col gap-3 mx-4'>
                <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/dashboard'}>
                    <AiOutlineDashboard className='text-gray-400' size={22} />
                    Dashboard
                </Link>
                <hr />
                <p className='px-4 text-gray-500 font-bold text-lg'>MEDIA & MARKETING</p>
                <div className='flex flex-col gap-3'>
                    <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/certificate'}>
                        <GrCertificate className='text-gray-400' size={22} />
                        Certificate Generator
                    </Link>
                    <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/bulk-mailer'}>
                        <CiMail className='text-gray-400' size={22} />
                        Bulk Mailer
                    </Link>
                    <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/dashboard'}>
                        <CiViewList className='text-gray-400' size={22} />
                        Creating Mail List
                    </Link>
                </div>
                <hr />
                <p className='px-4 text-gray-500 font-bold text-lg'>EVENTS</p>
                <div className='flex flex-col gap-3'>
                    <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/forms-generator'}>
                        <FaWpforms className='text-gray-400' size={22} />
                        Forms Generator
                    </Link>
                    <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/view-registrations'}>
                        <GrView className='text-gray-400' size={22} />
                        View Registrations
                    </Link>
                    <Link className='rounded-md hover:bg-gray-600 py-2 px-4 flex items-center text-white gap-2 text-base' href={'/dashboard'}>
                        <IoIosLink className='text-gray-400' size={22} />
                        Link Shortner
                    </Link>
                </div>
                <hr />
                <p onClick={async () => {
                    await signOut();
                    toast.success("Logged out")
                }} className='px-4 gap-2 py-2 hover:bg-gray-600 rounded-md cursor-pointer flex items-center'><IoIosLogOut className='text-gray-400' size={22} /><span className='text-white text-base'>Logout</span></p>

            </div>
        </div>
    )
}

export default SideBar