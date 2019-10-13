import React from 'react'
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {View} from "react-native";

export default class CustomLineChart extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const contentInset = { top: 20, bottom: 20 };
        return (
            <View>
            <View style={{ height: this.props.height, flexDirection: 'row' }}>
                <YAxis
                    data={ this.props.data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 13,
                    }}
                    numberOfTicks={ 5 }
                    formatLabel={ value => `${value}  ` }
                />
                 <AreaChart
                    style={{ height: this.props.height, width:this.props.width }}
                    data={ this.props.data }
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={ shape.curveNatural }
                    svg={{ fill: 'rgba(201, 201, 201, 0.8)' }}
                >
                    <Grid/>
                </AreaChart>
            </View>
            </View>
        )
    }
}
