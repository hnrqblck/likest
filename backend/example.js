'use-strict'

// This sample will post a basic message in your LinkedIn profile


const _request = require('./globaldata')._request;
// const accessToken = require('./app').token;
// const query_state = require('./app').state
// const { imgStr } = require('./app');

// ---------------------------------------------------------------------------------------------------------------------
// Example
// ---------------------------------------------------------------------------------------------------------------------

let title = "Hello World!";
let text = "UHUUU! Consegui destravar minhas habilidades estratégicas. Compartilho com vocês o meu desenvolvimento em processos criativos e colaboração incrível. STRATEEGIA, onde a sua ideia sai do ZERO. O que você pode começar hoje?";
let shareUrl = "https://www.example.com/content.html"
let shareThumbnailUrl = "https://www.example.com/image.jpg"
// console.log('1', imgStr);

// console.log(token);


// if (accessToken) {
//     getLinkedinId(accessToken).then(ownerId => {
//         console.log(Buffer.from("", 'base64').toString('utf8'))
//         registerImage(accessToken, ownerId).then(r => {
//             console.log(r.body);
//         }).catch(e => console.log(e));
//         // postShare(accessToken, ownerId, title, text, shareUrl, shareThumbnailUrl).then(r => {
//         //     console.log(r); // status 201 signal successful posting
//         // }).catch(e => console.log(e));
//     }).catch(e => console.log(e));
// }

// ---------------------------------------------------------------------------------------------------------------------
// Generic Node.js API to post on LinkedIn
// ---------------------------------------------------------------------------------------------------------------------

// Get LinkedIn ID, i.e. ownerId
exports.getLinkedinId = (accessToken) => {
    return new Promise((res, rej) => {
        let hostname = 'api.linkedin.com';
        let path = '/v2/me';
        let method = 'GET';
        let headers = {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0'
        };
        let body = ''
        _request(method, hostname, path, headers, body).then(r => {
            res(JSON.parse(r.body).id)
        }).catch(e => rej(e))
    })
}

// Publish content on LinkedIn
exports.postShare = (accessToken, ownerId, text) => {
    return new Promise((res, rej) => {
        let hostname = 'api.linkedin.com';
        let path = '/v2/ugcPosts';
        let method = 'POST';
        let body = {
            "author": `urn:li:person:${ownerId}`,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": text
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        let headers = {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
            'x-li-format': 'json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body))
        };
        _request(method, hostname, path, headers, JSON.stringify(body)).then(r => {
            res(r);
        }).catch(e => rej(e))
    })
}

exports.registerImage = (accessToken, ownerId) => {
    return new Promise((res, rej) => {
        const hostname = 'api.linkedin.com';
        const path = '/v2/assets?action=registerUpload';
        const method = 'POST';
        const body = {
            "registerUploadRequest": {
                "recipes": [
                    "urn:li:digitalmediaRecipe:feedshare-image"
                ],
                "owner": `urn:li:person:${ownerId}`,
                "serviceRelationships": [
                    {
                        "relationshipType": "OWNER",
                        "identifier": "urn:li:userGeneratedContent"
                    }
                ]
            }
        }
        const headers = {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0',
            'Content-Type': 'application/json',
            'x-li-format': 'json',
            'Content-Length': Buffer.byteLength(JSON.stringify(body))
        };
        _request(method, hostname, path, headers, JSON.stringify(body)).then(r => {
            res(r);
        }).catch(e => rej(e))
    })
}



// Generic HTTP requester
// function _request(method, hostname, path, headers, body) {
//     return new Promise((resolve, reject) => {
//         let reqOpts = {
//             method,
//             hostname,
//             path,
//             headers,
//             "rejectUnauthorized": false // WARNING: accepting unauthorised end points for testing ONLY
//         };
//         let resBody = "";
//         let req = https.request(reqOpts, res => {
//             res.on('data', data => {
//                 resBody += data.toString('utf8');
//             });
//             res.on('end', () => {
//                 resolve({
//                     "status": res.statusCode,
//                     "headers": res.headers,
//                     "body": resBody
//                 })
//             });
//         });
//         req.on('error', e => {
//             reject(e);
//         });
//         if (method !== 'GET') {
//             req.write(body);
//         }
//         req.end();
//     })
// }
