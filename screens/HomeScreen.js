import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../components/common";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      barcodeLoading: false
    };
  }

  render() {
    const { navigation } = this.props;
    const { barcodeLoading } = this.state;

    return (
      <>
        <Header navigation={navigation} title="NoFoodWasted" backButton={false} />
        <Container>
          <TouchableOpacity
            activeOpacity={barcodeLoading ? 1 : 0.5}
            onPress={() => {
              this.setState({ barcodeLoading: true });
              setTimeout(() => {
                navigation.navigate("Barcode");
                this.setState({ barcodeLoading: false });
              }, 100);
            }}
            style={styles.button}
          >
            {barcodeLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Barcode</Text>}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Vision")} style={styles.button}>
            <Text style={styles.buttonText}>Vision</Text>
          </TouchableOpacity>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: ProductSans.regular
  },
  button: {
    backgroundColor: Colors.greyTextColor,
    height: 35,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14
  },
  buttonText: {
    fontFamily: ProductSans.regular,
    color: Colors.white,
    fontSize: 20
  }
});
