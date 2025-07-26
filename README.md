# 🚀 Mateusz Śliwowski - Portfolio Next.js

[![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-black?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/) [![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/) [![Docker](https://img.shields.io/badge/Docker-24.1.0-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)

Modern developer portfolio built with Next.js 15 featuring a complete admin panel, multilingual support, and advanced functionalities.

## ✨ Features

### 🌐 Frontend

-   **Responsive design** - Full compatibility with mobile and desktop devices
-   **Animations and transitions** - Smooth animations with Framer Motion
-   **Keyboard navigation** - Full keyboard support for accessibility
-   **Multilingual** - Polish and English support (next-intl)
-   **SEO optimized** - Dynamic meta tags, sitemap and robots.txt

### 🎯 Portfolio Sections

-   **Home page** - Interactive presentation with animated intro
-   **About me** - Experience description and specializations
-   **Skills** - Categorized technical skills with icons
-   **Projects** - Project gallery with detailed descriptions
-   **Certificates and courses** - Timeline of completed training
-   **Blog** - Blog system with Markdown
-   **Contact** - Contact form with validation

### 🔧 Admin Panel

-   **Authentication** - Secure login system (Lucia Auth)
-   **CRUD operations** - Complete portfolio content management
-   **Project management** - Add, edit, delete projects
-   **Blog management** - Markdown editor with preview
-   **Skills management** - Categorization and icons
-   **Course management** - Certificate timeline
-   **CV management** - Upload and manage documents

### 🛠️ Backend & Database

-   **API Routes** - Server Actions for all operations
-   **Prisma ORM** - Type-safe MySQL database
-   **Redis** - Caching and sessions
-   **Validation** - Zod schemas for all forms
-   **File upload** - Secure project image management

## 🛠️ Technologies

### Frontend

-   **Next.js 15** - React framework with App Router
-   **React 19** - Latest React version
-   **TypeScript** - Type-safe development
-   **Tailwind CSS 4** - Utility-first CSS framework
-   **Framer Motion** - Animations and transitions
-   **Radix UI** - Accessible UI components
-   **iconify/react** - Icons

### Backend & Database

-   **Prisma** - Type-safe ORM
-   **MySQL** - Relational database
-   **Redis** - Caching and sessions
-   **Lucia Auth** - Authentication
-   **Nodemailer** - Email sending
-   **Zod** - Schema validation

### DevOps & Tools

-   **Docker** - Application containerization
-   **ESLint** - Code linting
-   **Winston** - Logging
-   **Google Analytics** - Analytics

## 📁 Project Structure

```
my_portfolio_nextjs/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── control/           # Admin panel
│   ├── home/              # Portfolio home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home-page-components/    # Home page components
│   ├── control-panel-components/ # Admin panel components
│   └── ui/               # Basic UI components
├── actions/              # Server Actions
├── lib/                  # Utility functions
├── prisma/              # Database schema
├── messages/            # Translation files
└── public/              # Static files
```

## 🔐 Admin Panel

The admin panel available at `/control` enables:

-   **Content management** - Edit all portfolio sections
-   **Project management** - CRUD operations on projects
-   **Blog management** - Markdown editor with preview
-   **Skills management** - Categorization and icons
-   **File upload** - Secure image management
-   **Analytics** - Basic statistics

## 🌍 Multilingual

The application supports Polish and English with automatic browser language detection.

### Tailwind CSS:

The project uses Tailwind CSS 4 with custom configuration in `tailwind.config.ts`

## 📈 Performance

-   **Lazy loading** - Components loaded on demand
-   **Image optimization** - Next.js Image component
-   **Code splitting** - Automatic code splitting
-   **Caching** - Redis cache for data
-   **SEO** - Dynamic meta tags and sitemap

## 📝 License

This project is private and not subject to open source licensing.

---

⭐ If you like this project, give it a star!
