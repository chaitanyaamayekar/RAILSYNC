import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ],
});

// For morgan or custom usage
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

export default logger;
