import config from './config';
import controller from './controllers/controller';

let app = window.app = {};
app = config(app);

// controllers
controller(app);
