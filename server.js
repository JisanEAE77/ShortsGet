const { request } = require('express');
const { response } = require('express');
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.use(express.json());
app.use(express.static('views'));

app.set('view engine', 'ejs')

app.get('/', (request, response) => {
    response.render('public/index.ejs')
});

app.get('/about', (request, response) => {
    response.render('public/about.ejs');
});

app.get('/privacy-policy', (request, response) => {
    response.render('public/privacy-policy.ejs')
});

app.get('/contact', (request, response) => {
    response.render('public/contact.ejs')
});

app.get('/advertise', (request, response) => {
    response.render('public/advertise.ejs')
});

app.get('/FAQs', (request, response) => {
    response.render('public/FAQs.ejs')
});

app.get('/videoInfo', async (request, response) => {
    const videoURL = request.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    response.status(200).json(info)
});

app.get('/download', (request, response) => {
    const fileName = request.query.fileName;
    const format = request.query.format;
    const videoURL = request.query.videoURL;
    const itag = request.query.itag;
    response.header('Content-Disposition', 'attachment;\ filename="ShortsGet.' + format +'"');
    ytdl(videoURL, {
        filter: format => format.itag == itag,
    }).pipe(response);
});

app.listen(5000);