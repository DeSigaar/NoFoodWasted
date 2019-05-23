import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import { MaterialIcons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class Header extends Component {
  static propTypes = {
    backButton: PropTypes.bool,
    actionButton: PropTypes.bool,
    actionType: PropTypes.string,
    actionPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static defaultProps = {
    backButton: true,
    actionButton: false,
    actionType: "add"
  };

  render() {
    const { title, navigation, backButton, actionButton, actionType, actionPress } = this.props;

    return (
      <View style={styles.container}>
        {backButton && (
          <View style={styles.side}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.goBack()}>
              <MaterialIcons style={styles.icon} name="arrow-back" />
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {actionButton && (
          <View style={styles.side}>
            <TouchableOpacity activeOpacity={0.6} onPress={() => actionPress()}>
              <MaterialIcons style={styles.icon} name={actionType} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  side: {
    height: 56,
    width: 56,
    justifyContent: "center",
    alignItems: "center"
  },
  center: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  icon: {
    fontSize: 28,
    color: Colors.blue
  },
  title: {
    fontSize: 26,
    fontFamily: ProductSans.bold,
    color: Colors.blue
  }
});
