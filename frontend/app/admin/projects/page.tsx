"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "@/lib/axios";
import { API_BASE_URL } from "@/lib/utils";
import { Trash2, Edit, Plus } from "lucide-react";
import ImageCropper from "@/components/ImageCropper";

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [showCropper, setShowCropper] = useState(false);
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchProjects();
  }, [router]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    setCroppedImage(croppedBlob);
    setShowCropper(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      
      if (croppedImage) {
        formDataToSend.append("image", croppedImage, "project.jpg");
      }

      if (editingProject) {
        await axios.put(`/projects/${editingProject._id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/projects", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProjects();
      closeDialog();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error("Failed to delete project:", error);
      }
    }
  };

  const openDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({ name: project.name, description: project.description });
    } else {
      setEditingProject(null);
      setFormData({ name: "", description: "" });
    }
    setImageFile(null);
    setImagePreview("");
    setCroppedImage(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({ name: "", description: "" });
    setImageFile(null);
    setImagePreview("");
    setCroppedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <div className="flex gap-2">
            <Button onClick={() => openDialog()}>
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id}>
              <CardHeader>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
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
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => openDialog(project)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(project._id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p>No projects yet. Click "Add Project" to create one.</p>
          </div>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Project Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Project Image</label>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {croppedImage && (
                <p className="text-sm text-green-600 mt-2">Image cropped and ready to upload</p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProject ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {showCropper && imagePreview && (
        <ImageCropper
          image={imagePreview}
          onCropComplete={handleCropComplete}
          onClose={() => setShowCropper(false)}
        />
      )}
    </div>
  );
}