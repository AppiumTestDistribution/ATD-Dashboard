export const generateDeviceInfo = (response, udid) => {
  const result = [];
  response.forEach(element => {
    if (
      element.deviceinfo.device.udid === udid &&
      element.status === "Completed"
    ) {
      result.push({
        key: element._id,
        className: element.testClassName,
        methodName: element.testMethodName,
        testResult: element.testresult,
        startTime: element.startTime,
        endTime: element.endTime
      });
    }
  });
  return result;
};
