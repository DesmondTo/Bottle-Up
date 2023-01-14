import { URL_CHAT_SVC_READ, URL_CHAT_SVC_LATEST } from './constants';

export const readChatAPI = async bottleID => {
  const response = await fetch(
    URL_CHAT_SVC_READ + encodeURIComponent(bottleID),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.json();
};

export const getLatestChatAPI = async bottleID => {
  const response = await fetch(
    URL_CHAT_SVC_LATEST + encodeURIComponent(bottleID),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return response.json();
};
