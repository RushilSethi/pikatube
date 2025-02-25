# **Pikatube 🎥**  
*A simple, free, and engaging video-sharing platform!*  

![Pikatube Banner](https://pikatube.vercel.app/pikachu-logo.svg)  

[Live Demo 🚀](https://pikatube.vercel.app)  

---

## **📌 Features**  
- 🔍 **Watch videos** – Stream content from creators around the world.  
- ⬆️ **Upload your own videos** – Share your content with others.  
- 🎨 **Create & manage channels** – Customize your channel for better engagement.  
- 👍 **Like & comment on videos** – Interact with creators and build a community.  
- 🛠️ **User-friendly interface** – Clean, minimal, and dark-themed UI.  
- 🔒 **Secure authentication** – JWT-based authentication for safe login.  

---

## **🛠️ Tech Stack**  
**Frontend:**  
- React(Vite) ⚛️  
- Redux Toolkit  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  

**Hosting:**  
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---

## **🚀 Getting Started**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/RushilSethi/pikatube.git
cd pikatube
```

### **2️⃣ Setup Backend**  
```bash
cd backend
npm install
```
- Create a `.env` file and add:  
  ```
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-jwt-secret
  PORT=5000
  ```
- Start the server:  
  ```bash
  npm start
  ```

### **3️⃣ Setup Frontend**  
```bash
cd ../frontend
npm install
```
- Create a `.env` file in `frontend` and add:  
  ```
  VITE_BACKEND_URL=your-backend-url
  ```
- Start the frontend:  
  ```bash
  npm run dev
  ```

---

## **📢 Roadmap & Future Plans**  
✅ **Basic video upload & playback**  
✅ **User authentication & channels**  
⬜ **Subscriptions & notifications** *(Subscriptions Added, Notifications Under Development!)*    

---

## **🙌 Contributing**  
Want to improve Pikatube? Feel free to fork the repo, make your changes, and submit a pull request!  

---

## **🌟 Show Some Love!**  
If you like this project, consider **starring** ⭐ the repo on GitHub!  

---


