import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
import ProductSans from "../../constants/fonts/ProductSans";
import Colors from "../../constants/Colors";

export default class Overlay extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scanned: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const { width, height, scanned, loading, onPress } = this.props;

    return (
      <View style={[styles.box, { width: width / 1.5, height: height / 5 }]}>
        <View style={[styles.boxSide, { height: height / 5 }]}>
          <View style={[styles.boxBorder, { borderBottomWidth: 0, borderRightWidth: 0 }]} />
          <View style={[styles.boxBorder, { borderTopWidth: 0, borderRightWidth: 0 }]} />
        </View>
        {scanned && !loading && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onPress()}
            style={[styles.button, { width: width / 3, height: height / 20 }]}
          >
            <Text style={styles.buttonText}>Opnieuw scannen</Text>
          </TouchableOpacity>
        )}
        {loading && <ActivityIndicator size="large" color="#FFFFFF" />}
        <View style={[styles.boxSide, { height: height / 5, alignItems: "flex-end" }]}>
          <View style={[styles.boxBorder, { borderBottomWidth: 0, borderLeftWidth: 0 }]} />
          <View style={[styles.boxBorder, { borderTopWidth: 0, borderLeftWidth: 0 }]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boxSide: {
    width: 25,
    justifyContent: "space-between"
  },
  boxBorder: {
    width: 25,
    height: 25,
    borderWidth: 4,
    borderColor: Colors.white
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyTextColor,
    borderRightWidth: 1,
    borderRightColor: Colors.greyTextColor
  },
  buttonText: {
    fontFamily: ProductSans.regular,
    color: Colors.greyTextColor
  }
});
