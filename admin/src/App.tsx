import React, {Suspense} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
// import Login from "./views/Accout/Login";
// import LayoutIndex from "./views/Layout";
const Login = React.lazy(() => import("./views/Account/Login"))
const LayoutIndex = React.lazy(() => import("./views/Layout"))

function App() {

    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path='/' exact render={() => <Redirect to='/index'/>}/>
                    <Route path='/login' component={Login}/>
                    <Route component={LayoutIndex}/>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
