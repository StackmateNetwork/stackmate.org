/*
cypherpost.io
Developed @ Stackmate India
*/
// -----° ̿ ̿'''\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿ °-----------
import { logger } from "./lib/logger/winston";
import { start as startServer } from "./server";
// -----° ̿ ̿'''\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿ °-----------


startServer(process.env.MOLTRES_PORT as string).catch(e => {
  logger.error(e);
  process.exit(1);
});

// -----° ̿ ̿'''\̵͇̿̿\з=(◕_◕)=ε/̵͇̿̿/'̿'̿ ̿ °-----------
