import React, { Component } from "react";
import { Text, Image, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class DiscountItem extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    discount: PropTypes.object.isRequired,
    first: PropTypes.bool,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const { product, discount, first, onPress } = this.props;
    const { width } = Dimensions.get("window");

    return (
      <View key={product.id} style={[styles.item, first && { borderTopWidth: 0 }, { width }]}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(product, discount)} style={[styles.touchable]}>
          <Image
            style={styles.image}
            source={require("../../assets/images/home/discount.png")}
            loadingIndicatorSource={require("../../assets/images/loading.gif")}
            resizeMode="contain"
          />
          <View style={styles.contentBox}>
            <View style={styles.contentMid}>
              <Text style={styles.title}>
                {product.brand} {product.name}
              </Text>
              <View style={styles.discount}>
                <Text style={styles.beforePrice}>€{product.regular_price.toFixed(2)}</Text>
                <Text style={styles.divider}> | </Text>
                <Text style={styles.afterPrice}>€{product.discounted_price.toFixed(2)}</Text>
              </View>
            </View>
            <View style={styles.amountCounter}>
              <Text style={styles.amount}>{discount.amount}</Text>
              <Text style={styles.amountText}>stuks</Text>
            </View>
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
  contentBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    color: Colors.blue,
    fontFamily: ProductSans.bold,
    fontSize: 18,
    marginBottom: 10
  },
  discount: {
    flexDirection: "row"
  },
  divider: {
    fontSize: 18
  },
  beforePrice: {
    fontSize: 18,
    color: Colors.red,
    textDecorationLine: "line-through"
  },
  afterPrice: {
    fontSize: 18,
    color: Colors.blue
  },
  amountCounter: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: 20
  },
  amount: {
    fontFamily: ProductSans.bold,
    color: Colors.blue,
    fontSize: 39
  },
  amountText: {
    fontFamily: ProductSans.bold,
    color: Colors.greyTextColor,
    fontSize: 16
  }
});
