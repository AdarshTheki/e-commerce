import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { awsS3Bucket } from '../config/awsS3Bucket.js';
import { env } from '../config/constant.js';

// Multer configuration for S3 upload
export const uploadS3 = multer({
  storage: multerS3({
    s3: awsS3Bucket,
    bucket: env.awsBucketName,
    acl: 'private', // Change to 'public-read' if you want public access
    key: function (req, file, cb) {
      const folderPath = req.body.folderPath || 'uploads';
      const fileExtension = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExtension}`;
      cb(null, `${folderPath}/${fileName}`);
    },
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        originalName: file.originalname,
        uploadedAt: new Date().toISOString(),
      });
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    // Add your file type validation here
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});
