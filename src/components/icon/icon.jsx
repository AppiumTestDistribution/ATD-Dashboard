import React from "react";
import { Icon as AntIcon } from "antd";

const iconType = {
  ios: "apple",
  android: "android",
  fail: "exclamation-circle",
  pass: "check-circle",
  skip: "question-circle"
};

const iconStyle = {
  ios: { theme: "filled", color: "" },
  android: { theme: "filled", color: "" },
  fail: { theme: "filled", color: "#FA134A" },
  pass: { theme: "filled", color: "#19BA98" },
  skip: { theme: "filled", color: "#FFD90C" }
};

const Icon = ({ type, size }) => {
  return (
    <AntIcon
      type={iconType[type.toLowerCase()]}
      style={{ fontSize: size, color: iconStyle[type.toLowerCase()].color }}
      theme={iconStyle[type.toLowerCase()].theme}
    />
  );
};

export default Icon;
