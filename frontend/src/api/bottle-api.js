import {
    URL_BOTTLE_SERVICE_CREATE,
    URL_BOTTLE_SERVICE_FIND,
    URL_BOTTLE_SERVICE_THROW,
    URL_BOTTLE_SERVICE_COLLECT,
    URL_BOTTLE_SERVICE_GET_BOTTLES
  } from './constants';

  export const createBottleAPI = async (username) => {
    const createBottleData = { username };
    const response = await fetch(URL_BOTTLE_SERVICE_CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createBottleData),
    });
  
    return response.json();
  };

  export const findBottleAPI = async (username) => {
    const response = await fetch(URL_BOTTLE_SERVICE_FIND + '/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return response.json();
  };

  export const throwBottleAPI = async ( username, bottleID ) => {
    const bottleData = { username, bottleID };
    const response = await fetch(URL_BOTTLE_SERVICE_THROW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bottleData),
    });
  
    return response.json();
  };

  export const collectBottleAPI = async (username, bottleID) => {
    const bottleData = { username, bottleID };
    const response = await fetch(URL_BOTTLE_SERVICE_COLLECT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bottleData),
    });
  
    return response.json();
  };

  export const getBottlesAPI = async (username) => {
    const response = await fetch(URL_BOTTLE_SERVICE_GET_BOTTLES + '/' + username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return response.json();
  };
