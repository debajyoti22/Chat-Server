const chatform = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');


//get user name from url
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
});


const socket = io();
//adding the username

socket.emit('username',{username,room});
//message on server
socket.on('Message',message=>{
    console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
//message submit and is shown in the console
chatform.addEventListener('submit',(e)=>{
e.preventDefault();
const msg = e.target.elements.msg.value;
//emitting the messsage to the server
socket.emit('chatMessage',msg);
//clear input
e.target.elements.msg.value='';
e.target.elements.msg.focus();

});

//output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}.
    </p> `;
    document.querySelector('.chat-messages').appendChild(div);
}