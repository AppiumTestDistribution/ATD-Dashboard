import React, { Component } from "react";
import { Table } from "antd";
import { data } from "../misc";

const columns = [
  {
    title: "Test Runner ID",
    dataIndex: "uuid",
    key: "uuid",
    render: uuid => <a href="hello">{uuid}</a>
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
    title: "Duration",
    key: "duration",
    dataIndex: "duration",
    sorter: (a, b) => a.duration - b.duration
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
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} bordered />
      </div>
    );
  }
}

export default Dashboard;
