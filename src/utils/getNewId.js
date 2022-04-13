import { randomUUID } from 'crypto';

const getNewId = (isDisable = true) => randomUUID({ disableEntropyCache: isDisable });

export default getNewId;
