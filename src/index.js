import restify from 'restify';
import api from './api.js';
import db from './db.js';

async function searchVideo(req, res) {
  const { keyword } = req.params;
  const { pageToken } = req.query;

  try {
    const response = await api.get(`search`, {
      params: {
        q: keyword,
        part: 'snippet',
        type: 'video',
        maxResults: 10,
        pageToken,
      },
    });
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
}

async function searchDummy(req, res) {
  const { keyword } = req.params;
  console.log(keyword);

  if (keyword === '무야호') {
    res.json({
      success: true,
      data: db,
    });

    return;
  }

  res.json({
    success: true,
    data: {
      pageInfo: {
        totalResults: 0,
      },
    },
  });
}

async function getVideosById(req, res) {
  const { ids } = JSON.parse(req.body);
  const idsString = ids.join(',');

  try {
    const response = await api.get(`videos`, {
      params: {
        part: 'snippet',
        type: 'video',
        id: idsString,
      },
    });
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
}

const server = restify.createServer();
server.get('/search/:keyword', searchVideo);
server.get('/search/dummy/:keyword', searchDummy);
server.get('/videos', getVideosById);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080);
