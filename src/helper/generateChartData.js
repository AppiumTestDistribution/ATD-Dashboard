export const generateChartData = response => {
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  response.forEach(element => {
    if (element.status === "Completed") {
      if (element.testresult === "Pass") {
        passed++;
      } else if (element.testresult === "Fail") {
        failed++;
      } else if (element.testresult === "Skip") {
        skipped++;
      }
    }
  });
  return [passed, failed, skipped];
};
