import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";

import { Header, Container } from "../components/common";
import { InventoryItem } from "../components/Inventory";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

export default class InventoryScreen extends Component {
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
          <Text style={styles.headDescription}>
            In het onderstaande overzicht staan alle producten die bij uw bedrijf zijn toegevoegd aan het aanbod. U kunt
            via deze pagina het aanbod uitbreiden en aanpassen.
          </Text>
        </Container>
        <Container addStyles={{ marginTop: 0 }}>
          <InventoryItem title="AH ijsbergsla" description="Knapperige ijsbergsla, heerlijk fris van smaak." />
          <InventoryItem title="Ola Ijs raket" description="De frisse combinatie van ananas, framboos en sinaasappel verveelt nooit." />
          {/* <View style={styles.InventoryItem}>
            <Image style={styles.image} source={require("../assets/images/home/group_19.png")} resizeMode="contain" />
            <View style={styles.inventoryContent}>
              <Text style={styles.title}>AH ijsbergsla</Text>
              <View style={styles.descriptionText}>
                <Text style={styles.description}>Knapperige ijsbergsla, heerlijk fris van smaak.</Text>
              </View>
            </View>
          </View> */}
        </Container>
        <TouchableOpacity
          activeOpacity={barcodeLoading ? 1 : 0.5}
          onPress={() => {
            this.setState({ barcodeLoading: true });
            setTimeout(() => {
              navigation.navigate("Barcode");
              this.setState({ barcodeLoading: false });
            }, 100);
          }}
          style={styles.TouchableOpacityStyle}
        >
          <Image source={require("../assets/images/icon/add.png")} style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
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
  headDescription: {
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    fontSize: 14
  },
  description: {
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap-reverse"
  },
  image: {
    marginRight: 35,
    width: 71,
    height: 71
  },
  InventoryItem: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyTextColor
  },
  inventoryContent: {
    width: 215
  },
  descriptionText: {
    flexDirection: "row"
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 50,
    bottom: 50
  },
  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 80,
    height: 80
  }
});
