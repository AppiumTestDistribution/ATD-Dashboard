export const generateChartData = response => {
  let passed = 0;
  let failed = 0;
  response.forEach(element => {
    if (element.status === "Completed") {
      if (element.testresult === "Pass") {
        passed++;
      } else if (element.testresult === "Fail") {
        failed++;
      }
    }
  });
  return [passed, failed];
};
