import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, Image, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";
export default class MenuItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.any,
    onPress: PropTypes.func
  };

  render() {
    const { title, description, img, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.item} onPress={onPress}>
        <View style={styles.menuContainer}>
          <Image style={styles.image} source={img} resizeMode="contain" />
          <View style={styles.itemContent}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 9,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.white,
    flexWrap: "wrap",
    flexGrow: 1,
    flexBasis: "15%",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.white
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
    height: 50,
    marginLeft: 15,
    marginRight: 25,
    alignSelf: "center"
  },
  menuContainer: {
    width: "100%",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  itemContent: {
    alignContent: "flex-start"
  }
});
