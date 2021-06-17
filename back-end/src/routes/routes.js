import authRoutes from "../modules/auth/routes"
import dashboardRoutes from "../modules/dashboard/routes"
import productsRoutes from "../modules/products/routes"
import categoriesRoutes from "../modules/categories/routes"
import transactionRoutes from "../modules/transactions/routes";

export default [...authRoutes, ...dashboardRoutes, ...productsRoutes, ...categoriesRoutes, ...transactionRoutes]


