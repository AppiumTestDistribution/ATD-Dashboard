import React from "react";
import { Icon as AntIcon } from "antd";

const iconType = {
  ios: "apple",
  android: "android",
  fail: "exclamation-circle",
  pass: "check-circle"
};

const Icon = ({ type, size }) => {
  return (
    <AntIcon type={iconType[type.toLowerCase()]} style={{ fontSize: size }} />
  );
};

export default Icon;
