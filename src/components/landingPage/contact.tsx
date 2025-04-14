"use client";
import React, { useState } from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


export function ContactSection() {

    const [result, setResult] = useState("");


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("sending...");
        const formData = new FormData(event.target as HTMLFormElement);
    
        formData.append("access_key", "2ecc1d8c-618d-4b8a-ab8d-63d55b5a0eb7");
    
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
    
        const data = await response.json();
    
        if (data.success) {
          setResult("Form submitted successfully");
          (event.target as HTMLFormElement).reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
      };

  return (
    <div className="h-106 relative w-100% overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex flex-col justify-center items-center">
      <div className="absolute flex  items-center justify-center w-full h-full bg-neutral-100 dark:bg-neutral-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl font-kanit text-black dark:text-white relative top-1 z-20")}>
        Contact Us
      </h1>
      <form onSubmit={onSubmit} className="z-20 flex flex-col gap-2 mt-6 items-center justify-center ">
        <Input type="text" placeholder="Username" required className="mt-3 mb-3 bg-neutral-700 dark:bg-neutral-900 placeholder:text-white"/>
        <Input type="text" placeholder="Email" required className="bg-neutral-700 placeholder:text-white dark:bg-neutral-900"/>
        <Textarea placeholder="Type your messsage here..." required className="mt-4 h-30 w-60 bg-neutral-700 dark:bg-neutral-900 placeholder:text-white"/>
        <Button type="submit" className="px-6 py-1 mt-2">Submit</Button>
        <p className="mt-3">{result}</p>
      </form>
    </div>
  );
}
