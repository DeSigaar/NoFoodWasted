import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, Image } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../components/common";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";
import Gradients from "../constants/Gradients";

import MenuItem from "../components/home/MenuItem";

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
        {/* <Header navigation={navigation} title="NoFoodWasted" backButton={false} />
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
        </Container> */}
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
