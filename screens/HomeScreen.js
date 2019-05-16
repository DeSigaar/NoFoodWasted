import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import ProductSans from "../constants/fonts/ProductSans";

import { Header } from "../components/common";

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
          <Text style={styles.text}>Hello world</Text>
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
  }
});
