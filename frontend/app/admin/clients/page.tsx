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

interface Client {
  _id: string;
  name: string;
  description: string;
  designation: string;
  image: string;
}

export default function AdminClients() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", designation: "" });
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
    fetchClients();
  }, [router]);

  const fetchClients = async () => {
    try {
      const response = await axios.get("/clients");
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
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
      formDataToSend.append("designation", formData.designation);
      
      if (croppedImage) {
        formDataToSend.append("image", croppedImage, "client.jpg");
      }

      if (editingClient) {
        await axios.put(`/clients/${editingClient._id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/clients", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchClients();
      closeDialog();
    } catch (error) {
      console.error("Failed to save client:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`/clients/${id}`);
        fetchClients();
      } catch (error) {
        console.error("Failed to delete client:", error);
      }
    }
  };

  const openDialog = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({ 
        name: client.name, 
        description: client.description,
        designation: client.designation 
      });
    } else {
      setEditingClient(null);
      setFormData({ name: "", description: "", designation: "" });
    }
    setImageFile(null);
    setImagePreview("");
    setCroppedImage(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingClient(null);
    setFormData({ name: "", description: "", designation: "" });
    setImageFile(null);
    setImagePreview("");
    setCroppedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Clients</h1>
          <div className="flex gap-2">
            <Button onClick={() => openDialog()}>
              <Plus className="w-4 h-4 mr-2" /> Add Client
            </Button>
            <Link href="/admin">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <Card key={client._id}>
              <CardHeader>
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                  {client.image ? (
                    <img
                      src={`${API_BASE_URL.replace('/api', '')}/${client.image}`}
                      alt={client.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                      {client.name.charAt(0)}
                    </div>
                  )}
                </div>
                <CardTitle className="text-center">{client.name}</CardTitle>
                <p className="text-sm text-gray-500 text-center">{client.designation}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 text-center italic">"{client.description}"</p>
                <div className="flex gap-2 justify-center">
                  <Button size="sm" variant="outline" onClick={() => openDialog(client)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(client._id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {clients.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p>No clients yet. Click "Add Client" to create one.</p>
          </div>
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Client Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Designation</label>
              <Input
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Testimonial</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Client Photo</label>
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
                {editingClient ? "Update" : "Create"}
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