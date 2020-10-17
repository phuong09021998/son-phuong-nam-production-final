const { server } = require('../app');
const io = require('socket.io')(server);
const Message = require('../models/Message');

const users = {};
io.on('connect', (socket) => {
  socket.on('Login', ({ userId }) => {
    console.log('A user ' + userId + ' connected');
    // saving userId to array with socket ID
    users[socket.id] = userId;
    io.emit('Active Users', users);
  });

  socket.on('Join room', ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on('Chat Message', async ({ data, roomId }) => {
    const message = new Message(data);

    try {
      await message.save();
      io.in(roomId).emit('Chat Message', data);
      io.emit('Admin Last Messages', { sender: data.sender });
    } catch (error) {
      io.in(roomId).emit('Chat Error', error);
    }
  });

  socket.on('Initialize Chat', async ({ roomId, roomName }) => {
    const messageData = {
      sender: 'Admin',
      createdAt: Date.now(),
      roomId: roomId,
      type: 'text',
      message: 'Xin chào! Chúng tôi có thể hỗ trợ bạn thông tin gì?',
      roomName: roomName,
    };
    try {
      const message = new Message(messageData);
      await message.save();
      io.in(roomId).emit('Chat Message', messageData);
    } catch (error) {
      console.log(error.response);
    }
  });

  socket.on('Set seen', async ({ user, roomId }) => {
    try {
      await Message.updateMany({ roomId, sender: user }, { seen: true });

      io.in(roomId).emit('Set Seen');
    } catch (error) {
      console.log(error.response);
    }
  });

  socket.on('disconnect', () => {
    console.log('user ' + users[socket.id] + ' disconnected');
    // remove saved socket from users object
    delete users[socket.id];
    io.emit('Active Users', users);
  });
});
