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
      <Badge
        count={total}
        style={{
          backgroundColor: "#8470ff",
          color: "black",
          fontWeight: "700"
        }}
      />
    )
  },
  {
    title: "Passed",
    key: "passed",
    dataIndex: "passed",
    sorter: (a, b) => a.passed - b.passed,
    render: passed => (
      <Badge
        count={passed}
        style={{
          backgroundColor: "#19BA98",
          color: "black",
          fontWeight: "700"
        }}
        showZero
      />
    )
  },
  {
    title: "Skipped",
    key: "skipped",
    dataIndex: "skipped",
    sorter: (a, b) => a.skipped - b.skipped,
    render: skipped => (
      <Badge
        count={skipped}
        style={{
          backgroundColor: "#FFD90C",
          color: "black",
          fontWeight: "700"
        }}
        showZero
      />
    )
  },
  {
    title: "Failed",
    key: "failed",
    dataIndex: "failed",
    sorter: (a, b) => a.failed - b.failed,
    render: failed => (
      <Badge
        count={failed}
        showZero
        style={{
          backgroundColor: "#FA134A",
          color: "black",
          fontWeight: "700"
        }}
      />
    )
  }
];

const getChartOptions = isLabelVisible => {
  return {
    legend: {
      display: isLabelVisible,
      position: "right",
      labels: {
        usePointStyle: true,
        fontColor: "white",
        fontSize: 13
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
  async componentDidMount() {
    await this.props.fetchDashboardData();
    await this.props.fetchChartData();
    await this.props.fetchRunnerDetail();
  }

  componentDidUpdate() {
    this.testStatusChartData = {
      labels: ["Passed", "Failed", "Skipped"],
      datasets: [
        {
          data: this.props.testStatusChartData,
          backgroundColor: ["#19BA98", "#FA134A", "#FFD90C"],
          borderWidth: 0
        }
      ]
    };
    this.deviceInfoChartData = {
      labels: this.props.deviceInfoChartData.chartLabels,
      datasets: [
        {
          data: this.props.deviceInfoChartData.chartData,
          borderWidth: 0
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={8} className="u-main-grid--color">
            <div className="u-main-chart-container">
              <h2>TEST STATUS REPORT</h2>
              <Chart
                type="doughnut"
                data={this.testStatusChartData}
                options={getChartOptions(true)}
                height="50px"
                width="100px"
              />
            </div>
          </Col>
          <Col span={8} className="u-main-grid--color">
            <div className="u-main-chart-container">
              <h2>DEVICE INFO REPORT</h2>
              <Chart
                type="doughnut"
                data={this.deviceInfoChartData}
                options={getChartOptions(false)}
                height="50px"
                width="100px"
              />
            </div>
          </Col>
          <Col span={8} className="u-main-grid--color">
            <div className="u-main-chart-container">
              <h2>RUNNER INFO</h2>
              <List
                className="u-main-list"
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
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="u-main-grid--color">
            <div
              style={{
                background: "#ECECEC",
                padding: "0px 20px 20px 20px"
              }}
            >
              <Card title="" bordered={false} className="u-card--background">
                <Table columns={columns} dataSource={this.props.testResult} />
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
