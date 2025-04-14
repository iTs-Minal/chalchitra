"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from 'motion/react';

export function ContactSection() {
  return (
    <div className="h-150 relative w-100% mx-6 overflow-hidden bg-neutral-900 flex flex-col justify-center rounded-lg">
      <div className="relative inset-0 w-full h-full bg-neutral-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <div className="flex justify-center" >
        <h1 className={cn("md:text-4xl text-xl text-white relative top-1 z-20")}>
        Contact Us
        </h1>

        <div className="flex items-center justify-center z-20">
        <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-auto gap-6 mt-3 mb-2">
          <motion.input
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white/30 dark:bg-darkHover/30 dark:border-white/90"
            type="text"
            placeholder="Enter your name"
            required
            name="name"
          />
          <motion.input
            initial={{ x: 10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white/30 dark:bg-darkHover/30 dark:border-white/90"
            type="email"
            placeholder="Enter your email"
            required
            name="email"
          />
        </div>
        <motion.textarea
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white/30 mb-6 dark:bg-darkHover/30 dark:border-white/90"
          rows={6}
          placeholder="Enter your message"
          required
          name="message"
        ></motion.textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          type="submit"
          className="py-2 px-4 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover"
        >
          Submit now{" "}
          
        </motion.button>

        <p className="mt-4">success</p>
      </motion.form>
        </div>

      </div>
      
    </div>
  );
}
