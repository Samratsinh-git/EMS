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
import Login from "./Login";
import Register from "./Register";
import { BackgroundBeams } from "@/components/ui/background";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState("LOGIN");
  const router = useRouter();
  const session = useSession();
  if (session?.status == "authenticated") {
    router.push("/");
    router.push("/dashboard");
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
      router.push("/dashboard");
    }
  }, [session?.status, router]);
  return (
    <>
      <div className="z-10">
        {page === "LOGIN" && <Login setPage={setPage} />}
        {page !== "LOGIN" && <Register setPage={setPage} />}
      </div>
      <BackgroundBeams />
    </>
  );
}
