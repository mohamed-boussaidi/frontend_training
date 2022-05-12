import React, { Component } from 'react';

import C3Chart from 'react-c3js';
import 'c3/c3.css';

class DonutChart extends Component {

    render() {
        const data = {
            columns: [
                ['Mobiles', 30],
                ['PC', 10]
            ],
            type: "donut",
        };

        const donut = {
            title: "Materiels En Stock",
            width: 30,
            label: { show: !1 }
        };

        const color = {
            pattern: ["#2f8ee0", "#57e9c9"]
        };

        const size = {
            height: 300
        };

        return (
            <React.Fragment>
                <C3Chart data={data} donut={donut} color={color} size={size} dir="ltr" />
            </React.Fragment>
        );
    }
}

export default DonutChart;