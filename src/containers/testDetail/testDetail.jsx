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
  fetchDeviceInfo
} from "./action";
import Icon from "../../components/icon/icon";
import "./testDetail.css";
import Chart from "../../components/chart/chart";

const Panel = Collapse.Panel;

const statusIconDesc = {
  fail: "Failed",
  pass: "Passed"
};

const showError = errorMessage => {
  Modal.error({
    title: "Error Detail",
    content: errorMessage,
    width: "50%"
  });
};

const countPassedOrFailedTest = methodList => {
  let passed = 0;
  let failed = 0;
  methodList.forEach(methodInfo => {
    if (methodInfo.testResult.toLowerCase() === "pass") {
      passed++;
    } else if (methodInfo.testResult.toLowerCase() === "fail") {
      failed++;
    }
  });
  return { passed, failed };
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
          count={countPassedOrFailedTest(methodList).passed}
          style={{ backgroundColor: "#228B22", marginRight: "5px" }}
        />
      </Tooltip>
      <Tooltip title="Failed Test">
        <Badge showZero count={countPassedOrFailedTest(methodList).failed} />
      </Tooltip>
    </div>
  </div>
);

const chartOptions = {
  legend: {
    display: true,
    position: "right",
    labels: {
      usePointStyle: true
    }
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
    this.chartData = {
      labels: ["Passed", "Failed"],
      datasets: [
        {
          data: [12, 34],
          backgroundColor: ["rgba(82, 196, 26, 1)", "rgba(255, 99, 132, 1)"]
        }
      ]
    };
  }
  async componentDidMount() {
    const { fetchTestRunnerDetail, fetchDeviceInfo, match } = this.props;
    await fetchTestRunnerDetail(match.params.id);
    await fetchDeviceInfo(match.params.id);
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
          <Col span={16}>
            <div
              style={{
                background: "#ECECEC",
                padding: "20px"
              }}
            >
              <Card
                title="TEST RESULTS"
                bordered={false}
                className="test-detail-card-height"
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
          <Col span={8}>
            <div
              style={{
                background: "#ECECEC",
                padding: "20px"
              }}
            >
              <Card
                title="DEVICE"
                bordered={false}
                className="test-detail-card-height"
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
                padding: "0px 20px 20px 20px",
                minHeight: "700px"
              }}
            >
              <Card bordered={false}>
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
  deviceInfo: state[NAME].deviceInfo
});

const mapDispatchToProps = dispatch => ({
  fetchTestRunnerDetail: udid => dispatch(fetchTestRunnerDetail(udid)),
  fetchErrorScreenshot: url => dispatch(fetchErrorScreenshot(url)),
  fetchDeviceInfo: udid => dispatch(fetchDeviceInfo(udid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDetail);
