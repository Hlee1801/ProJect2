import React from "react";
import { Input, Typography, Button, message, Form } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { PUT, POST } from "service";

function Forgot(props) {
  const { success } = props;
  const [state, setState] = React.useState({
    tab: 1,
    id: "",
  });
  const { tab, id } = state;
  const emailRef = React.useRef();
  const [form] = Form.useForm();
  async function handleCheckEmail(e) {
    e.preventDefault();
    try {
      const res = await POST("forgot-password", {
        email: emailRef.current.input.value,
      });
      if (res.status === 200) {
        setState((p) => ({ ...p, tab: 2, id: res.data.id }));
      }
    } catch (e) {
      message.error(e.response.data.msg);
    }
  }
  async function handleResetPassword(value) {
    try {
      const res = await PUT("reset-password", value);
      if (res.status === 200) {
        message.success(res.data.msg);
        success();
      }
    } catch (e) {
      message.error(e.response.data.msg);
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      {tab === 1 && (
        <>
          <Typography.Title level={2}>Nhập Email</Typography.Title>
          <form onSubmit={handleCheckEmail}>
            <Input
              type={"email"}
              prefix={<MailOutlined />}
              ref={emailRef}
              placeholder={"Nhập Email"}
            />
            <Button
              style={{ marginTop: 5, width: "100%" }}
              type={"primary"}
              htmlType={"submit"}
            >
              Xác nhận
            </Button>
          </form>
        </>
      )}
      {tab === 2 && (
        <>
          <Form
            form={form}
            initialValues={{
              id: id,
              password: "",
            }}
            onFinish={handleResetPassword}
          >
            <Form.Item name="password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder={"Nhập mật khẩu mới "}
              />
            </Form.Item>
            <Form.Item name={"id"} hidden={true}>
              <input type={"hidden"} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}

export default Forgot;
