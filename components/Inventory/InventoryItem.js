import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PropTypes from "prop-types";

import ProductSans from "../../constants/fonts/ProductSans";
import Colors from "../../constants/Colors";

export default class InventoryItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string
  };

  render() {
    const { title, description } = this.props;

    return (
      <View style={styles.InventoryItem}>
        <Image style={styles.image} source={require("../../assets/images/home/aanbod.png")} resizeMode="contain" />
        <View style={styles.inventoryContent}>
          <Text style={styles.titleInventory}>{title}</Text>
          <View style={styles.descriptionText}>
            <Text style={styles.descriptionInventory}>{description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleInventory: {
    color: Colors.blue,
    fontFamily: ProductSans.bold,
    fontSize: 21,
    marginBottom: 10
  },
  descriptionInventory: {
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
  }
});
