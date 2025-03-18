const cloudinary = require('cloudinary').v2;
const stream = require('stream');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const cloudinary_Config = require('../config/ImageCloudinaryConfig');
cloudinary.config(cloudinary_Config);

const uploadToCloudinary = (file, resourceType, folder) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve({ message: 'No file provided' });
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType, folder },
      (error, result) => {
        if (error) {
          console.error(`Failed to upload ${resourceType}:`, error);
          resolve({ message: `Failed to upload ${resourceType}` });
        } else {
          resolve({ message: 'OK', url: result.secure_url });
        }
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    bufferStream.pipe(uploadStream);
  });
};

const ImageUpload = (file) => uploadToCloudinary(file, 'image', 'Evolution');
const VideoUpload = (file) => uploadToCloudinary(file, 'video', 'Evolution');

module.exports = { ImageUpload, VideoUpload };
