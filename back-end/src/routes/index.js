import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import Layout from '../layout'
import routes from "./routes";
import ProtectedRoute from "./protectedRoutes";
import PublicRoute from "./publicRoutes";

const Routes = () => (
    <Router>
        <Layout>
            <Switch>
                {routes.map((route, index) => {
                    if (route.auth){
                        return <ProtectedRoute key={index} {...route} />
                    }
                    return <PublicRoute key={index} {...route} />
                })}
            </Switch>
        </Layout>
    </Router>
)

export default Routes




