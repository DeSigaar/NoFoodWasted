import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Platform, TouchableWithoutFeedback, Modal as ReactNativeModal } from "react-native";

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    isVisible: PropTypes.bool.isRequired,
    windowBackgroundColor: PropTypes.string,
    overlayBackgroundColor: PropTypes.string,
    onBackdropPress: PropTypes.func,
    borderRadius: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fullScreen: PropTypes.bool
  };

  static defaultProps = {
    borderRadius: 3,
    fullScreen: false,
    windowBackgroundColor: "rgba(0, 0, 0, .4)",
    overlayBackgroundColor: "white",
    onBackdropPress: () => null
  };

  render() {
    const {
      children,
      isVisible,
      windowBackgroundColor,
      overlayBackgroundColor,
      onBackdropPress,
      borderRadius,
      width,
      height,
      fullScreen,
      ...rest
    } = this.props;

    return (
      <ReactNativeModal
        visible={isVisible}
        onRequestClose={onBackdropPress}
        transparent
        {...rest}
        style={styles.ReactNativeModal}
      >
        <TouchableWithoutFeedback onPress={onBackdropPress} testID="RNE__Overlay__backdrop">
          <View
            testID="overlayContainer"
            style={StyleSheet.flatten([styles.backdrop, { backgroundColor: windowBackgroundColor }])}
          />
        </TouchableWithoutFeedback>

        <View style={styles.container} pointerEvents="box-none">
          <View
            style={StyleSheet.flatten([
              styles.overlay,
              {
                borderRadius,
                backgroundColor: overlayBackgroundColor,
                width,
                height
              },
              fullScreen && styles.fullscreen
            ])}
          >
            {children}
          </View>
        </View>
      </ReactNativeModal>
    );
  }
}

const styles = StyleSheet.create({
  ReactNativeModal: {
    zIndex: 10
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fullscreen: {
    width: "100%",
    height: "100%"
  },
  overlay: {
    borderRadius: 13,
    padding: 25,
    ...Platform.select({
      android: {
        elevation: 2
      },
      default: {
        shadowColor: "rgba(0, 0, 0, .3)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4
      }
    })
  }
});
