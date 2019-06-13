import React, { Component } from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View, Dimensions } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class InventoryItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    first: PropTypes.bool,
    onPress: PropTypes.function
  };

  render() {
    const { product, first, onPress } = this.props;
    const { width } = Dimensions.get("window");

    return (
      <TouchableOpacity
        key={product.id}
        style={[styles.item, first && { borderTopWidth: 0 }, { width }]}
        onPress={() => onPress()}
      >
        <Image
          style={styles.image}
          source={require("../../assets/images/home/storage.png")}
          loadingIndicatorSource={require("../../assets/images/loading.gif")}
          resizeMode="contain"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            {product.brand} {product.name}
          </Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.greyTextColor
  },
  image: {
    marginLeft: 10,
    marginRight: 20,
    width: 60,
    height: 60
  },
  content: {
    flex: 1
  },
  title: {
    color: Colors.blue,
    fontFamily: ProductSans.bold,
    fontSize: 18,
    marginBottom: 10
  },
  description: {
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    fontSize: 14
  }
});
