import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, Card, Table } from "antd";
import { NAME } from "./constant";
import { fetchDeviceInfo } from "./action";
import Icon from "../../components/icon/icon";

const Panel = Collapse.Panel;

const columns = [
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
      <div>
        <Icon type={testResult} size={18} />
      </div>
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
    title: "Error Message",
    dataIndex: "errorMessage",
    key: "errorMessage",
    width: "20%"
  }
];

class TestDetail extends Component {
  async componentDidMount() {
    const { fetchDeviceInfo, match } = this.props;
    await fetchDeviceInfo(match.params.id);
  }

  render() {
    return (
      <div
        style={{ background: "#ECECEC", padding: "20px", minHeight: "800px" }}
      >
        <Card title="Card title" bordered={false}>
          <Collapse>
            {this.props.deviceInfo.map(element => {
              return (
                <Panel header={element.className} key={element.key}>
                  <Table
                    columns={columns}
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
    );
  }
}

const mapStateToProps = state => ({
  deviceInfo: state[NAME].deviceInfo
});

const mapDispatchToProps = dispatch => ({
  fetchDeviceInfo: udid => dispatch(fetchDeviceInfo(udid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestDetail);
