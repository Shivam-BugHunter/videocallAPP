const createUserBtn = document.getElementById("create-user");
const username = document.getElementById("username");
const allusersHtml = document.getElementById("allusers");
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const socket = io();
let localStream;

const PeerConnection = (function(){
    let peerConnection;
    const createPeerConnection = ()=>{
        const config = {
            iceServers: [
                {
                    urls: "stun.l.google.com:19302"
                }
            ]
        }


        peerConnection = new RTCPeerConnection(config);

        localStream.getTracks().forEach(track=>{
            peerConnection.addTrack(track,localStream);
        })

        peerConnection.ontrack() = function(event){
            remoteVideo.srcObject = event.streams[0];
        }

        peerConnection.onicecandidate = function(event){
            if(event.candidate){

            }
        }
    }
    return {
        getInstance: ()=>{
            if(!peerConnection){
                peerConnection = createPeerConnection();
            }
            return peerConnection
        }
    }
})()

createUserBtn.addEventListener("click",(e)=>{
    if(username.value !==""){
        const usernameContainer = document.querySelector(".username-input");
        socket.emit("join-user", username.value);
        usernameContainer.style.display = 'none';
    }
});
socket.on("joined", allusers => {
    console.log({ allusers });
    const createUsersHtml = () => {
        allusershtml.innerHTML = "";
        for(const user in allusers){
            const li = document.createElement('li');
            li.textContent = `${user===username.value ? '(You)' : ""}`;

            if (user!==username.value){
                const button = document.createElement("button");
                button.classList.add("call-btn");
                button.addEventListener("click",(e)=>{
                    startCall(user);
                });
                const img = document.createElement("img");
                img.setAttribute("src", "");
                img.setAttribute("width", 20);
                button.appendChild(img);
                li.appendChild(button);
            }
            allusersHtml.appendChild(li);
        }

    }
    createUsersHtml();
})

const startCall = async (user)=>{
    console.log({user});
    const pc = PeerConnection.getInstance();
    const offer = await pc.createOffer();
    console.log({ offer });
    await pc.setLocalDescription(offer);
    socket.emit("offer",{from: username.value,to: user , offer: pc.localDescription});
}

const startMyVideo =async  ()=>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({audio:true, video:true});
        console.log({stream});
        localStream = stream;
        localVideo.srcObject = stream;

    }catch(error){}
}
startMyVideo();
