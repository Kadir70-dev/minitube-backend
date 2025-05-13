const express = require('express');
const router = express.Router();
const videoCtrl = require('../controllers/videocontroller');
const auth = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', auth, upload.single('video'), videoCtrl.uploadVideo);
router.get('/', videoCtrl.getVideos);
router.post('/:id/like', auth, videoCtrl.likeVideo);

router.post('/:id/comment', auth, videoCtrl.commentVideo);


module.exports = router;
