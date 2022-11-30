import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';


export const getTokenData = () => {
  try {
    return jwtDecode(getAuthData().jwtToken);
  } catch (error) {
    return undefined;
  }
};

export const isAuthenticated = () => {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const getAuthenticatedUser = () => {
  const tokenData = getTokenData();
  return tokenData.nameid;
};

export const hasAnyRoles = (roles) => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();
  if (tokenData !== undefined) {
    return roles.includes(tokenData.role);
  }

  return false;
};