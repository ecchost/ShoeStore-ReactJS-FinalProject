import React, {Fragment} from "react";
import {TabList, TabPanel, Tabs, Tab} from "react-tabs";
import {Unlock, User} from "react-feather";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const TabSetter = ({loginResolver, registerResolver, clickActive}) => {
    return(
        <div>
            <Fragment>
                <Tabs>
                    <TabList className="nav nav-tabs tab-coupon">
                        <Tab className="nav-link" onClick={(e) => clickActive(e)}><User/>Login</Tab>
                    </TabList>

                    <TabPanel>
                        <LoginForm {...loginResolver} />
                    </TabPanel>
                </Tabs>
            </Fragment>
        </div>
    )
}

export default TabSetter;