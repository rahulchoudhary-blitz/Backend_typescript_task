import App from '@/app';
import validateEnv from '@utils/validateEnv';
import BillsRoute from '@routes/bills.route';

validateEnv();

const app = new App([new BillsRoute()]);

app.listen();
