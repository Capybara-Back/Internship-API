import logger from '@common/logger';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req: any, file: any, cb: any) {
        const currentDatetime = new Date();
    
        const formattedDatetime = currentDatetime.toISOString().replace(/[-T:.Z]/g, '');

        const fileExtension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, fileExtension);

        const uniqueFilename = `${baseName}_${formattedDatetime}${fileExtension}`;

        cb(null, uniqueFilename);
      },
});

const upload = multer({ storage: storage });

export default upload;