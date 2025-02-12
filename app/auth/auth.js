export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function getUserUsername(token) {
  if (token === undefined || token === null) {
    return;
  }
  const decodedToken = parseJwt(token);
  return decodedToken.username;
}

export function getUserId(token) {
  if (token === undefined || token === null) {
    return;
  }
  const decodedToken = parseJwt(token);
  return decodedToken.id;
}

export function getUserEmail(token) {
  if (token === undefined || token === null) {
    return;
  }
  const decodedToken = parseJwt(token);
  return decodedToken.email;
}
