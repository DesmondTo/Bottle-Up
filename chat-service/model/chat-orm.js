import {
  createChat,
  getChatsByBottleID,
  getLatestChatByBottleID,
} from './repository.js';

// need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateChat(bottleID, createdAt, username, text) {
  try {
    const newChat = await createChat({
      bottleID,
      createdAt,
      username,
      text,
    });

    return await newChat.save();
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}

export async function ormGetChats(bottleID) {
  try {
    const chats = await getChatsByBottleID(bottleID);
    if (chats.length < 1) {
      return { err: true };
    }
    return chats;
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}

export async function ormGetLatestChat(bottleID) {
  try {
    const latestChat = await getLatestChatByBottleID(bottleID);
    if (!latestChat) {
      return { err: true };
    }

    return latestChat;
  } catch (err) {
    console.log(`ERROR: ${err}`);
    return { err };
  }
}
