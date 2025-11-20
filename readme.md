# Plato - Recipe Maker/Explorer App

## Overview
**Plato** is a recipe maker and explorer application designed to allow users to create, manage, and explore recipes with ease. The app is built with **Vue.js**, **TypeScript**, **SCSS**, and a backend powered by **.NET C#** with **MS SQL** for data storage.

Visit PLATO here: 03-recipe-planner.vercel.app
---

## Tech Stack
- **Frontend**: Vue.js, TypeScript, SCSS
- **Backend**: .NET C# API
- **Database**: MS SQL Server

---

## Features
1. **User Authentication**
   - Sign in and registration functionality
   - Secure authentication flow with hashed passwords

2. **Recipe Management**
   - Create new recipes with details such as title, ingredients, and instructions
   - Edit existing recipes
   - Delete recipes

3. **Recipe Exploration**
   - Browse and search through recipes
   - View detailed recipe information

4. **Favorites**
   - Add recipes to favorites
   - Remove recipes from favorites
   - View all favorite recipes

---

## Architecture Overview
- **Frontend**
  - Vue.js handles component-based rendering and dynamic interactions
  - TypeScript ensures type safety across the app
  - SCSS provides modular and maintainable styling

- **Backend**
  - .NET C# handles API endpoints for authentication, recipe management, and favorites
  - Secure CRUD operations connected to MS SQL Server

- **Data Flow**
  - Frontend sends API requests to backend services for data retrieval and mutation
  - Responses are handled and rendered dynamically on the UI
  - Authentication and favorites are persisted securely on the server

---

## Summary
Plato is a full-featured recipe management and exploration app, offering users the ability to create, edit, delete, and explore recipes. With user authentication, a robust backend, and a modular frontend built with Vue.js and TypeScript, Plato ensures a secure and seamless experience for food enthusiasts.
