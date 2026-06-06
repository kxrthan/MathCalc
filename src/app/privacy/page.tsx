import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | MathCalc",
  description: "Read the Privacy Policy of MathCalc to understand how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <div className="space-y-8 bg-background/60 backdrop-blur-xl border border-foreground/20 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Privacy <span className="text-primary">Policy</span>
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
          <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
          <p>
            At MathCalc, your privacy is our top priority. This Privacy Policy details what information we collect, how it is used, and the security measures we employ. 
            Because our calculators are built to run directly within your web browser (client-side), your calculation data is inherently secure.
          </p>
          <h2>1. Information We Collect</h2>
          <p>
            We do not require you to create an account, log in, or provide personal details to use our calculators. We may collect anonymous, aggregated usage analytics to help us understand which tools are most popular and improve our multipage application.
            If you reach out via our <a href="/contact" className="text-primary hover:underline">Contact Form</a>, we will collect your name and email solely for the purpose of replying to your inquiry.
          </p>
          <h2>2. Data Storage & Security</h2>
          <p>
            Calculations performed on MathCalc (such as entering your weight in the BMI calculator or loan details in the Mortgage calculator) happen entirely on your local device. <strong>We do not send, intercept, or store your sensitive input data on our servers.</strong>
          </p>
          <h2>3. Cookies</h2>
          <p>
            We may use minimal cookies to save your theme preferences (Dark/Light mode) or to facilitate basic website analytics. You can disable cookies at any time through your browser settings.
          </p>
          <h2>4. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites. We are not responsible for the privacy practices of those external websites.
          </p>
          <h2>5. Changes to this Policy</h2>
          <p>
            We reserve the right to modify this Privacy Policy. Any updates will be posted directly to this page.
          </p>
        </div>
      </div>
    </div>
  );
}
