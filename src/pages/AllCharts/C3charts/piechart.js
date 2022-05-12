import React, { Component } from 'react';

import C3Chart from 'react-c3js';
import 'c3/c3.css';

class PieChart extends Component {

    render() {
        const data = {
            columns: [
               ["Réserver",40],["Disponible",25]
            ],
            type:"pie",
          };
          const color = {pattern:["#57e9c9","#2f8ee0"]}
          const pie = {
              label:{show:!1}
            }

        return (
            <React.Fragment>
               <C3Chart data={data} pie={pie} color={color}/>
            </React.Fragment>
        );
    }
}

export default PieChart;