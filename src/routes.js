import Dashboard from './components/Dashboard/Dashboard';
import Product from './components/Product/Product';

import DashboardIcon from '@material-ui/icons/Dashboard';
import RedeemIcon from '@material-ui/icons/Redeem';

const routes = [
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        icon: DashboardIcon,
        component: Dashboard
    },
    {
        path: "/admin/product",
        name: "Product",
        icon: RedeemIcon,
        component: Product
    }
];

export default routes;

