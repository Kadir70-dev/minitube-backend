const Video = require('../model/video');
const redisClient = require('../utils/redisClient');
const { kafka, producer } = require('../utils/kafka');

exports.uploadVideo = async (req, res) => {
  try {
    const video = await Video.create({
      title: req.body.title,
      description: req.body.description,
      videoUrl: `/uploads/${req.file.filename}`,
      
      uploadedBy: req.user.id
      
    });
    // Populate uploadedBy after creation
    video = await video.populate('uploadedBy', 'username');
    console.log(video);
    //   Send Kafka message
    //   Send Kafka message

    const kafka = req.app.locals.kafka;
    await kafka.send({ topic: 'video-uploaded', messages: [{ value: JSON.stringify(video) }] });


    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getVideos = async (req, res) => {
  const redis = req.app.locals.redis;
  const cache = await redis.get('videos');
  if (cache) return res.json(JSON.parse(cache));


  const videos = await Video.find().populate('uploadedBy', 'username');
  await redis.set('videos', JSON.stringify(videos));
  res.json(videos);
};

exports.likeVideo = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
  res.json(video);
};

exports.commentVideo = async (req, res) => {
  const { text } = req.body;
  const video = await Video.findById(req.params.id);
  video.comments.push({ text, postedBy: req.user.id });
  await video.save();
  res.json(video);
};
