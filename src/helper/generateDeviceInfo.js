export const generateDeviceInfo = (response, udid) => {
  const output = response.find(
    element => element.deviceinfo.device.udid === udid
  );

  return [
    {
      title: "Device",
      value: output.deviceinfo.device.name
    },
    {
      title: "OS",
      value: output.deviceinfo.device.os
    },
    {
      title: "OS Version",
      value: output.deviceinfo.device.osVersion
    },
    {
      title: "UDID",
      value: output.deviceinfo.device.udid
    },
    {
      title: "Location",
      value: output.deviceinfo.hostName
    },
    {
      title: "API Level",
      value: output.deviceinfo.device.apiLevel
    }
  ];
};
