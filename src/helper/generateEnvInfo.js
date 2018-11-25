export const generateEnvInfo = response => {
  return [
    {
      title: "Runner",
      value: response[0].Runner
    },
    {
      title: "Selenium Version",
      value: response[0].SeleniumVersion
    },
    {
      title: "Appium Server",
      value: response[0].AppiumServer
    },
    {
      title: "Total Devices",
      value: response[0].TotalDevices
    },
    {
      title: "Appium Client",
      value: response[0].AppiumClient
    }
  ];
};
