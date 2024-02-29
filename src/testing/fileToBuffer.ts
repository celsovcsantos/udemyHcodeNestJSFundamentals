import { ReadStream, createReadStream } from 'fs';

export const getFileToBuffer = (fileName: string) => {
  const readStream = createReadStream(fileName);
  const chunks: any[] = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on('data', (chunk) => chunks.push(chunk));
      readStream.on('error', (error) => reject(error));
      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chunks) as Buffer,
          stream: readStream,
        });
      });
    },
  );
};
