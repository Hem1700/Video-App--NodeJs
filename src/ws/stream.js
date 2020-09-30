const stream = (socket)=>{
    socket.on('subscribe' , (data)=>{
        //subscribe /join a room
       socket.join(data.room)
       socket.join(data.socketId)
       //Inform other membeers in the room of the new user's arrival 
       if(socket.adaprer.rooms[data.room].length>1){
           socket.to(data.room).emit('new user' , {socketId:data.socketId})
       }

    })

    socket.on('newUserStart' , (data)=>{
        socket.io(data.to).emit('newUserStart'  , {sender:data.sender})
    })

    socket.on('sdp' , (data)=>{
        socket.to(data.to).emit('sdp' , {description:data.description , sender:data.sender})
    })

    socket.on('ice candidates' , (data)=>{
        socket.to(data.to).emit('ice candidates' , {candidates:data.candidates , sender:data.sender}) 
    })

    socket.on('chat' , (data)=>{
        socket.io(data.room).emit('chat' , {sender:data.sender , msg:data.msg})
    })
}

module.exports = stream