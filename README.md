# LUXE Residences

Live demo: https://luxe-residences.vercel.app/

## Overview

LUXE Residences is a premium real estate landing experience built with modern web tools. combining immersive storytelling, refined UI interactions, and responsive animation to present a luxury property brand focused on skyline penthouses, sky villas, amenities, and curated private viewings.
- includes the full frontend experience plus contact and appointment flows powered by Supabase and server-side API routes.

## What’s Included

The site is composed of a collection of high-end sections that reflect the live demo:

- **Hero** landing experience with premium branded messaging
- **Property showcase** with featured residences and collection cards
- **Tower dashboard** with floor selection, residence details, unit availability, and a stylized floor plan
- **Amenities** and **interiors** sections that highlight spa, wellness, dining, cinema, and other lifestyle spaces
- **Penthouses** and **private viewing** experiences with booking workflows
- **Interactive map** and **testimonials** for credibility and location storytelling
- **Contact / enquiry forms** with Supabase-backed API routes
- **Global layout elements** including custom cursor, loader, theme handling, and AI assistant UI

## Technologies Used

This site is built to feel polished and approachable at the same time. The stack is split between elegant front-end behavior, smooth client-side interactions, and server-powered form handling.

- **Front-end**
  - Next.js 16 with the App Router
  - React 19 and TypeScript for strong typing and composable UI
  - Tailwind CSS + PostCSS for design consistency and fast styling
  - Framer Motion for fluid animations and page transitions
  - GSAP + Lenis for silky smooth scrolling and subtle motion effects
  - React Three Fiber + Drei for immersive 3D and scene visuals
  - lucide-react for clean iconography
  - Custom cursor, loading screen, theme toggle, and assistant UI for premium polish

- **Back-end / API**
  - Next.js API routes for contact and appointment submissions
  - Supabase server-side client for enquiries and booking persistence
  - Optional Resend email integration for notifications when configured
  - Built-in validation and friendly response handling on the server

- **Data & integrations**
  - Static data collections for floors, units, amenities, and properties
  - Dynamic form submission with `fetch()` and JSON payloads
  - Supabase-backed `enquiries` and `appointments` tables
  - Live-ready deployment on Vercel

- **Developer tools**
  - ESLint and TypeScript for reliable code quality
  - Prettier with Tailwind plugin for consistent formatting
  - Tailwind v4 for modern utility-based styling
  - Vercel-friendly build scripts and app structure

## Why this feels premium

LUXE Residences is designed to look and behave like a high-end property experience, while still being easy to update.

- polished typography and spacious layout
- smooth motion, layered texture, and refined hover states
- interactive floorplan and residence details for an engaging tour
- reliable enquiry and appointment flows that feel direct and personal
- rich dark palette with warm gold accents for a luxury atmosphere

