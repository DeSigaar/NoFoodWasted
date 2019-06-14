import React, { Component } from "react";
import { Text, Image, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class InventoryItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    first: PropTypes.bool,
    onPress: PropTypes.func
  };

  render() {
    const { product, first, onPress } = this.props;
    const { width } = Dimensions.get("window");

    return (
      <View key={product.id} style={[styles.item, first && { borderTopWidth: 0 }, { width }]}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(product)} style={[styles.touchable]}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderTopWidth: 1,
    borderTopColor: Colors.greyTextColor
  },
  touchable: {
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20
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
