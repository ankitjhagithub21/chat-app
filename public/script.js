const socket = io()
const joinBtn = document.getElementById('join-btn')
const username = document.getElementById('username')
const joinChat = document.getElementById('join-chat')
const chatContainer = document.getElementById('chat-container')
const messageContainer = document.getElementById('message-container')
const userMsg = document.getElementById('user-msg')
const sendMsg = document.getElementById('send-msg')

joinBtn.addEventListener('click',()=>{

    if(username.value==""){
        console.log("Username is empty")
    }else{
        joinChat.style.display="none"
        chatContainer.style.display="block"

        socket.emit('join',username.value);

    }
})

sendMsg.addEventListener('click',()=>{
    const message = userMsg.value;
    if(message){
        socket.emit('message', message);
        userMsg.value = '';
    }
})

socket.on('userJoined', (message) => {
    messageContainer.innerHTML += `<p class="text-center fs-5">${message}</p>`;
});

socket.on('message', (message) => {
    
    messageContainer.innerHTML += `<p class="message">${message}</p>`;
  });

  socket.on('userLeft', (message) => {
    messageContainer.innerHTML += `<div class="text-center fs-5">${message}</div>`;
  });
