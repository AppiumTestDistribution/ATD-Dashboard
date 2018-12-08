import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, Table, Row, Col, Button, Modal, Tooltip, List } from "antd";
import ReactPlayer from "react-player";
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

const findTotalDuration = methodList => {
  return "00:01:12";
};

const headerContent = (className, methodList) => (
  <div className="u-header-container">
    <div className="u-header-test-class">{className}</div>
    <div style={{ marginRight: "8px", display: "flex" }}>
      <div className="u-header-sub-container u-header-divider">
        <p className="u-header-count u-duration--color">
          {findTotalDuration(methodList)}
        </p>
        <p className="u-header-status u-duration--color">Duration</p>
      </div>
      <div className="u-header-sub-container u-header-divider">
        <p className="u-header-count u-total--color">{methodList.length}</p>
        <p className="u-header-status u-total--color">Tests</p>
      </div>
      <div className="u-header-sub-container u-header-divider">
        <p className="u-header-count u-passed--color">
          {countTestByStatus(methodList).passed}
        </p>
        <p className="u-header-status u-passed--color">Passed</p>
      </div>
      <div className="u-header-sub-container u-header-divider">
        <p className="u-header-count u-failed--color">
          {countTestByStatus(methodList).failed}
        </p>
        <p className="u-header-status u-failed--color">Failed</p>
      </div>
      <div className="u-header-sub-container">
        <p className="u-header-count u-skipped--color">
          {countTestByStatus(methodList).skipped}
        </p>
        <p className="u-header-status u-skipped--color">Skipped</p>
      </div>
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
      fontSize: 15,
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
        width: "20%"
      },
      {
        title: "Provider Value",
        dataIndex: "providerValue",
        key: "providerValue",
        width: "20%",
        render: providerValue => (
          <Button
            type="primary"
            onClick={() => this.showProviderValue(providerValue)}
          >
            Data
          </Button>
        )
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
        width: "10%"
      },
      {
        title: "End Time",
        key: "endTime",
        dataIndex: "endTime",
        width: "10%"
      },
      {
        title: "Logs",
        dataIndex: "errorMessage",
        key: "errorMessage",
        width: "20%",
        render: (errorMessage, row) =>
          row.testResult === "Fail" && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="primary" onClick={() => showError(errorMessage)}>
                Error
              </Button>
              <Button
                type="primary"
                onClick={() => this.showScreenshot(row.errorScreenshotUrl)}
              >
                Screenshot
              </Button>
              <Button
                type="primary"
                onClick={() => this.showVideo(row.errorScreenshotUrl)}
              >
                Video
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

  async showVideo(url) {
    Modal.error({
      title: "Video",
      content: (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
          playing
        />
      ),
      width: "55%"
    });
  }

  async showProviderValue(providerValue) {
    Modal.info({
      title: "Provider Value",
      content: (
        <List
          bordered
          dataSource={providerValue}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      ),
      width: "55%"
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={10} className="u-grid--color">
            <div className="u-chart-container">
              <h2>TEST RESULTS</h2>
              <Chart
                type="doughnut"
                data={this.chartData}
                options={chartOptions}
                height="40px"
                width="100px"
              />
            </div>
          </Col>
          <Col span={4} />
          <Col span={10} className="u-grid--color">
            <div className="u-chart-container">
              <h2>DEVICE</h2>
              <List
                itemLayout="horizontal"
                dataSource={this.props.deviceInfo}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={item.title} />
                    <div>{item.value}</div>
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="u-grid--color">
            <div
              style={{
                background: "#ECECEC",
                padding: "0px 20px 20px 20px"
              }}
            >
              <Collapse>
                {this.props.testRunnerDetail.map(element => {
                  return (
                    <Panel
                      header={headerContent(element.className, element.methods)}
                      key={element.key}
                    >
                      <Table
                        columns={this.columns}
                        dataSource={element.methods}
                        pagination={false}
                      />
                    </Panel>
                  );
                })}
              </Collapse>
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
