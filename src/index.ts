import "module-alias/register";

import ENV from "./config/env.config";
import Server from "./services/server.service";
import logger from "./utils/logger";

logger.info(`Starting server in ${ENV.NODE_ENV} mode`);

const server = new Server();

server.listen();
