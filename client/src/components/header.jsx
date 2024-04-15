import React from "react";
import { Link } from "react-router-dom";
import { Menu, Avatar, Select, Modal, Button } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "features/auth/authSlice";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import FormLogin from "./FormLogin";

export default function NavBar() {
  const [select, setSelect] = React.useState("home");
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = async () => {
    if (!user.access_token) return;
    dispatch(logout(user.access_token));
  };
  const { t } = useTranslation();
  const onChangeLanguage = (e) => {
    i18n.changeLanguage(e);
  };
  React.useEffect(() => {
    if (user) return setOpen(false);
  }, [user]);
  const links = [
    {
      label: (
        <Link to="/">
          <HomeOutlined /> {t("navbar.home")}
        </Link>
      ),
      key: "home",
    },
   /*  {
      label: (
        <Link to="hotel">
          <CalendarOutlined /> {t("navbar.booking")}
        </Link>
      ),
      key: "hotel",
    }, */
    user
      ? {
          label: (
            <>
              <Avatar src={user.user.avatar} icon={<UserOutlined />} />
              <span style={{ textTransform: "capitalize", margin: 10 }}>
                {user.user.fullName}
              </span>
            </>
          ),
          children: [
            {
              label: (
                <Link to="/profile">
                  {" "}
                  <UserOutlined />
                  {t("navbar.info")}
                </Link>
              ),
            },
            {
              label: (
                <Link to="/" onClick={onLogout}>
                  <LogoutOutlined style={{ marginRight: 5 }} />
                  {t("navbar.logout")}
                </Link>
              ),
            },
          ],
          key: "auth",
        }
      : {
          label: (
            <Button type={"link"} onClick={() => setOpen(true)}>
              <LoginOutlined style={{ marginRight: 5 }} />
              {t("navbar.auth")}
            </Button>
          ),
          key: "auth",
        },
    {
      label: (
        <Select
          defaultValue={"vn"}
          onChange={onChangeLanguage}
          options={[
            {
              value: "vn",
              label: "Tiếng Việt",
            },
            {
              value: "en",
              label: "EngLish",
            },
          ]}
        />
      ),
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        items={links}
        onClick={(e) => setSelect(e.key)}
        selectedKeys={[select]}
        style={{ position: "sticky" }}
      />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        title={"Đăng nhập"}
      >
        <FormLogin />
      </Modal>
    </>
  );
}
