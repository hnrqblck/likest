const express = require('express');
const app = express();
const cors = require('cors');
let dt = require('./globaldata.js').data;
const _request = require('./globaldata')._request;
const getLinkedinId = require('./example').getLinkedinId;
const postShare = require('./example').postShare;
const registerImage = require('./example').registerImage;

require('dotenv').config();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(cors());

app.get('/', cors(), async (req, res) => {
    res.send('This is working');
    
});

app.get('/home', cors(), async(req, res) => {
    const pathUrl = dt.auth_url(dt.response_type, dt.client_id, dt.redirect_uri,dt.state, dt.scope);
    res.send(pathUrl);
})

app.post('/image', cors(), async (req, res) => {
    let {img} = req.body;
    let buff = Buffer.from(img, 'base64');
    const str = buff.toString('utf-8');
    global.data = str;
    console.log('oi')
});
console.log(global.data)
app.post('/token', cors(), async (req, res) => {
    const {code, state} = req.body;
    const pathQ = dt.path_query(code, dt.client_id, dt.redirect_uri, dt.client_secret);
    const body = '';
    _request(dt.method, dt.hostname, dt.path(pathQ), dt.headers, body)
        .then(r => {
            console.log('1', r)
            if(r.status == 200){
                const access_token = (JSON.parse(r.body).access_token);
                getLinkedinId(access_token).then(ownerId => {
                    registerImage(access_token, ownerId).then(r => {
                        console.log(r.body);
                    }).catch(e => console.log(e));
                    // postShare(access_token, ownerId, dt.text).then(r => {
                    //     console.log(r); // status 201 signal successful posting
                    // }).catch(e => console.log(e));
                }).catch(e => console.log(e));
            }
            else {
                console.log('ERROR - ' + r.status + JSON.stringify(r.body))
                res.writeHead(r.status, {'content-type': 'text/html'});
                res.write(r.status + ' Internal Server Error');
                res.end();
            }
        });
    
})

// exports.imgStr = globaldata;

const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`
    console.log(`Listening on ${url}`);
})

// hello.listen(PORT, () => {
//     console.log('to aqui!')
// })
