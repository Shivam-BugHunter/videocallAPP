VideoCallAPP 🚀

A real-time video calling web application built with Node.js, Express, Socket.io, and WebRTC — enabling peer-to-peer video communication directly in the browser. This project uses a simple server to handle signaling events to connect two users for a video call.

🔧 Features

✔ Real-time video call setup between two users
✔ Peer-to-peer communication using WebRTC
✔ Signaling handled via Socket.io
✔ Simple Express server to serve client and handle socket events
✔ Pluggable frontend — connect multiple clients easily
(Add/edit based on actual features you have)

🧱 Tech Stack
Layer	Technology
💻 Backend	Node.js, Express
🔌 Real-Time Comm	Socket.io
📹 Video Streaming	WebRTC
🌐 Frontend	HTML, CSS, JavaScript
🛠 Dev Tools	Nodemon
📦 Installation

Clone the repository

git clone https://github.com/Shivam-BugHunter/videocallAPP.git
cd videocallAPP

Install dependencies

npm install

Start the server

npm start

Open your browser
Visit: http://localhost:9000

💡 How It Works

User A opens the app and joins the socket server.

User A shares their username/ID with User B.

User B enters that ID to initiate a call.

The app uses WebRTC for actual media transfer and Socket.io for signaling:

offer is sent from caller to callee

answer is returned back

ICE candidates are exchanged

A connection is established

Users can then end the call, triggering cleanup.

This architecture enables peer-to-peer video with minimal server involvement.

📁 Project Structure
videocallAPP/
├─ app/                  # Frontend HTML/CSS/JS client files
├─ node_modules/         # Installed dependencies
├─ server.js             # Express + Socket.io server
├─ package.json          # Project configs & scripts
├─ README.md             # This documentation

The server uses socket.io to exchange offers, answers, and ICE candidates between clients to establish WebRTC connections.

🧠 Socket Events (Signaling)
Event Name	Description
join-user	User joins with a username
offer	Caller offers connection details
answer	Callee answers the offer
icecandidate	WebRTC ICE candidates exchange
end-call	Caller ends the call
call-ended	Notify disconnection


📌 Tips

✅ Ensure your browser supports WebRTC
✅ Test with HTTPS (some browsers restrict media without a secure context)
✅ Open in different tabs/devices to simulate two peers
