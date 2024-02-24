'use client'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {  useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { ReloadIcon } from "@radix-ui/react-icons"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

export default function Register({setPage}) {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null)
    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit= async(body)=>{
        try{
          setIsLoading(true)
          if(!file){
              toast.error("Upload a logo")
          }
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);
          formData.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}`);

          const data1 = await axios.post(
          `${process.env.NEXT_PUBLIC_CLOUDINARY_API}`,
          formData,
          {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          }
          )
          body.logoUrl = data1.data.secure_url
          const data = body
          console.log(data)
          const resp = await axios.post('/api/organization', data) 
          if(resp.data.hasOwnProperty('success')){
            toast.success(resp.data.message)
            setPage('LOGIN')
          }else if(resp.data.hasOwnProperty('message')){
            toast.error(resp.data.message);
          }else{
            toast.error("Something went wrong");
          }
        }catch(err){
          toast.error("Something went wrong");
        }finally{
          setIsLoading(false)
        }
    }

    return (
      <div
        className="
          flex
          h-screen
          flex-col
          justify-center
          py-12
          sm:px-6
          lg:px-8
          bg-gray-100
        "
      >
        <div className="bg-white sm:px-10 py-8 shadow sm:rounded-lg sm:py-10 sm:mx-auto sm:w-2/3">
            <h2
                className="mt-3
                text-center
                text-3xl
                font-bold
                tracking-tight
                text-gray-900
                ">
                Register your organisation
            </h2>
            <div className="mt-6 flex flex-col gap-2">
              <div>
                <Label htmlFor="name">Organisation Name</Label>
                <Input id="name" disabled={isLoading} type="text" {...register("name", {
                  required: true,
                })}/>
                {errors.name && errors.name.type === "required" && (
                  <p className="mt-1 mb-0 text-red-600 text-sm">Org. name is required.</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" disabled={isLoading} type="email" {...register("email", {
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                })}/>
                {errors.email && errors.email.type === "required" && (
                  <p className="mt-1 mb-0 text-red-600 text-sm">Email is required.</p>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <p className="mt-1 mb-0 text-red-600 text-sm">Email is not valid.</p>
                )}
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" disabled={isLoading} type="text" {...register("username", {
                  required: true,
                })}/>
                {errors.username && errors.username.type === "required" && (
                  <p className="mt-1 mb-0 text-red-600 text-sm">Username is required.</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input disabled={isLoading} id="password" type="password" {...register("password", {
                  required: true,
                  minLength: 6
                })}/>
                {errors.password && errors.password.type === "required" && (
                  <p className="mt-1 mb-0 text-red-600 text-sm">Password is required.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p className="mt-1 mb-0 text-red-600 text-sm">
                    Password should have atleast 6 characters.
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Input onChange={(e)=>setFile(e.target.files[0])} disabled={isLoading} id='logo' type='file' accept='image/jpg, image/png, image/jpeg'/>
              </div>
              <div>
                <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="w-full mt-2">
                  {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>}
                  Login
                </Button>
                <p className="text-center text-sm mt-3">Already Registered?<span className="cursor-pointer hover:underline text-gray-600 font-bold mx-1" onClick={()=>setPage("LOGIN")}>Login Here</span></p>
              </div>
            </div>
        </div>

      </div>
    )
}
