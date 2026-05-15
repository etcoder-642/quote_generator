# Quote Generator App

A robust, modular web application that fetches inspirational quotes from [API Ninjas](https://api-ninjas.com/) and provides tools to organize, like, and save them into custom libraries. The app features persistent storage using `localStorage` and a clean, user-friendly interface.

## 🚀 Live Demo
Visit the live application here: [https://etcoder-642.github.io/quote_generator](https://etcoder-642.github.io/quote_generator)

---

## ✨ Features
* **Dynamic Generation**: Fetch quotes by specific categories (e.g., philosophy, nature, science) or by specific authors.
* **Interactive UI**: "Like" quotes to keep them in a dedicated favorites list.
* **Quote Libraries**: Create custom libraries (collections) to save and organize your favorite quotes.
* **Persistence**: All liked and saved quotes are stored in your browser's `localStorage`, ensuring your data remains after a page refresh.
* **Responsive Design**: A clean, overlay-based UI for managing libraries and viewing favorites.
* **Toast Notifications**: Visual feedback when saving quotes.

---

## 📸 Visual Demo


### 1. Main Dashboard
<img width="1889" height="879" alt="image" src="https://github.com/user-attachments/assets/89a080b0-37a1-4dd9-bb81-4ebe1331918d" />

---

## 🛠 Tech Stack
* **JavaScript (ES6+)**: Logic modularized into `app.js` (API), `service.js` (State management), and `display.js` (DOM manipulation).
* **CSS3**: Custom styling for components, overlays, and modals.
* **Webpack**: Module bundling.
* **API**: [API Ninjas Quotes API](https://api-ninjas.com/api/quotes).
* **Libraries**: [Toastify-js](https://github.com/apvarun/toastify-js) for notifications.

---

## ⚙️ How to Run Locally

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/etcoder-642/quote_generator.git
    cd quote_generator
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development build**:
    ```bash
    npm run dev
    # or follow your project's defined build script
    ```

---

## 📂 Project Structure
```text
quote_generator/
|- src/
   |- styles/       # CSS files
   |- utils/        # Modular JS logic
      |- app.js     # API integration logic
      |- display.js # DOM and UI updates
      |- service.js # State management & LocalStorage
   |- index.js      # Main entry point
|- index.html       # Main structure
|- webpack.config.js
```
---
