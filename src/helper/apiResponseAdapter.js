const findElementValue = (response, udid, key) =>
  response.find(element => element.deviceinfo.device.udid === udid).deviceinfo
    .device[key];

const countTotalTest = (response, udid) => {
  let count = 0;
  response.forEach(element => {
    if (
      element.status === "Completed" &&
      element.deviceinfo.device.udid === udid
    ) {
      count++;
    }
  });
  return count;
};

const countPassOrFailTest = (response, udid, status) => {
  let count = 0;
  response.forEach(element => {
    if (
      element.status === "Completed" &&
      element.deviceinfo.device.udid === udid &&
      element.testresult === status
    ) {
      count++;
    }
  });
  return count;
};

export const apiResponseAdapter = response => {
  const result = Array.from(
    new Set(response.map(element => element.deviceinfo.device.udid))
  ).map(udid => {
    return {
      key: udid,
      udid,
      device: findElementValue(response, udid, "name"),
      os: findElementValue(response, udid, "os"),
      osVersion: findElementValue(response, udid, "osVersion"),
      total: countTotalTest(response, udid),
      passed: countPassOrFailTest(response, udid, "Pass"),
      failed: countPassOrFailTest(response, udid, "Fail")
    };
  });
  return result;
};
