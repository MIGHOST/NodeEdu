const { Router } = require('express');
const imgRouter = Router();
const multer = require('multer');
const {promises: fsPromises} = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const storage = multer.diskStorage({
  destination: 'public/draft',
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

imgRouter.post(
  '/',
  upload.single('img_file'),
  minifyImage,
  (req, res, next) => {
    res.status(200).send(req.file);
  },
);

async function minifyImage(req, res, next) {
  try {
    const MIN_DIR = 'public/images';
    const files = await imagemin([`${req.file.destination}/*`], {
      destination: MIN_DIR,
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    const { filename, path: draftPath } = req.file;
    await fsPromises.unlink(draftPath)
    req.file = {
      ...req.file,
      path: path.join(MIN_DIR, filename),
      destination: MIN_DIR,
    };
    next();
  } catch (error) {
    res.status(500).send('Server error');
  }
}

module.exports = imgRouter;
