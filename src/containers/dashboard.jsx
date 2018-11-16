import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "antd";
import { fetchTestResult } from "./action";
import { NAME } from "./constant";

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
    sorter: (a, b) => a.os.length - b.os.length
  },
  {
    title: "Total",
    key: "total",
    dataIndex: "total",
    sorter: (a, b) => a.total - b.total
  },
  {
    title: "Passed",
    key: "passed",
    dataIndex: "passed",
    sorter: (a, b) => a.passed - b.passed
  },
  {
    title: "Failed",
    key: "failed",
    dataIndex: "failed",
    sorter: (a, b) => a.failed - b.failed
  }
];

class Dashboard extends Component {
  async componentDidMount() {
    await this.props.fetchTestResult();
  }

  render() {
    return (
      <div>
        <Table columns={columns} dataSource={this.props.testResult} bordered />
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
