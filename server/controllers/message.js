const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  const roomId = req.body.roomId;
  try {
    const messages = await Message.find({ roomId }).sort([['createdAt', 'asc']]);
    return res.send({
      success: true,
      messages,
    });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};

exports.getLastMessagesByAdmin = async (req, res) => {
  try {
    const allChatRooms = await Message.find().distinct('roomId');
    const lastChatMessages = await Promise.all(
      allChatRooms.map((room) => {
        return Message.find({ roomId: room })
          .sort([['createdAt', 'desc']])
          .limit(1)
          .then((res) => {
            // console.log(res[0]);
            return res[0];
          });

        // return lastMessage[0]
      }),
    );
    return res.send({
      success: true,
      lastChatMessages,
    });
  } catch (error) {
    return res.status(400).send({ success: false, error });
  }
};
