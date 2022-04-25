import api from './LinkedInApi';

export const pathUrl = 'https://linkedin.com/oauth/v2/authorization?response_type=code&client_id=' + process.env.REACT_APP_CLIENT_ID + '&redirect_uri=' + encodeURIComponent(process.env.REACT_APP_REDIRECT_URI) + '&state=' + Math.random() + '&scope=' + encodeURIComponent('r_liteprofile r_emailaddress w_member_social');

export const fetchUser = async (token) => {
    const { data } = await api("/me", {
      method: "GET",
      
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'https://api.linkedin.com/v2/me',
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
        "Content-Type": "x-www-form-urlencoded",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      },
    })
    return data;
  };

  export const _request = (method, hostname, path, headers, body) => {
    
      const reqOpts = {
        method,
        hostname,
        path,
        headers,
        "rejectUnauthorized": false
      };
      let resBody = "";
      return fetch(reqOpts, res => {
        console.log(res)
      })
      
  }