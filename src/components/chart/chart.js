import React, { Component } from "react";
import ChartJS from "chart.js";

class Chart extends Component {
  componentDidMount() {
    const { type, data, options } = this.props;
    new ChartJS(this.chartRef, {
      type,
      data,
      options
    });
  }

  render() {
    return (
      <div>
        <canvas ref={node => (this.chartRef = node)} />
      </div>
    );
  }
}

export default Chart;
