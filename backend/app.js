const express = require('express');
const app = express();
const cors = require('cors');
const { getLinkedinId, postShare, registerImage, uploadImage } = require('./example');
const { _request } = require('./globaldata');
const dt = require('./globaldata.js').data;

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
    const {img} = req.body;
    global.data = img;
})


app.post('/token', cors(), async (req, res) => {
    const {code, state} = req.body;
    const pathQ = dt.path_query(code, dt.client_id, dt.redirect_uri, dt.client_secret);
    const body = '';

    _request(dt.method, dt.hostname, dt.path(pathQ), dt.headers, body)
        .then(r => {
            if(r.status == 200){
                const access_token = (JSON.parse(r.body).access_token);
                getLinkedinId(access_token).then(ownerId => {
                    registerImage(access_token, ownerId).then(r => {
                        const uploadUrl = JSON.parse(r.body).value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
                        const asset = JSON.parse(r.body).value.asset;
                        const img = global.data;
                        uploadImage(access_token, img, uploadUrl).then(r => {
                            console.log(r)
                            postShare(access_token, ownerId, dt.text, asset).then(res => {
                            console.log('2', res); // status 201 signal successful posting
                            })
                            .catch(e => console.log(e))
                        })
                    }).catch(e => console.log(e));
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


const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`
    console.log(`Listening on ${url}`);
})

// hello.listen(PORT, () => {
//     console.log('to aqui!')
// })
