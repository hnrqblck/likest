import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.linkedin.com/v2',
    headers: {
      Authorization: "Bearer  " + process.env.REACT_APP_ACCESS_TOKEN,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

    },
});

export const linkedInProfileData = async (access_token) => {
  return new Promise((resolve, reject) => {

    var myHeaders = new Headers();

    const url = 'https://api.linkedin.com/v2/me'

    myHeaders.set('Authorization', 'Bearer ' + access_token);
    myHeaders.append('Content-Type', 'application/json')
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:3000' )

    fetch(url, {
      method: 'GET',
      headers: myHeaders,
      mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject();
        }
      });
  });
};

// export const ShareText = async ({ access_token, author }) => {
//   return new Promise((resolve, reject) => {
//     var myHeaders = new Headers();

//     const url = 'https://radiant-brushlands-64499.herokuapp.com/https://api.linkedin.com/v2/ugcPosts'

//     myHeaders.set('Authorization', 'Bearer ' + access_token);
//     myHeaders.append('Content-Type', 'application/json')
//     myHeaders.append('X-Restli-Protocol-Version', '2.0.0')

//     let share_body = JSON.stringify({
//       'author': 'urn:li:person:' + author,
//       'lifecycleState': 'PUBLISHED',
//       'specificContent': {
//         'com.linkedin.ugc.ShareContent': {
//           'shareCommentary': {
//             'text': 'linkedin.com/company/digitalstrateegia certifica que tenho habilidades em strateegia.digital!'
//           },
//           'shareMediaCategory': 'NONE'
//         }
//       },
//       'visibility': {
//         'com.linkedin.ugc.MemberNetworkVisibility': 'CONNECTIONS'
//       }
//     })

//     fetch(url, {
//       method: 'POST',
//       headers: myHeaders,
//       body: share_body
//     })
//       .then((response) => {
//         if (response.ok) {
//           console.log('bom')
//           resolve(response.json());
//         } else {
//           console.log(share_body)
//           console.log(response)
//           reject();
//         }
//       });
//   });
// };