import pinoLogger from 'pino';

const logger = pinoLogger({
    transport: {
        target: 'pino-pretty'
    },
    level: 'trace',
    base: {
        pid: false
    },
    timestamp: false
});

export default logger;
