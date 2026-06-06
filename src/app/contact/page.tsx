import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | MathCalc",
  description: "Get in touch with MathCalc for any questions, feedback, or tool requests.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-2xl">
      <div className="space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Contact <span className="text-primary">Us</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Have a question, feedback, or a request for a new calculator? Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
}
