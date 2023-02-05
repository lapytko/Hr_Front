import { useCallback, useState } from "react";

// antd
import { Form, Input, Button, Spin, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// auth
import { useAuth } from "../Auth/Auth";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const LoginForm = () => {
    const { logIn, err } = useAuth();
    const [loading, setLoading] = useState(false);

    const onFinish = useCallback(
        async function (e) {
            setLoading(true);
            const {username, password} = e;
            setTimeout(async () => {
                if (logIn) {
                    await logIn(username, password);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }, 500);
        },
        [logIn],
    );

    // noinspection RequiredAttributes
    return (
        <Form
            {...layout}
            name="basic"
            layout="vertical"
            validateMessages={err}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                label="Имя пользователя"
                rules={[
                    { required: true, message: "need_username" },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Имя пользователя"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Пароль"
                rules={[{ required: true, message: "need_pass" }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                    autoComplete={"current-password"}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    disabled={loading}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    {loading ? (
                        <Space>
                            <Spin size="small" style={{ paddingRight: "10px" }} />
                        </Space>
                    ) : (
                        ""
                    )}
                    <span>Войти</span>
                </Button>
                {err ? (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                        <div role="alert">{err}</div>
                    </div>
                ) : (
                    ""
                )}
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
