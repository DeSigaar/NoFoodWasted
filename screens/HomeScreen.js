import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { Header } from "../components/common";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Header navigation={navigation} title="NoFoodWasted" backButton={false} />
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Barcode")} style={styles.button}>
            <Text style={styles.buttonText}>Barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Vision")} style={styles.button}>
            <Text style={styles.buttonText}>Vision</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    padding: 20
  },
  text: {
    fontFamily: ProductSans.regular
  },
  button: {
    backgroundColor: Colors.greyTextColor,
    height: 35,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontFamily: ProductSans.regular,
    color: Colors.white,
    fontSize: 22
  }
});
