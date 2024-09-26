import { v2 as cloudinary } from 'cloudinary';
import {
  cloudinaryApiKey,
  cloudinaryApiSecret,
  cloudinaryName,
} from './constants.config';

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export const cloudinaryUpload = async (path: string): Promise<any> => {
  console.log('file uploading');
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(path, {
        resource_type: 'auto',
      })
      .then((result) => {
        resolve({
          url: result.secure_url,
        });
      });
  });
};
