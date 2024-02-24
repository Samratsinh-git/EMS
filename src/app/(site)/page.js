"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BackgroundBeams } from "@/components/ui/background";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const session = useSession();
  if (session?.status == "authenticated") {
    router.push("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    await signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Crendentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    } else {
      setPageLoading(false);
    }
  }, [session?.status, router]);

  return (
    !pageLoading && (
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
        <div className="bg-white sm:px-10 py-8 z-10 shadow sm:rounded-lg sm:py-10 sm:mx-auto sm:w-full sm:max-w-md">
          <h2
            className="mt-3
                text-center
                text-3xl
                font-bold
                tracking-tight
                text-gray-900
                "
          >
            Sign in to your account
          </h2>
          <div className="mt-6 flex flex-col gap-2">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                disabled={isLoading}
                type="text"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && errors.username.type === "required" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">
                  Username is required.
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                disabled={isLoading}
                id="password"
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">
                  Password is required.
                </p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="mt-1 mb-0 text-red-600 text-sm">
                  Password should have atleast 6 characters.
                </p>
              )}
            </div>
            <div>
              <Button
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                className="w-full mt-2"
              >
                {isLoading && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
              <p className="text-center text-sm mt-3">
                Not Registered?
                <a
                  className="hover:underline text-gray-600 font-bold mx-1"
                  href="https://hyper-e.vercel.app/getting-started"
                >
                  Signup here
                </a>
              </p>
            </div>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    )
  );
}
