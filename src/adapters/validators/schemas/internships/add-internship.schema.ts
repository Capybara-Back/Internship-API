import Joi from 'joi';

export default Joi.object({
    title: Joi.string().required(),
    studentId: Joi.string()
        .guid({ version: 'uuidv4', separator: true })
        .required(),
    academicTutorId: Joi.string()
        .guid({ version: 'uuidv4', separator: true })
        .required(),
    date: Joi.date().required()
});
