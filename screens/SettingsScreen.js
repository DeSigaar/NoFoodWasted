import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../components/common";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Header navigation={navigation} title="Instellingen" />
        <Container addStyles={{ padding: 20 }}>
          <Text style={styles.title}>Instellingen scherm</Text>
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    fontSize: 14
  }
});
