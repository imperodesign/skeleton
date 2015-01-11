import config from './config';
import controller from './controllers/controller';

let app = {};
app = config(app);

// controllers
controller(app);
