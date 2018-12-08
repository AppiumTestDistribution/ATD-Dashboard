import React, { Component } from "react";
import ChartJS from "chart.js";
import "chartjs-plugin-labels";
import "chartjs-plugin-colorschemes";

class Chart extends Component {
  componentDidUpdate() {
    const { type, data, options } = this.props;
    new ChartJS(this.chartRef, {
      type,
      data,
      options
    });
  }

  render() {
    const { width, height } = this.props;
    return (
      <div>
        <canvas
          ref={node => (this.chartRef = node)}
          style={{ width, height }}
        />
      </div>
    );
  }
}

export default Chart;
