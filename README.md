# 📝 Sketchboard

A real-time collaborative sketchboard built using JavaScript and HTML5 Canvas. Users can draw, drop sticky notes, erase, undo/redo, and collaborate live.

---

## 🛠 Built With

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=flat)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat)
![Canvas API](https://img.shields.io/badge/-Canvas%20API-2D2D2D?style=flat)
![Socket.IO](https://img.shields.io/badge/-Socket.IO-010101?logo=socket.io&logoColor=white&style=flat)

---

## 🔧 Features

- ✏️ Freehand drawing with custom colors and brush sizes
- 🗒️ Sticky notes with editable content
- 🎯 Drag-and-drop support for sticky notes
- ↩️ Undo/Redo functionality
- 🧽 Eraser tool
- 🌐 Live collaboration (Socket.IO / WebSocket ready)

---

## 🚀 Getting Started

Clone the repo and open `index.html` in your browser.

If collaboration is needed, set up a Node.js server with Socket.IO.

```bash
git clone https://github.com/nam334/sketchboard.git
cd sketchboard
npm install
node server.js  # assuming you have a basic server setup for sockets
