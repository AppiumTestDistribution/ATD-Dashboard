const findElementValue = (response, udid, key) =>
  response.find(element => element.deviceinfo.device.udid === udid).deviceinfo
    .device[key];

const countTotalTest = (response, udid) => {
  let count = 0;
  response.forEach(element => {
    if (element.deviceinfo.device.udid === udid) {
      count++;
    }
  });
  return count;
};

const countTestByStatus = (response, udid, status) => {
  let count = 0;
  response.forEach(element => {
    if (
      element.deviceinfo.device.udid === udid &&
      element.testresult === status
    ) {
      count++;
    }
  });
  return count;
};

export const apiResponseAdapter = response => {
  const result = [];
  const map = new Map();
  for (const element of response) {
    const udid = element.deviceinfo.device.udid;
    if (!map.has(udid)) {
      map.set(udid, true);
      result.push({
        key: udid,
        udid,
        device: findElementValue(response, udid, "name"),
        os: findElementValue(response, udid, "os"),
        osVersion: findElementValue(response, udid, "osVersion"),
        total: countTotalTest(response, udid),
        passed: countTestByStatus(response, udid, "Pass"),
        failed: countTestByStatus(response, udid, "Fail"),
        skipped: countTestByStatus(response, udid, "Skip")
      });
    }
  }
  return result;
};
