export const generateDeviceInfo = (response, udid) => {
  const result = [];
  let className;
  let methods;
  response.forEach(element => {
    if (
      element.deviceinfo.device.udid === udid &&
      element.status === "Completed"
    ) {
      if (className !== element.testClassName) {
        className = element.testClassName;
        methods = [];

        const classInfo = {
          key: element._id,
          className: element.testClassName,
          methods
        };
        result.push(classInfo);
      }
      methods.push({
        methodName: element.testMethodName,
        testResult: element.testresult,
        startTime: element.startTime,
        endTime: element.endTime,
        errorMessage: element.hasOwnProperty("testException")
          ? element.testException
          : null,
        errorScreenshotUrl: element.hasOwnProperty("screenShotFailure")
          ? element.screenShotFailure
          : null
      });
    }
  });
  return result;
};
