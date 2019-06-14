import React, { Component } from "react";
import { Permissions } from "expo";
import * as firebase from "firebase";
import "firebase/firestore";

import { createAppContainer, createStackNavigator } from "react-navigation";
import {
  HomeScreen,
  BarcodeScreen,
  DiscountScreen,
  InventoryScreen,
  SettingsScreen,
  SearchSuggestionsScreen
} from "../screens";

// Create the App stack with options
const Navigation = createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen },
      Barcode: { screen: BarcodeScreen },
      Inventory: { screen: InventoryScreen },
      Settings: { screen: SettingsScreen },
      Discount: { screen: DiscountScreen },
      SearchSuggestions: { screen: SearchSuggestionsScreen }
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

    if (!firebase.apps.length)
      firebase.initializeApp({
        apiKey: "AIzaSyBJvDpnmwD49n0-2gQACncAbxS9LxKZLk8",
        authDomain: "nofoodwasted-240908.firebaseapp.com",
        databaseURL: "https://nofoodwasted-240908.firebaseio.com",
        projectId: "nofoodwasted-240908",
        storageBucket: "nofoodwasted-240908.appspot.com",
        messagingSenderId: "386112526070",
        appId: "1:386112526070:web:3413d19f92479d8a"
      });
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
