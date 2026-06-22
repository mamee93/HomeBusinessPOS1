# HomeBusinessPOS Architecture

## Tech Stack

- Expo SDK 54
- React Native
- Expo Router
- TypeScript
- AsyncStorage
- React Hook Form

---

# Architecture

Feature Based Architecture

src/

core/
features/
components/
theme/
types/
utils/

---

# Core

Core يحتوي فقط على الخدمات المشتركة.

- analytics
- storage
- services

---

# Features

كل Feature يحتوي على:

components/
hooks/
services/
types/
utils/
screens/

---

# Rules

- يمنع استخدام AsyncStorage خارج Services.
- يمنع Business Logic داخل Screens.
- يمنع الحسابات داخل Components.
- جميع الحسابات داخل Core Analytics.
- جميع الألوان من Theme.
- جميع البيانات Typed.
- يمنع استخدام any.

---

# Data Flow

Screen

↓

Hook

↓

Service

↓

Core

↓

Storage

---

# UI

جميع الواجهات تعتمد على:

AppButton

AppCard

AppInput

AppPage

AppSection

AppText

AppDivider

AppEmptyState

ولا يسمح باستخدام مكونات React Native مباشرة إلا إذا لم يوجد بديل داخل UI Library.