"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Users, Mail, FileText } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: FolderOpen,
      href: "/admin/projects",
      color: "bg-blue-500",
    },
    {
      title: "Clients",
      description: "Manage client testimonials",
      icon: Users,
      href: "/admin/clients",
      color: "bg-green-500",
    },
    {
      title: "Contact Submissions",
      description: "View contact form entries",
      icon: Mail,
      href: "/admin/contacts",
      color: "bg-purple-500",
    },
    {
      title: "Newsletter Subscribers",
      description: "View newsletter subscribers",
      icon: FileText,
      href: "/admin/subscribers",
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">RealTrust Admin</h1>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline">View Site</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} p-3 rounded-lg text-white`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}