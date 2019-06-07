import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, StyleSheet } from "react-native";

export default class Container extends Component {
  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.any,
    addStyles: PropTypes.object
  };

  static defaultProps = {
    type: "View"
  };

  render() {
    const { type, children, addStyles } = this.props;

    switch (type) {
      default:
      case "View":
        return (
          <View style={[styles.container, addStyles, { justifyContent: "center", alignItems: "stretch" }]}>
            {children}
          </View>
        );
      case "ScrollView":
        return <ScrollView style={[styles.container, addStyles]}>{children}</ScrollView>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    flexDirection: "column",
    flexWrap: "wrap"
  }
});
