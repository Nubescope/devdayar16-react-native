import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'

import CityPicker from './src/components/city-picker'
import * as weatherService from './src/services/weather'
import WeatherBox from './src/components/weather-box'
import BackgroundImage from './src/components/background-image'
import Overlay from './src/components/overlay'
import Row from './src/components/row'

export default class DevDay extends Component {
  state = {
    city: 'madrid'
  }

  componentDidMount() {
    this.handleCityChange(this.state.city)
  }

  handleCityChange = (city) => {
    this.setState({
      city,
    })

    weatherService
      .getForCity(city)
      .then((weather) => this.setState({ weather }))
  }

  render() {
    return (
      <View style={styles.container}>
        <BackgroundImage city={this.state.city} />
        <Row>
          <Overlay />
          <CityPicker
            selectedValue={this.state.city}
            onValueChange={this.handleCityChange}
           />
        </Row>
        <Row>
          <Overlay footer={true} />
          <WeatherBox weather={this.state.weather} />
        </Row>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})

AppRegistry.registerComponent('DevDay', () => DevDay)
