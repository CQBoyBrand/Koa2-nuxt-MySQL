import React, {FC} from "react";
import {Switch} from 'react-router-dom'
import RouterView from "../../router/router";
import '../../static/css/article.scss'

const Article: FC<any> = (props) => {

    return (
        <div style={{width: '100%', height:'100%'}}>
            <Switch>
                <RouterView routes={props.routes}/>
            </Switch>
        </div>
    )
}

export default Article