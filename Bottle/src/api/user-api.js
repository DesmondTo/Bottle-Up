import {
  URL_USER_SVC_SIGNUP,
  URL_USER_SVC_SIGNIN,
  URL_USER_SVC_SIGNOUT,
} from './constants';

export const signUpAPI = async (username, password) => {
  const signUpData = { username, password };
  const response = await fetch(URL_USER_SVC_SIGNUP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpData),
  });

  return response.json();
};

export const signInAPI = async (username, password) => {
  const signInData = { username, password };
  const response = await fetch(URL_USER_SVC_SIGNIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  });

  return response.json();
};

export const signOutAPI = async () => {
  const response = await fetch(URL_USER_SVC_SIGNOUT, {
    method: 'POST',
  });

  return response.json();
};
