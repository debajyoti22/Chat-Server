const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);

const formatMessage = require('./utils/messages');
const {userjoin,getCurrentUser} = require('./utils/user');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//run when the client connects
io.on('connection',socket=>{
    socket.on('username',({username,room})=>{
        const user = userjoin(socket.id,username,room);
        socket.join(user.room);
        socket.emit('Message',formatMessage('Riddler','Welcome on board!')); // will notify the user joining 

        //response when an user connects
        socket.broadcast.to(user.room).emit('Message',formatMessage('Riddler',`${user.username} has joined`));     //will notify all the users , except the one joining 
    
        socket.on('chatMessage',msg=>{
            io.emit('Message',formatMessage(`${user.username}`,msg));
        });
       
          //when diconnects
          socket.on('disconnect',()=>{
              io.emit('Message',formatMessage('Riddler',`${user.username} has left`)); //io.emit informs everone abt the sttn
        });
    
    
    });


    console.log("New Ws Connection");
   
  //listen for chatMessage
 /* socket.on('chatMessage',msg=>{
      io.emit('Message',formatMessage('USER',msg));
  });
 
    //when diconnects
    socket.on('disconnect',()=>{
        io.emit('Message',formatMessage('Admin','A user has left')); //io.emit informs everone abt the sttn
  });*/
});
server.listen(process.env.PORT || 3000,function(){
    console.log("Server running on port 3000");
})
