import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PropTypes from "prop-types";

import ProductSans from "../constants/fonts/ProductSans";
import Gradients from "../constants/Gradients";

import { Header } from "../components/common";
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
        <View style={styles.container}>
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
              onPress={() => navigation.navigate("Schema")}
            />
            <MenuItem
              title="Bestellingen beheren"
              description="Overzicht van alle actieve bestellingen"
              img={require("../assets/images/home/bestelling.png")}
              onPress={() => navigation.navigate("Schema")}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch"
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
