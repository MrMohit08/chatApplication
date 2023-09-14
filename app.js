const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io')
const PORT = process.env.PORT || 3000 
app.use(express.static(path.join(__dirname, "public")));

app.get('/' , (req,res)=>{
      res.sendFile(__dirname + '/index.html') 
})
const server = app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));

// Socket.io implementation
  const io = socket(server);
   io.on('connection' , socket =>{
     console.log("User connected...")  
     socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })  
    socket.on('disconnect', ()=>{
        console.log('user disconnected')
    })
   })

