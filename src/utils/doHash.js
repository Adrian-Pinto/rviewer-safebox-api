import { createHash } from 'crypto';

export default (string) => createHash('sha256').update(string).digest('hex');
