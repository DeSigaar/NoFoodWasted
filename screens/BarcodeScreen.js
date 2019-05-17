import React, { Component } from "react";
import { Text, View, StyleSheet, Button, Platform, StatusBar } from "react-native";
import { Permissions, BarCodeScanner } from "expo";
import PropTypes from "prop-types";

import Colors from "../constants/Colors";

import { Header } from "../components/common";

export default class BarCodeScannerExample extends Component {
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

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    switch (data) {
      case "8718452202928":
        alert("Scanned 'Jumbo Ice Tea Peach koolzuurvrij'");
        break;
      case "3086123174337":
        alert("Scanned 'Bic kleurstiften'");
        break;
      default:
        alert(`Scanned barcode with data ${data} has been scanned!`);
        break;
    }
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    const { navigation } = this.props;

    if (hasCameraPermission === null) return <Text>Requesting for camera permission</Text>;
    if (hasCameraPermission === false) return <Text>No access to camera</Text>;

    return (
      <>
        {Platform.OS === "ios" && <StatusBar animated={true} barStyle="light-content" />}
        <Header navigation={navigation} title="Scan een barcode" color="#FFFFFF" iconName="chevron-left" />
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay}>
            <Text>Overlay</Text>
          </View>
          {scanned && <Button title={"Tap to Scan Again"} onPress={() => this.setState({ scanned: false })} />}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: -1
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  overlayText: {
    backgroundColor: Colors.white
  }
});
