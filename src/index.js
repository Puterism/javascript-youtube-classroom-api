import restify from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import api from './api.js';
import db from './db.js';

async function searchVideo(req, res) {
  const { q, pageToken } = req.query;

  try {
    const response = await api.get(`search`, {
      params: {
        q,
        part: 'snippet',
        type: 'video',
        maxResults: 10,
        pageToken,
      },
    });

    res.json({
      success: true,
      ...response.data,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
}

async function searchDummy(req, res) {
  const { q } = req.query;

  if (q === '무야호') {
    res.json({
      success: true,
      ...db,
    });

    return;
  }

  res.json({
    success: true,
    pageInfo: {
      totalResults: 0,
    },
  });
}

async function getVideosById(req, res) {
  const { id } = req.query;

  try {
    const response = await api.get(`videos`, {
      params: {
        part: 'snippet',
        type: 'video',
        id,
      },
    });
    res.json({
      success: true,
      ...response.data,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
}

const cors = corsMiddleware({
  allowHeaders: ['access-control-allow-origin'],
  origins: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://vultr.puterism.com:8080',
    'https://puterism.github.io',
    'https://iborymagic.github.io',
  ],
});

const server = restify.createServer();
server.get('/search', searchVideo);
server.get('/search/dummy', searchDummy);
server.get('/videos', getVideosById);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

server.listen(8080);
