import AWS from 'aws-sdk';
import { env } from './constant.js';

// Configure AWS S3
export const awsS3Bucket = new AWS.S3({
  accessKeyId: env.awsAccessKey,
  secretAccessKey: env.awsSecretKey,
  region: env.awsRegion,
});
