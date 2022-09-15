import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import auth from "services/auth.service";

export default function User() {
  return (
    <div>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        overlay={
          <Menu>
            <Menu.Item
              className="pointer-events-none "
              key="1"
              icon={<UserOutlined />}
            >
              {`${auth.getUsername()}`}
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => auth.logout()}
              icon={<LogoutOutlined />}
            >
              Sign out
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          icon={<UserOutlined />}
          ghost
          className="!border-none !shadow-none	 !text-slate-600 hover:!text-slate-400"
        />
      </Dropdown>
    </div>
  );
}
