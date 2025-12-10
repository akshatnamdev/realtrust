"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import { API_BASE_URL } from "@/lib/utils";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Projects</h2>
          <p className="text-center text-gray-600">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Our Projects</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our portfolio of successful projects that showcase our expertise in design, consultation, and marketing
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project._id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100">
                {project.image ? (
                  <img
                    src={`${API_BASE_URL.replace('/api', '')}/uploads/${project.image}`}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No projects available yet.</p>
        )}
      </div>
    </section>
  );
}