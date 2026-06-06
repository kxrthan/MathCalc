"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setResult("Sending...");
    
    const formData = new FormData(form);
    formData.append("access_key", "cfe2271a-4c2e-4e70-a7c7-512a5be2d3d1");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();
      if (response.status === 200 || data.success) {
        setResult("Form Submitted Successfully!");
        form.reset();
      } else {
        console.error("Form error:", data);
        setResult(data.message || "Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Network or fetch error:", error);
      setResult("An error occurred. Please check console or try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required className="bg-background/50 h-12" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" required className="bg-background/50 h-12" placeholder="john@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea 
          id="message" 
          name="message" 
          required 
          className="flex min-h-[150px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Submit Message"}
      </Button>
      {result && (
        <div className={`p-4 mt-4 text-sm rounded-xl text-center font-semibold tracking-wide transition-all ${result.includes("Successfully") ? "bg-green-500/10 text-green-500 border border-green-500/20" : result.includes("Sending") ? "text-primary animate-pulse" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
          {result}
        </div>
      )}
    </form>
  );
}
