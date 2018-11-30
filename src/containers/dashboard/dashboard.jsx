import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Badge, Card, Row, Col, List } from "antd";
import Chart from "../../components/chart/chart";
import {
  fetchDashboardData,
  fetchChartData,
  fetchRunnerDetail
} from "./action";
import { NAME } from "./constant";
import Icon from "../../components/icon/icon";
import "./dashboard.css";

const columns = [
  {
    title: "Test Runner ID",
    dataIndex: "udid",
    key: "udid",
    render: uuid => <NavLink to={`/${uuid}`}>{uuid}</NavLink>
  },
  {
    title: "Device",
    dataIndex: "device",
    key: "device",
    sorter: (a, b) => a.device.length - b.device.length
  },
  {
    title: "OS",
    dataIndex: "os",
    key: "os",
    sorter: (a, b) => a.os.length - b.os.length,
    render: (os, row) => (
      <div>
        <Icon type={os} size={18} /> {row.osVersion}
      </div>
    )
  },
  {
    title: "Total",
    key: "total",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total,
    render: total => (
      <Badge count={total} style={{ backgroundColor: "#8470ff" }} />
    )
  },
  {
    title: "Passed",
    key: "passed",
    dataIndex: "passed",
    sorter: (a, b) => a.passed - b.passed,
    render: passed => (
      <Badge count={passed} style={{ backgroundColor: "#228B22" }} showZero />
    )
  },
  {
    title: "Skipped",
    key: "skipped",
    dataIndex: "skipped",
    sorter: (a, b) => a.skipped - b.skipped,
    render: skipped => (
      <Badge count={skipped} style={{ backgroundColor: "#FFC200" }} showZero />
    )
  },
  {
    title: "Failed",
    key: "failed",
    dataIndex: "failed",
    sorter: (a, b) => a.failed - b.failed,
    render: failed => <Badge count={failed} showZero />
  }
];

const getChartOptions = isLabelVisible => {
  return {
    legend: {
      display: isLabelVisible,
      position: "right",
      labels: {
        usePointStyle: true
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
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.testStatusChartData = {
      labels: ["Passed", "Failed", "Skipped"],
      datasets: [
        {
          data: this.props.testStatusChartData,
          backgroundColor: [
            "rgba(82, 196, 26, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 194, 0, 1)"
          ]
        }
      ]
    };
    this.deviceInfoChartData = {
      labels: this.props.deviceInfoChartData.chartLabels,
      datasets: [
        {
          data: this.props.deviceInfoChartData.chartData
        }
      ]
    };
  }

  async componentDidMount() {
    await this.props.fetchDashboardData();
    await this.props.fetchChartData();
    await this.props.fetchRunnerDetail();
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={8}>
            <div
              style={{
                background: "#ECECEC",
                padding: "20px"
              }}
            >
              <Card
                title="TEST STATUS REPORT"
                bordered={false}
                className="dashboard-card-height"
              >
                <Chart
                  type="doughnut"
                  data={this.testStatusChartData}
                  options={getChartOptions(true)}
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
                title="DEVICE INFO REPORT"
                bordered={false}
                className="dashboard-card-height"
              >
                <Chart
                  type="doughnut"
                  data={this.deviceInfoChartData}
                  options={getChartOptions(false)}
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
                title="RUNNER INFO"
                bordered={false}
                className="dashboard-card-height"
              >
                <List
                  size="small"
                  itemLayout="horizontal"
                  dataSource={this.props.envInfo}
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
              <Card title="" bordered={false}>
                <Table
                  columns={columns}
                  dataSource={this.props.testResult}
                  bordered
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testResult: state[NAME].testResult,
  testStatusChartData: state[NAME].testStatusChartData,
  deviceInfoChartData: state[NAME].deviceInfoChartData,
  envInfo: state[NAME].envInfo
});

const mapDispatchToProps = dispatch => ({
  fetchDashboardData: () => dispatch(fetchDashboardData()),
  fetchChartData: () => dispatch(fetchChartData()),
  fetchRunnerDetail: () => dispatch(fetchRunnerDetail())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
