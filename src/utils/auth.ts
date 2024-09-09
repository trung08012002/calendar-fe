export const clearLS = () => {
  localStorage.removeItem('access_token');
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') ?? '';

export const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken);
};
