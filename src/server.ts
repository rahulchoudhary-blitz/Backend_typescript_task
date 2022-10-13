import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import TasksRoute from '@routes/bills.route';

validateEnv();

const app = new App([new IndexRoute(), new TasksRoute()]);

app.listen();
