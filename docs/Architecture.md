# HomeBusinessPOS - Project Architecture

## Project Vision

HomeBusinessPOS is a lightweight, modern, and production-ready Point of Sale (POS) and Order Management application designed for home businesses.

The application is built to support both Mobile (Android & iOS) and Web from a single codebase using React Native and Expo.

The main goal is to provide a fast, beautiful, and simple application that is easy to use while maintaining clean architecture and high code quality.

---

# Tech Stack

## Frontend

* React Native
* Expo SDK 54
* TypeScript
* Expo Router

## Local Storage

* AsyncStorage

## Forms

* React Hook Form
* Zod

## UI

* Custom Design System
* Light Theme
* Dark Theme

---

# Project Structure

```text
app/
src/
docs/
```

## app

Contains only routing and navigation.

No business logic should exist inside this folder.

---

## src

Contains the complete application source code.

### assets

Fonts

Icons

Images

Illustrations

### core

Shared application modules.

Contains:

* Components
* Theme
* Storage
* Services
* Hooks
* Constants
* Utilities
* Context
* Config

### features

Each feature is completely isolated.

Current Features:

* Dashboard
* Products
* POS
* Orders
* Expenses
* Reports
* Settings

### navigation

Shared navigation helpers.

### types

Global application types.

---

# Architecture Rules

1. Every feature must be isolated.

2. Shared code belongs inside Core.

3. Business logic must never exist inside UI components.

4. AsyncStorage access must only happen inside Storage classes.

5. Components should remain small and reusable.

6. Avoid duplicated code.

7. Never hardcode colors, spacing, typography or radius values.

8. Use the Design System everywhere.

9. Keep files small and readable.

10. Prefer composition over duplication.

---

# Development Order

1. Foundation

2. Design System

3. Shared Components

4. Navigation

5. Storage

6. Products

7. POS

8. Orders

9. Expenses

10. Dashboard

11. Reports

12. Settings

---

# Coding Standards

* TypeScript Strict Mode

* PascalCase for Components

* camelCase for variables

* One responsibility per component

* Feature-based architecture

* Reusable components

* Clean folder structure

---

# Goal

Build a commercial-quality application that is clean, maintainable, scalable, and ready for future expansion without requiring architectural changes.
