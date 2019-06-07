import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../components/common";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

import MenuItem from "../components/home/MenuItem";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Header
          navigation={navigation}
          title="NoFoodWasted"
          backButton={false}
          actionButton={true}
          actionType="settings"
          actionPress={() => navigation.navigate("Settings")}
        />
        <Container addStyles={styles.navigation}>
          <Image
            style={styles.image}
            source={require("../assets/images/undraw/deliveries.png")}
            loadingIndicatorSource={require("../assets/images/loading.gif")}
            resizeMode="contain"
          />
          <MenuItem
            title="Afprijzingen beheren"
            description="Overzicht van alle actieve afprijzingen"
            img={require("../assets/images/home/discount.png")}
            onPress={() => navigation.navigate("Schema")}
          />
          <MenuItem
            title="Aanbod beheren"
            description="Overzicht van alle producten"
            img={require("../assets/images/home/storage.png")}
            onPress={() => navigation.navigate("Inventory")}
          />
          <MenuItem
            title="Bestellingen beheren"
            description="Overzicht van alle actieve bestellingen"
            img={require("../assets/images/home/order.png")}
            onPress={() => navigation.navigate("Schema")}
          />
        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  text: {
    fontFamily: ProductSans.regular
  },
  image: {
    height: 200,
    marginTop: 10,
    marginBottom: 15,
    alignSelf: "center"
  },
  navigation: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "stretch"
  }
});
