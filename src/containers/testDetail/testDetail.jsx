import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, Card, Table, Row, Col, Badge } from "antd";
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
      <Badge
        showZero
        count={methodList.length}
        style={{ backgroundColor: "#8470ff", marginRight: "5px" }}
      />
      <Badge
        showZero
        count={countPassedOrFailedTest(methodList).passed}
        style={{ backgroundColor: "#228B22", marginRight: "5px" }}
      />
      <Badge showZero count={countPassedOrFailedTest(methodList).failed} />
    </div>
  </div>
);

class TestDetail extends Component {
  async componentDidMount() {
    const { fetchDeviceInfo, match } = this.props;
    await fetchDeviceInfo(match.params.id);
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
              <Card title="Card title" bordered={false} />
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                background: "#ECECEC",
                padding: "20px"
              }}
            >
              <Card title="Card title" bordered={false} />
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
              <Card title="Card title" bordered={false}>
                <Collapse>
                  {this.props.deviceInfo.map(element => {
                    return (
                      <Panel
                        header={headerContent(
                          element.className,
                          element.methods
                        )}
                        key={element.key}
                      >
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
          </Col>
        </Row>
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
