"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      emailSchema.parse(email);
      setIsSubmitting(true);

      await axios.post("/subscribe", { email });
      setMessage("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors[0].message);
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Stay updated with our latest projects, insights, and exclusive offers
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-lg bg-white"
              required
            />
            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {message && (
            <p
              className={`mt-4 text-sm ${
                message.includes("Success") ? "text-green-200" : "text-red-200"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-blue-100 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}