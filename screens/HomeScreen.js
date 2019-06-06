import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../components/common";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

import MenuItem from "../components/home/MenuItem";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  render() {
    const { navigation } = this.props;

    return (
      <>
        <Header navigation={navigation} title="Home" backButton={false} actionButton="true" actionType="settings" />
        <Container>
          <Image style={styles.image} source={require("../assets/images/home/group_19.png")} resizeMode="contain" />
          <View style={styles.navigation}>
            <MenuItem
              title="Afprijzingen beheren"
              description="Overzicht van alle actieve afprijzingen"
              img={require("../assets/images/home/afprijzingen.png")}
              onPress={() => navigation.navigate("Schema")}
            />
            <MenuItem
              title="Aanbod beheren"
              description="Overzicht van alle producten"
              img={require("../assets/images/home/aanbod.png")}
              onPress={() => navigation.navigate("Inventory")}
            />
            <MenuItem
              title="Bestellingen beheren"
              description="Overzicht van alle actieve bestellingen"
              img={require("../assets/images/home/bestelling.png")}
              onPress={() => navigation.navigate("Schema")}
            />
          </View>
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
    marginTop: 30,
    marginBottom: 58,
    height: 200,
    alignSelf: "center"
  },
  navigation: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "stretch"
  }
});
