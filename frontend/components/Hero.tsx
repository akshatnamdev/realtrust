"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import { z } from "zod";

const contactSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  city: z.string().min(2, "City is required"),
});

export default function Hero() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      contactSchema.parse(formData);
      setIsSubmitting(true);

      await axios.post("/contact", formData);
      setMessage("Thank you! We'll contact you soon.");
      setFormData({ fullname: "", email: "", mobile: "", city: "" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      } else {
        setMessage("Failed to submit. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-2 text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Consultation, Design<br />& Marketing
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Transform your business with expert consultation, creative design, and strategic marketing solutions
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          {/* Contact Form Sidebar */}
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
              {message && (
                <p className={`text-sm text-center ${message.includes("Thank") ? "text-green-600" : "text-red-600"}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}