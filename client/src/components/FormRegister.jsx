import React from "react";

import { Button, Form, Input, message, Row, Col, Radio } from "antd";
import { useTranslation } from "react-i18next";
import { POST } from "service";

const FormRegister = () => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const onSubmitForm = async (value) => {
    try {
      const res = await POST("register", value);
      if (res.status === 200) {
        message.success("Đăng ký thành công, hãy kiểm tra hòm mail của bạn");
        form.resetFields();
        window.close();
      }
    } catch (error) {
      message.error(error.response.data.msg);
    }
  };
  return (
    <div>
      <Form
        name="register-form"
        layout="vertical"
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          gender: "",
          phoneNumber: "",
          address: "",
        }}
        form={form}
        onFinish={onSubmitForm}
      >
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={12}>
            <Form.Item
              label={t("signup.name")}
              name="fullName"
              rules={[
                {
                  required: true,
                  message: t("noti.empty"),
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: t("noti.empty"),
                },
              ]}
            >
              <Input type={"email"} />
            </Form.Item>
            <Form.Item
              label={t("signup.gender")}
              name="gender"
              rules={[
                {
                  required: true,
                  message: t("noti.empty"),
                },
              ]}
            >
              <Radio.Group>
                <Radio value="nam">{t("signup.m")}</Radio>
                <Radio value="nữ">{t("signup.f")}</Radio>
                <Radio value="khác">{t("signup.o")}</Radio>
              </Radio.Group>
            </Form.Item>{" "}
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("signup.address")}
              name="address"
              rules={[
                {
                  required: true,
                  message: t("noti.empty"),
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>{" "}
            <Form.Item
              label={t("signup.phone")}
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: t("noti.empty"),
                },
              ]}
            >
              <Input type="number" min="1" />
            </Form.Item>{" "}
            <Form.Item
              label={t("common.password")}
              name="password"
              rules={[
                {
                  required: true,
                  message: t("noti.empty"),
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {t("common.signup")}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormRegister;
