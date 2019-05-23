import React, { Component } from "react";
import { View, StyleSheet, Button, Platform, StatusBar, Dimensions, Alert } from "react-native";
import { BarCodeScanner } from "expo";
import PropTypes from "prop-types";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

import { Header } from "../components/common";

export default class BarCodeScannerExample extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      scanned: false
    };
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });

    let productName;

    switch (data) {
      case "3086123174337":
        productName = "Bic kleurstiften";
        break;
      case "8718452202928":
        productName = "Jumbo Ice Tea Peach koolzuurvrij";
        break;
      case "8718906901674":
        productName = "AH Basic Still Water";
        break;
    }

    let alertMessage = productName ? `Product: ${productName}` : `Data: ${data}`;

    Alert.alert("Scanned barcode", alertMessage, [
      {
        text: "Scan again",
        onPress: () => {
          this.setState({ scanned: false });
          console.log("Scan again");
        },
        style: "cancel"
      },
      {
        text: "Incorrect",
        onPress: () => {
          this.setState({ scanned: false });
          console.log("WRONG!");
        },
        style: "destructive"
      },
      {
        text: "Correct",
        onPress: () => {
          this.setState({ scanned: false });
          console.log("We guessed correctly!");
        },
        style: "default"
      }
    ]);
  };

  render() {
    const { scanned } = this.state;
    const { navigation } = this.props;
    const { width, height } = Dimensions.get("window");

    return (
      <>
        {Platform.OS === "ios" && <StatusBar animated={true} barStyle="light-content" />}
        <Header navigation={navigation} title="Scan een barcode" color="#FFFFFF" iconName="chevron-left" />
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={[styles.overlay, { width: width / 1.5, height: height / 5 }]}>
            {scanned && (
              <Button
                title={"Tap to Scan Again"}
                onPress={() => this.setState({ scanned: false })}
                style={styles.button}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  },
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.white,
    borderWidth: 2
  },
  overlayText: {
    color: Colors.white,
    fontFamily: ProductSans.regular
  },
  button: {
    width: 50
  }
});
