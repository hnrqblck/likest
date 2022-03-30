import api from './LinkedInApi';

export const fetchUser = async () => {
    const { data } = await api("/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
      },
    })
    return data;
  };