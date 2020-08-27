import React, {FC} from "react";
import {Route, Redirect} from 'react-router-dom'

export const RedirectNewPage = (path:string) => {
    return <Redirect to={path}/>
}
const RouterView: FC<any> = (props) => {
    const isLogin = sessionStorage.getItem('token')
    return (
        props.routes.map((item: any, index: number) => {
            return isLogin ?
                <Route key={index}
                       exact={item.exact}
                       path={item.path} render={routeProps => {
                    if (item.children) {
                        return <item.component {...routeProps} routes={item.children}/>
                    } else {
                        return <item.component {...routeProps}/>
                    }
                }
                }/> :
                <Redirect to='/login'/>
        })
    )
}

export default RouterView