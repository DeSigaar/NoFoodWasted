import React, { Component } from "react";
import { Permissions } from "expo";
import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import BarcodeScreen from "../screens/BarcodeScreen";
import VisionScreen from "../screens/VisionScreen";

// Create the App stack with options
const Navigation = createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      Barcode: { screen: BarcodeScreen },
      Vision: { screen: VisionScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "Home" // Change this if you want to directly go to a screen you are developing
    }
  )
);

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission } = this.state;

    return <Navigation screenProps={{ hasCameraPermission }} />;
  }
}
