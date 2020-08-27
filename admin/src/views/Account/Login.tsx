import React, {FC, useState} from "react";
import {useHistory} from 'react-router-dom'
import {Card, Button, Spin, Input, Space, message} from 'antd'
import {UserOutlined, KeyOutlined} from "@ant-design/icons/lib";
import '../../static/css/login.scss'
import {login} from "../../api/modules/user";
import md5 from 'md5'

const Login: FC = () => {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const isLogin = sessionStorage.getItem('token')

    if(isLogin) {
        history.push('/')
    }

    const checkLogin = () => {
        if (!username) {
            message.error('用户名不能为空')
            return false
        }
        if (!password) {
            message.error('密码不能为空')
            return false
        }
        setIsLoading(true)

        login({
            username: username,
            password: md5(password)
        }).then(res => {
            setIsLoading(false)
            if (res.code === 200) {
                setTimeout(() => {
                    history.push('/')
                },500)
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('username', res.data.username)
                message.success(res.message)
            } else {
                message.error(res.message)
            }

        })
    }

    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title='Brand`s Blog System'>
                    <Space direction='vertical' size='large' style={{width: '100%'}}>
                        <Input id='username'
                               size='large'
                               placeholder='Enter Your Username'
                               prefix={<UserOutlined/>}
                               onChange={(e) => {
                                   setUsername(e.target.value)
                               }}
                        />

                        <Input.Password id='password'
                                        size='large'
                                        placeholder='Enter Your Password'
                                        prefix={<KeyOutlined/>}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                        />

                        <Button type='primary'
                                size='large'
                                block
                                onClick={checkLogin}
                        >
                            Login In
                        </Button>
                    </Space>
                </Card>
            </Spin>
        </div>
    )
}

export default Login