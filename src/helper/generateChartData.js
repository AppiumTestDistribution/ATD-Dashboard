export const generateTestStatusChartData = response => {
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  response.forEach(element => {
    if (element.testresult === "Pass") {
      passed++;
    } else if (element.testresult === "Fail") {
      failed++;
    } else if (element.testresult === "Skip") {
      skipped++;
    }
  });
  return [passed, failed, skipped];
};

export const generateDeviceInfoChartData = response => {
  const deviceList = response.map(element => element.deviceinfo.device.name);
  const uniqueDeviceList = [...new Set(deviceList)];
  const deviceCount = [];

  uniqueDeviceList.forEach(uniqueDevice => {
    let count = 0;
    response.forEach(element => {
      if (element.deviceinfo.device.name === uniqueDevice) {
        count++;
      }
    });
    deviceCount.push(count);
  });

  return {
    chartLabels: uniqueDeviceList,
    chartData: deviceCount
  };
};
