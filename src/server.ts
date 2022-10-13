import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import BillRoute from '@routes/bills.route'

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new BillRoute()]);

app.listen();
