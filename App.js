import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, StatusBar } from "react-native";
import { AppLoading, Asset, Font } from "expo";

import { MaterialIcons } from "@expo/vector-icons";

import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false
    };
  }

  _loadResourcesAsync = async () => {
    cacheImages = images => {
      return images.map(image => {
        if (typeof image === "string") {
          return Image.prefetch(image);
        } else {
          return Asset.fromModule(image).downloadAsync();
        }
      });
    };
    cacheFonts = fonts => {
      return fonts.map(font => Font.loadAsync(font));
    };

    const imageAssets = cacheImages([
      require("./assets/images/icon/icon.png"),
      require("./assets/images/icon/splash.png"),
      require("./assets/images/loading.gif"),
      require("./assets/images/undraw/deliveries.png"),
      require("./assets/images/home/discount.png"),
      require("./assets/images/home/order.png"),
      require("./assets/images/home/storage.png")
    ]);

    const fontAssets = cacheFonts([
      MaterialIcons.font,
      { "product-sans": require("./assets/fonts/ProductSans/ProductSansRegular.ttf") },
      { "product-sans-bold": require("./assets/fonts/ProductSans/ProductSansBold.ttf") },
      { "product-sans-italic": require("./assets/fonts/ProductSans/ProductSansItalic.ttf") },
      { "product-sans-bold-italic": require("./assets/fonts/ProductSans/ProductSansBoldItalic.ttf") }
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  };

  _handleLoadingError = error => {
    // eslint-disable-next-line no-console
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <>
          {Platform.OS === "ios" && <StatusBar animated={true} barStyle="default" />}
          <AppNavigator />
        </>
      );
    }
  }
}
