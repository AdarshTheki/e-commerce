import { logger } from '../middlewares/logger.middleware.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { awsS3Bucket } from '../config/awsS3Bucket.js';

const BUCKET_NAME = process.env.S3_BUCKET_NAME;
if (!BUCKET_NAME) {
  logger.warn('Amazon S3_BUCKET_NAME not found!');
}

const createFolder = asyncHandler(async (req, res) => {
  const { folderPath } = req.body;

  if (!folderPath) throw new ApiError(400, 'Folder path is required');

  // S3 doesn't have folders, but we create a placeholder object
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folderPath.endsWith('/') ? folderPath : folderPath + '/'}`,
    Body: '',
    ContentType: 'application/x-directory',
  };

  await awsS3Bucket.upload(params).promise();

  res.status(200).json(
    new ApiResponse(200, {
      folderPath: params.Key,
    }),
    'Folder created successfully'
  );
});

export { createFolder };
