import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class stackedbarchart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        colors: ["#2f8ee0", "#f0f1f4"],
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
          },
        },
        grid: {
          borderColor: "#f8f8fa",
          row: {
            colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },

        xaxis: {
          categories: [
            "Carburant(gazole)",
            "Taxi",
            "Train",
            "Avion",
            "Péage",
            "Parking",
            "Carburant(essence)",
            "Métro",
            "Restaurant midi",
            "Restaurant soir",
            "Hotel",
            "equipement",
          ],
          labels: {
            formatter: function (val) {
              return val
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            },
          },
        },
        fill: {
          opacity: 1,
        },

        legend: {
          show: false,
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
      series: [
        {
          name: "Series A",
          data:[3,9,3,11,5,6,4,8,9,12,3,12],
        },
       
      ],
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height="290"
        />
      </React.Fragment>
    )
  }
}

export default stackedbarchart
