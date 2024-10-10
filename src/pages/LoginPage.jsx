import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import logo from './logo.png';

const LoginPage = ({ onLogin }) => {
    const [loading, setLoading] = useState(false);
    const loggedIn = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        if (!loggedIn) {
            notification.info({
                message: 'Login Info',
                description: 'Use any username and password.',
                placement: 'bottomLeft',
                duration: 0,
            });
            
        }
    }, []);

    const onFinish = (values) => {
        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            onLogin(true);
            setLoading(false);

            notification.destroy();
        }, 1000);
    };

    return (
        <div className="app__auth mt-8">
            <div className="app__login-left">
                {/* Logo */}
                <header className='flex mb-4 justify-content-center h-5rem align-items-center gap-2'>
                    <img src={logo} alt="" width={200} />
                </header>

                {/* Form Login*/}
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    className="login-form mt-2"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            size="large"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            id="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            size='large'
                            className='mt-2'
                            id="password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%', marginTop: '10px' }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
