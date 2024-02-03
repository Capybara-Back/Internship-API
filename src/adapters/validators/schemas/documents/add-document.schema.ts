import { z } from 'zod';
import { zfd } from 'zod-form-data';

const schema = zfd.formData({
    data: z.any()
});

export default schema;
