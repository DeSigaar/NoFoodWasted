import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
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
        <Header navigation={navigation} title="Aanbod" />
        <Container addStyles={{ padding: 20 }}>
          <Text style={styles.text}>
            In het onderstaande overzicht staan alle producten die bij uw bedrijf zijn toegevoegd aan het aanbod. U kunt
            via deze pagina het aanbod uitbreiden en aanpassen.
          </Text>
        </Container>
        <Container addStyles={{ marginTop: 0 }}>
          <View style={styles.InventoryItem}>
            <Image style={styles.image} source={require("../assets/images/home/group_19.png")} resizeMode="contain" />
            <View style={styles.inventoryContent}>
              <Text style={styles.title}>AH ijsbergsla</Text>
              <Text style={styles.description}>Knapperige ijsbergsla, heerlijk fris van smaak.</Text>
            </View>
          </View>
        </Container>
        {/* <Container addStyles={{ padding: 20, marginTop: 5 }}>
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
        </Container> */}
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
  title: {
    color: Colors.blue,
    fontFamily: ProductSans.bold,
    fontSize: 21,
    marginBottom: 10
  },
  description: {
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    fontSize: 14
  },
  image: {
    width: 50,
    height: 50
  }
});
