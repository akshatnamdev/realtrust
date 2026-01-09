<div align="center">

# 🚀 RealTrust

### *Professional Consultation, Design & Marketing Platform*

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**A modern, full-stack web application for consultation, design, and marketing services with a powerful admin panel and dynamic content management.**

[Live Demo](#) • [Documentation](#-documentation) • [Report Bug](../../issues) • [Request Feature](../../issues)

![RealTrust Preview](https://via.placeholder.com/1200x600/4F46E5/FFFFFF?text=RealTrust+Platform)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Frontend Excellence**
- ⚡ **Next.js 14** with App Router
- 🎯 **TypeScript** for type safety
- 💅 **Tailwind CSS** + ShadCN UI
- 📱 Fully **responsive** design
- 🖼️ Advanced **image cropping**
- ✅ **Form validation** with Zod
- 🔄 Real-time **API integration**

</td>
<td width="50%">

### 🖥️ **Backend Power**
- 🚀 **Express.js** REST API
- 🗄️ **MongoDB** + Mongoose ODM
- 📤 File **upload** & processing
- 🎨 **Sharp** image optimization
- 🔒 **CORS** configured
- 🛡️ Error handling & validation
- 📊 Complete **CRUD** operations

</td>
</tr>
</table>

---

## 🎯 What's Inside?

### 📄 **Landing Page**
```
✓ Hero Section with Contact Form      ✓ Projects Showcase
✓ Client Testimonials                 ✓ Newsletter Subscription
✓ Professional Footer                 ✓ Smooth Animations
```

### 🎛️ **Admin Panel**
```
✓ Secure Login System                 ✓ Project Management (CRUD)
✓ Client Management (CRUD)            ✓ Contact Form Submissions
✓ Newsletter Subscribers              ✓ Image Upload & Cropping
```

### 🔌 **API Endpoints**
```
✓ /api/projects                       ✓ /api/clients
✓ /api/contact                        ✓ /api/subscribe
✓ Complete CRUD Operations            ✓ Image Processing
```

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
MongoDB >= 6.0.0
npm or yarn
```

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/realtrust.git
cd realtrust

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Configuration

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realtrust
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit:
- 🌐 **Frontend:** http://localhost:3000
- 🔧 **Backend API:** http://localhost:5000/api
- 👨‍💼 **Admin Panel:** http://localhost:3000/admin/login

**Default Admin Credentials:**
```
Username: admin
Password: admin123
```

---

## 📂 Project Structure

```
realtrust/
├── frontend/                  # Next.js Application
│   ├── app/                  # App Router Pages
│   │   ├── page.tsx         # Landing Page
│   │   └── admin/           # Admin Panel
│   ├── components/          # React Components
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   ├── Clients.tsx
│   │   ├── Newsletter.tsx
│   │   └── ui/              # ShadCN Components
│   └── lib/                 # Utilities
│
├── backend/                  # Express API Server
│   └── src/
│       ├── models/          # Mongoose Models
│       ├── routes/          # API Routes
│       ├── middleware/      # Express Middleware
│       └── server.js        # Entry Point
│
└── docs/                    # Documentation
    ├── QUICK_START.md
    ├── DEPLOYMENT.md
    ├── API_DOCUMENTATION.md
    └── TROUBLESHOOTING.md
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 14 • TypeScript • Tailwind CSS • ShadCN UI • React Hook Form • Zod • Axios • React Easy Crop |
| **Backend** | Node.js • Express.js • MongoDB • Mongoose • Multer • Sharp • CORS |
| **DevOps** | Vercel • Render • MongoDB Atlas • Git |

</div>

---

## 📸 Screenshots

<div align="center">

### Landing Page
![Landing Page](https://via.placeholder.com/800x500/4F46E5/FFFFFF?text=Landing+Page)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x500/10B981/FFFFFF?text=Admin+Dashboard)

### Project Management
![Project Management](https://via.placeholder.com/800x500/F59E0B/FFFFFF?text=Project+Management)

</div>

---

## 🌐 Deployment

### Quick Deploy (Free Hosting)

**1. Database - MongoDB Atlas**
```bash
✓ Create free cluster at mongodb.com/cloud/atlas
✓ Get connection string
✓ Add to environment variables
```

**2. Backend - Render**
```bash
✓ Connect GitHub repo at render.com
✓ Configure build command: npm install
✓ Set start command: npm start
✓ Add environment variables
```

**3. Frontend - Vercel**
```bash
✓ Import project at vercel.com
✓ Set root directory: frontend
✓ Add NEXT_PUBLIC_API_URL
✓ Deploy
```

**Detailed deployment guide:** [DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📚 Documentation

<table>
<tr>
<td width="33%">

### 📖 [Quick Start](docs/QUICK_START.md)
Get running in 5 minutes with our step-by-step setup guide.

</td>
<td width="33%">

### 🚀 [Deployment Guide](docs/DEPLOYMENT.md)
Deploy to production with MongoDB Atlas, Render, and Vercel.

</td>
<td width="33%">

### 📡 [API Reference](docs/API_DOCUMENTATION.md)
Complete API documentation with examples and code snippets.

</td>
</tr>
<tr>
<td width="33%">

### 🔧 [Troubleshooting](docs/TROUBLESHOOTING.md)
Solutions to 20+ common issues and debugging tips.

</td>
<td width="33%">

### 📊 [Project Summary](docs/PROJECT_SUMMARY.md)
Complete overview of features, structure, and capabilities.

</td>
<td width="33%">

### 💡 [Contributing](#-contributing)
Guidelines for contributing to the project.

</td>
</tr>
</table>

---

## 🎨 Key Features

### 🖼️ **Advanced Image Processing**
- Frontend image cropping with React Easy Crop
- Backend automatic resize to 450×350px
- JPEG conversion with 90% quality
- Automatic cleanup of old images

### 📝 **Smart Form Handling**
- Client-side validation with Zod
- Real-time error messages
- Loading states and success feedback
- Duplicate email prevention

### 🎯 **Admin Panel**
- Secure authentication system
- Full CRUD operations for all entities
- Intuitive table views
- Modal-based forms
- Responsive design

---

## 🔌 API Overview

### Available Endpoints

| Resource | GET | POST | PUT | DELETE |
|----------|-----|------|-----|--------|
| `/api/projects` | ✅ | ✅ | ✅ | ✅ |
| `/api/clients` | ✅ | ✅ | ✅ | ✅ |
| `/api/contact` | ✅ | ✅ | ❌ | ✅ |
| `/api/subscribe` | ✅ | ✅ | ❌ | ✅ |

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "John Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "city": "New York"
  }'
```

**Full API documentation:** [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

---

## 🧪 Testing

```bash
# Frontend
cd frontend
npm run lint              # Run ESLint
npm run build             # Test production build

# Backend
cd backend
npm start                 # Test production mode

# API Testing
curl http://localhost:5000/api/health
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

[Report a bug →](../../issues/new?template=bug_report.md)

---

## 💡 Feature Requests

Have an idea? We'd love to hear it!

[Request a feature →](../../issues/new?template=feature_request.md)

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/yourusername/realtrust?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/realtrust?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/realtrust)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/realtrust)

**3,300+** lines of code • **25+** components • **15+** API endpoints • **6** documentation files

</div>

---

## 🗺️ Roadmap

- [x] Landing page with all sections
- [x] Complete admin panel
- [x] Image upload and cropping
- [x] API with CRUD operations
- [x] Comprehensive documentation
- [ ] JWT authentication
- [ ] Email notifications
- [ ] Search and filter functionality
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourname)
- Email: your.email@example.com
- Website: [yourwebsite.com](https://yourwebsite.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - Beautiful UI components
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Express.js](https://expressjs.com/) - Fast, minimalist web framework
- [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing

---

## 💬 Support

Need help? Here are some resources:

- 📖 [Documentation](docs/)
- 💬 [Discussions](../../discussions)
- 🐛 [Issues](../../issues)
- 📧 Email: support@realtrust.com

---

## ⭐ Show Your Support

If this project helped you, please consider giving it a ⭐️!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/realtrust&type=Date)](https://star-history.com/#yourusername/realtrust&Date)

---

<div align="center">

### 🚀 Ready to Get Started?

[View Documentation](docs/QUICK_START.md) • [Live Demo](#) • [Deploy Now](docs/DEPLOYMENT.md)

**Made with ❤️ by developers, for developers**

---

© 2024 RealTrust. All rights reserved.

</div>
