import React from "react";
import { Icon as AntIcon } from "antd";

const iconType = {
  ios: "apple",
  android: "android",
  fail: "exclamation-circle",
  pass: "check-circle",
  skip: "exclamation-circle"
};

const iconStyle = {
  ios: { theme: "filled", twoToneColor: "" },
  android: { theme: "filled", twoToneColor: "" },
  fail: { theme: "twoTone", twoToneColor: "#ff0000" },
  pass: { theme: "twoTone", twoToneColor: "#52c41a" },
  skip: { theme: "twoTone", twoToneColor: "#52c41a" }
};

const Icon = ({ type, size }) => {
  return (
    <AntIcon
      type={iconType[type.toLowerCase()]}
      style={{ fontSize: size }}
      theme={iconStyle[type.toLowerCase()].theme}
      twoToneColor={iconStyle[type.toLowerCase()].twoToneColor}
    />
  );
};

export default Icon;
