import express from 'express';
import cloudinary from '../utils/cloudinary.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/upload', upload.single('image'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: err,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Uploaded!',
            url: result.secure_url,
        });
    });
});

export default router;
