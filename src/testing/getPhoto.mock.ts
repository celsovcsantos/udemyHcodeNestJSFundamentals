import { join } from 'path';
import { getFileToBuffer } from './fileToBuffer';

export const getPhotoMock = async () => {
  const { buffer, stream } = await getFileToBuffer(
    join(__dirname, 'photo-test.png'),
  );

  const photo: Express.Multer.File = {
    fieldname: 'photo-test',
    originalname: 'photo-test.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 1024 * 50,
    stream,
    destination: '',
    filename: 'photo-test.png',
    path: 'fileName/photo-test.png',
    buffer,
  };

  return photo;
};
