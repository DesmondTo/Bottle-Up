import {
  ormCreateChat as _createChat,
  ormGetChats as _getChats,
  ormGetLatestChat as _getLatestChat,
} from '../model/chat-orm.js';

export function joinBottle(socket) {
  // room id === bottle id
  socket.on('join-bottle', (bottleID) => {
    console.log(`Joined bottle with id: ${bottleID}!`);
    socket.join(bottleID);
  });
}

async function createChat(bottleID, createdAt, username, text) {
  try {
    if (bottleID && username && text) {
      const createResp = await _createChat(bottleID, createdAt, username, text);

      if (createResp.err) {
        return {
          success: false,
          feedback: 'Failed to send message!',
        };
      }

      // If no error, "createResp" is the new chat sent with additional "_id" field.
      // This value of key "_id" will be used as key prop in chat list.
      return { success: true, chatSent: createResp, feedback: 'Message sent!' };
    } else {
      const missingField = `${
        !bottleID
          ? 'Bottle ID is'
          : !createdAt
          ? 'Message create datetime is'
          : !username
          ? 'Sender username is'
          : !text
          ? 'Chat message is'
          : 'Some chat fields are'
      }`;

      return { success: false, feedback: `${missingField} missing!` };
    }
  } catch (err) {
    return {
      success: false,
      feedback: `Something when wrong!\nERR: ${err.message}`,
    };
  }
}

export function handleChat(io, socket) {
  socket.on('send-chat', async (bottleID, username, text) => {
    if (bottleID !== '') {
      const resp = await createChat(
        bottleID,
        new Date().toISOString(),
        username,
        text
      );
      const isSentSuccess = resp.success;
      const feedback = resp.feedback;
      const chatSent = resp.chatSent;

      // When one client send a chat message, another client
      // with the same bottleID will receive the chat.
      console.log(feedback);
      io.in(bottleID).emit(
        'receive-chat',
        isSentSuccess,
        feedback,
        username,
        chatSent
      );
    }
  });
}

export async function readChats(req, res) {
  try {
    const { bottleID } = req.query;
    if (bottleID) {
      const resp = await _getChats(bottleID);

      if (resp.err) {
        return res
          .status(400)
          .json({ success: false, message: 'Chats not found!' });
      }

      return res.status(200).json({ success: true, chats: resp });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Bottle not found! Failed to retrieve chats.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Database failure when reading chats!\nERR: ${err.message}`,
    });
  }
}

export async function getLatestChat(req, res) {
  try {
    const { bottleID } = req.query;
    if (bottleID) {
      const resp = await _getLatestChat(bottleID);

      if (resp.err) {
        return res
          .status(400)
          .json({ success: false, message: 'Latest chat not found!' });
      }

      return res.status(200).json({ success: true, chats: resp });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Bottle not found! Failed to retrieve chats.',
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Database failure when getting latest chat!\nERR: ${err.message}`,
    });
  }
}
