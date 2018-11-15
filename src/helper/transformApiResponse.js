export const transformApiResponse = response => {
  const transformedResponse = [];
  let previousUdid = null;
  response.forEach(element => {
    const currentUdid = element.deviceinfo.device.udid;
    if (previousUdid !== currentUdid) {
      transformedResponse.push({
        key: element.deviceinfo.device.udid,
        uuid: element.deviceinfo.device.udid,
        device: element.deviceinfo.device.name,
        os: `${element.deviceinfo.device.os} ${
          element.deviceinfo.device.osVersion
        }`,
        total: "2",
        passed: "2",
        failed: "0"
      });
      previousUdid = currentUdid;
    }
  });

  return transformedResponse;
};
