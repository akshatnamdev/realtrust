"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "@/lib/axios";
import { API_BASE_URL } from "@/lib/utils";

interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Happy Clients</h2>
          <p className="text-center text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Happy Clients</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Hear what our satisfied clients have to say about their experience working with us
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((client) => (
            <Card key={client._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  {/* Client Image */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-blue-100 to-indigo-100">
                    {client.image ? (
                      <img
                        src={`${API_BASE_URL.replace('/api', '')}/uploads/${client.image}`}
                        alt={client.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                        {client.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Testimonial */}
                  <p className="text-gray-600 mb-4 italic">
                    "{client.description}"
                  </p>

                  {/* Client Info */}
                  <h4 className="font-bold text-lg text-gray-800">{client.name}</h4>
                  <p className="text-sm text-gray-500">{client.designation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clients.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No client testimonials available yet.</p>
        )}
      </div>
    </section>
  );
}