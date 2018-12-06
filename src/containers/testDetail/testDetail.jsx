import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Card,
  Table,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  Tooltip,
  List
} from "antd";
import { NAME } from "./constant";
import {
  fetchTestRunnerDetail,
  fetchErrorScreenshot,
  fetchDeviceInfo,
  fetchChartData
} from "./action";
import Icon from "../../components/icon/icon";
import "./testDetail.css";
import Chart from "../../components/chart/chart";

const Panel = Collapse.Panel;

const statusIconDesc = {
  fail: "Failed",
  pass: "Passed",
  skip: "Skipped"
};

const showError = errorMessage => {
  Modal.error({
    title: "Error Detail",
    content: errorMessage,
    width: "50%"
  });
};

const countTestByStatus = methodList => {
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  methodList.forEach(methodInfo => {
    if (methodInfo.testResult.toLowerCase() === "pass") {
      passed++;
    } else if (methodInfo.testResult.toLowerCase() === "fail") {
      failed++;
    } else if (methodInfo.testResult.toLowerCase() === "skip") {
      skipped++;
    }
  });
  return { passed, failed, skipped };
};

const headerContent = (className, methodList) => (
  <div style={{ display: "flex", justifyContent: "space-between" }}>
    <div>{className}</div>
    <div style={{ marginRight: "20px" }}>
      <Tooltip title="Total Test">
        <Badge
          showZero
          count={methodList.length}
          style={{ backgroundColor: "#8470ff", marginRight: "5px" }}
        />
      </Tooltip>
      <Tooltip title="Passed Test">
        <Badge
          showZero
          count={countTestByStatus(methodList).passed}
          style={{ backgroundColor: "#228B22", marginRight: "5px" }}
        />
      </Tooltip>
      <Tooltip title="Failed Test">
        <Badge
          showZero
          count={countTestByStatus(methodList).failed}
          style={{ marginRight: "5px" }}
        />
      </Tooltip>
      <Tooltip title="Skipped Test">
        <Badge
          showZero
          count={countTestByStatus(methodList).skipped}
          style={{ backgroundColor: "#FFC200", marginRight: "5px" }}
        />
      </Tooltip>
    </div>
  </div>
);

const chartOptions = {
  legend: {
    display: true,
    position: "right",
    labels: {
      fontColor: "white",
      fontSize: 14
    }
  },
  plugins: {
    labels: {
      render: "percentage",
      fontColor: "black",
      precision: 2,
      fontSize: 13,
      textShadow: true
    }
  },
  colorschemes: {
    scheme: "brewer.Accent7"
  }
};

class TestDetail extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Method Name",
        dataIndex: "methodName",
        key: "methodName",
        width: "30%"
      },
      {
        title: "Status",
        dataIndex: "testResult",
        key: "testResult",
        width: "10%",
        render: testResult => (
          <Tooltip
            title={statusIconDesc[testResult.toLowerCase()]}
            placement="right"
          >
            <div style={{ cursor: "pointer", width: "18px" }}>
              <Icon type={testResult} size={18} />
            </div>
          </Tooltip>
        )
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime",
        width: "20%"
      },
      {
        title: "End Time",
        key: "endTime",
        dataIndex: "endTime",
        width: "20%"
      },
      {
        title: "Logs",
        dataIndex: "errorMessage",
        key: "errorMessage",
        width: "20%",
        render: (errorMessage, row) =>
          row.testResult === "Fail" && (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button onClick={() => showError(errorMessage)}>Error</Button>
              <Button
                onClick={() => this.showScreenshot(row.errorScreenshotUrl)}
              >
                Screenshot
              </Button>
            </div>
          )
      }
    ];
  }
  async componentDidMount() {
    const {
      fetchTestRunnerDetail,
      fetchDeviceInfo,
      match,
      fetchChartData
    } = this.props;
    await fetchTestRunnerDetail(match.params.id);
    await fetchDeviceInfo(match.params.id);
    await fetchChartData(match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.chartData = {
        labels: ["Passed", "Failed", "Skipped"],
        datasets: [
          {
            data: this.props.testResultChartData,
            backgroundColor: ["#19BA98", "#FA134A", "#FFD90C"]
          }
        ]
      };
      this.forceUpdate();
    }
  }

  async showScreenshot(url) {
    await this.props.fetchErrorScreenshot(url);
    Modal.error({
      title: "Error Screenshot",
      content: (
        <img
          src={this.props.errorScreenshot}
          alt=""
          height="100%"
          width="100%"
        />
      ),
      width: "50%"
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <div
              style={{
                background: "#ECECEC",
                padding: "20px"
              }}
            >
              <Card
                title="TEST RESULTS"
                bordered={false}
                className="test-detail-card-height u-card--background"
              >
                <Chart
                  type="doughnut"
                  data={this.chartData}
                  options={chartOptions}
                  height="400px"
                  width="400px"
                />
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <div
              style={{
                background: "#ECECEC",
                padding: "20px"
              }}
            >
              <Card
                title="DEVICE"
                bordered={false}
                className="test-detail-card-height u-card--background"
              >
                <List
                  size="small"
                  itemLayout="horizontal"
                  dataSource={this.props.deviceInfo}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta title={item.title} />
                      <div>{item.value}</div>
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div
              style={{
                background: "#ECECEC",
                padding: "0px 20px 20px 20px"
              }}
            >
              <Card bordered={false} className="u-card--background">
                <Collapse>
                  {this.props.testRunnerDetail.map(element => {
                    return (
                      <Panel
                        header={headerContent(
                          element.className,
                          element.methods
                        )}
                        key={element.key}
                      >
                        <Table
                          columns={this.columns}
                          dataSource={element.methods}
                          bordered
                          pagination={false}
                        />
                      </Panel>
                    );
                  })}
                </Collapse>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testRunnerDetail: state[NAME].testRunnerDetail,
  errorScreenshot: state[NAME].errorScreenshot,
  deviceInfo: state[NAME].deviceInfo,
  testResultChartData: state[NAME].testResultChartData
});

const mapDispatchToProps = dispatch => ({
  fetchTestRunnerDetail: udid => dispatch(fetchTestRunnerDetail(udid)),
  fetchErrorScreenshot: url => dispatch(fetchErrorScreenshot(url)),
  fetchDeviceInfo: udid => dispatch(fetchDeviceInfo(udid)),
  fetchChartData: udid => dispatch(fetchChartData(udid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDetail);
