import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "heatmap",
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false
            },
            width: "100%"
          }
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: [
                { from: -5, to: 0, name: "very low", color: "#c0e0c3" },
                { from: 1, to: -1, name: "low", color: "#90c695" },
                { from: 0, to: 0.5, name: "medium", color: "#50bccd" },
                { from: 1.5, to: 8, name: "high", color: "#fba969" },
                { from: 9, to: 18, name: "very high", color: "#e08283" }
              ]
            }
          }
        },
        dataLabels: { enabled: true, style: { colors: ["#104c6d"] } },
        xaxis: {
          labels: {
            show: true,
            rotate: -45,
            rotateAlways: true,
            trim: true,
            maxHeight: 120,
            style: {
              colors: [],
              fontSize: "12px",
              cssClass: "apexcharts-xaxis-label"
            },
            offsetX: 0,
            offsetY: 0
          }
        }
      },
      series: [
        {
          name: "S1",
          data: [
            { x: "08:00", y: 5 },
            { x: "09:00", y: 5 },
            { x: "10:00", y: 1 }
          ]
        },
        {
          name: "S2",
          data: [
            { x: "08:00", y: 1 },
            { x: "09:00", y: 1 },
            { x: "10:00", y: 3 }
          ]
        },
        {
          name: "S3",
          data: [
            { x: "08:00", y: 0 },
            { x: "09:00", y: 0 },
            { x: "10:00", y: 0 }
          ]
        },
        {
          name: "S4",
          data: [
            { x: "08:00", y: 6 },
            { x: "09:00", y: 3 },
            { x: "10:00", y: 18 }
          ]
        },
        {
          name: "S5",
          data: [
            { x: "08:00", y: 0 },
            { x: "09:00", y: 0 },
            { x: "10:00", y: 0 }
          ]
        },
        {
          name: "S6",
          data: [
            { x: "08:00", y: 3 },
            { x: "09:00", y: 2 },
            { x: "10:00", y: 2 }
          ]
        },
        {
          name: "S7",
          data: [
            { x: "08:00", y: 4 },
            { x: "09:00", y: 1 },
            { x: "10:00", y: 2 }
          ]
        },
        {
          name: "S8",
          data: [
            { x: "08:00", y: 3 },
            { x: "09:00", y: 2 },
            { x: "10:00", y: 2 }
          ]
        }
      ]
    };
    this.adjustHeatRanges = this.adjustHeatRanges.bind(this);
    this.median = this.median.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  median(values) {
    values.sort((a, b) => {
      return a - b;
    });

    if (values.length === 0) return 0;

    var half = Math.floor(values.length / 2);

    if (values.length % 2) return values[half];
    else return (values[half - 1] + values[half]) / 2.0;
  }

  adjustHeatRanges(renderData) {
    if (!renderData) return false;

    let newRenderData = JSON.parse(JSON.stringify(renderData));
    let ranges = newRenderData.options.plotOptions.heatmap.colorScale.ranges;
    let valuesArray = [];

    newRenderData.series.map((serie, serieKey) => {
      newRenderData.series[serieKey].data.map((dataObject, dataObjectKey) => {
        valuesArray.push(dataObject.y);
      });
    });

    let min = Math.min(...valuesArray);
    let mid = this.median(valuesArray);
    let max = Math.max(...valuesArray);

    //calculating our mid points
    let minMid = Math.floor((min + mid) / 2);
    let midMax = Math.floor((mid + max) / 2);

    //very low range
    ranges[0].from = min > 0 ? min * 2 * -1 : -1;
    ranges[0].to = Math.floor(min);

    //low range
    ranges[1].from = Math.floor(min + 1);
    ranges[1].to = Math.floor(mid / 2 + 1);

    //medium range
    ranges[2].from = Math.floor(mid / 2 + 1);
    ranges[2].to = Math.floor(mid + 1);

    //high range
    ranges[3].from = Math.floor(mid + 1);
    ranges[3].to = Math.floor(max / 2 + 1);

    //very high range
    ranges[4].from = Math.floor(max / 2 + 1);
    ranges[4].to = max * 2;

    newRenderData.options.plotOptions.heatmap.colorScale.ranges = ranges;
    return newRenderData;
  }

  onClick() {
    let series = [
      {
        name: "S1",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 0 },
          { x: "10:00", y: 0 },
          { x: "11:00", y: 0 },
          { x: "12:00", y: 0 },
          { x: "13:00", y: 0 },
          { x: "14:00", y: 0 },
          { x: "15:00", y: 0 },
          { x: "16:00", y: 0 },
          { x: "17:00", y: 0 }
        ]
      },
      {
        name: "S2",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 2 },
          { x: "10:00", y: 2 },
          { x: "11:00", y: 2 },
          { x: "12:00", y: 2 },
          { x: "13:00", y: 2 },
          { x: "14:00", y: 2 },
          { x: "15:00", y: 2 },
          { x: "16:00", y: 2 },
          { x: "17:00", y: 2 }
        ]
      },
      {
        name: "S3",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 0 },
          { x: "10:00", y: 0 },
          { x: "11:00", y: 0 },
          { x: "12:00", y: 0 },
          { x: "13:00", y: 0 },
          { x: "14:00", y: 0 },
          { x: "15:00", y: 0 },
          { x: "16:00", y: 0 },
          { x: "17:00", y: 0 }
        ]
      },
      {
        name: "S4",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 6 },
          { x: "10:00", y: 6 },
          { x: "11:00", y: 6 },
          { x: "12:00", y: 6 },
          { x: "13:00", y: 5 },
          { x: "14:00", y: 2 },
          { x: "15:00", y: 1 },
          { x: "16:00", y: 1 },
          { x: "17:00", y: 1 }
        ]
      },
      {
        name: "S5",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 0 },
          { x: "10:00", y: 0 },
          { x: "11:00", y: 0 },
          { x: "12:00", y: 0 },
          { x: "13:00", y: 0 },
          { x: "14:00", y: 0 },
          { x: "15:00", y: 0 },
          { x: "16:00", y: 0 },
          { x: "17:00", y: 0 }
        ]
      },
      {
        name: "S6",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 2 },
          { x: "10:00", y: 2 },
          { x: "11:00", y: 2 },
          { x: "12:00", y: 2 },
          { x: "13:00", y: 1 },
          { x: "14:00", y: 1 },
          { x: "15:00", y: 1 },
          { x: "16:00", y: 1 },
          { x: "17:00", y: 1 }
        ]
      },
      {
        name: "S7",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 2 },
          { x: "10:00", y: 2 },
          { x: "11:00", y: 2 },
          { x: "12:00", y: 2 },
          { x: "13:00", y: 1 },
          { x: "14:00", y: 1 },
          { x: "15:00", y: 1 },
          { x: "16:00", y: 1 },
          { x: "17:00", y: 1 }
        ]
      },
      {
        name: "S8",
        data: [
          { x: "08:00", y: 0 },
          { x: "09:00", y: 2 },
          { x: "10:00", y: 2 },
          { x: "11:00", y: 2 },
          { x: "12:00", y: 2 },
          { x: "13:00", y: 2 },
          { x: "14:00", y: 2 },
          { x: "15:00", y: 2 },
          { x: "16:00", y: 2 },
          { x: "17:00", y: 2 }
        ]
      }
    ];

    let options = {
      chart: {
        type: "heatmap",
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          },
          width: "100%"
        }
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: -5, to: 0, name: "very low", color: "#c0e0c3" },
              { from: 1, to: -1, name: "low", color: "#90c695" },
              { from: 0, to: 0, name: "medium", color: "#50bccd" },
              { from: 1, to: 2, name: "high", color: "#fba969" },
              { from: 3, to: 6, name: "very high", color: "#e08283" }
            ]
          }
        }
      },
      dataLabels: { enabled: false, style: { colors: ["#104c6d"] } },
      xaxis: {
        labels: {
          show: true,
          rotate: -45,
          rotateAlways: true,
          trim: true,
          maxHeight: 120,
          style: {
            colors: [],
            fontSize: "12px",
            cssClass: "apexcharts-xaxis-label"
          },
          offsetX: 0,
          offsetY: 0
        }
      }
    };

    this.setState({ series, options });
  }

  render() {
    const { onClick } = this;
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="heatmap"
              width="500"
            />
            <button onClick={onClick}>Change</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
