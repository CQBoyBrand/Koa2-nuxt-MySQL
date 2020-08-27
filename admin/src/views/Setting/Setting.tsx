import React, {FC} from "react";
import '../../static/css/setting.scss'
import WebSetting from "./WebSetting";
import UserSetting from "./UserSetting";

const Setting: FC = () => {
    return (
        <div className='setting-div wrapper-div'>
            <WebSetting />
            <UserSetting />
        </div>
    )
}

export default Setting