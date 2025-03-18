const { ImageUpload, VideoUpload } = require('../utils/MediaUpload');

const MediaUploadProject = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Check file type (image or video)
  const isVideo = file.mimetype.startsWith('video/');

  // Upload to Cloudinary
  const result = isVideo ? await VideoUpload(file) : await ImageUpload(file);

  if (result.message !== 'OK') {
    return res.status(400).json(result);
  } else {
    return res.status(200).json(result);
  }
};

module.exports = { MediaUploadProject };
