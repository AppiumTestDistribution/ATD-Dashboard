import React, { Component } from "react";
import ChartJS from "chart.js";

class Chart extends Component {
  componentDidMount() {
    new ChartJS(this.chartRef, {
      type: this.props.type,
      data: {
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
      },
      options: {
        legend: {
          display: true,
          position: "left",
          labels: {
            usePointStyle: true
          }
        }
      }
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
