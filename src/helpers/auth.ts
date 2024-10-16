import {jwtDecode, type JwtPayload } from 'jwt-decode';
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  if (!token) return false; 

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false; 
  }
};
