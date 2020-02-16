import { success } from 'consola';

import app from './app';

const main = async () => {
  await app.listen(4000);
  success('Server on port 4000');
};

main();
