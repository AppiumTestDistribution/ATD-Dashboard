import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Badge, Card, Row, Col } from "antd";
import Chart from "../../components/chart/chart";
import { fetchTestResult } from "./action";
import { NAME } from "./constant";
import Icon from "../../components/icon/icon";

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
      <Badge count={passed} style={{ backgroundColor: "#228B22" }} />
    )
  },
  {
    title: "Failed",
    key: "failed",
    dataIndex: "failed",
    sorter: (a, b) => a.failed - b.failed,
    render: failed => <Badge count={failed} />
  }
];

const chartData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "# of Likes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)"
      ]
    }
  ]
};

const chartOptions = {
  legend: {
    display: true,
    position: "left",
    labels: {
      usePointStyle: true
    }
  }
};
class Dashboard extends Component {
  async componentDidMount() {
    await this.props.fetchTestResult();
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
              <Card title="Card title" bordered={false}>
                <Chart
                  type="doughnut"
                  data={chartData}
                  options={chartOptions}
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
              <Card title="Card title" bordered={false}>
                <Chart
                  type="polarArea"
                  data={chartData}
                  options={chartOptions}
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
              <Card title="Card title" bordered={false}>
                <Chart type="pie" data={chartData} options={chartOptions} />
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
                minHeight: "450px"
              }}
            >
              <Card title="Card title" bordered={false}>
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
  testResult: state[NAME].testResult
});

const mapDispatchToProps = dispatch => ({
  fetchTestResult: () => dispatch(fetchTestResult())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
