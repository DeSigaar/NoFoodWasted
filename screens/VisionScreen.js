import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Platform, StatusBar } from "react-native";
import { Permissions, BarCodeScanner } from "expo";
import PropTypes from "prop-types";
import vision from "@google-cloud/vision";


import { Header } from "../components/common";

export default class VisionScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      scanned: false
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    return (
      <View></View>
    );
  }
}
