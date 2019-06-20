import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TextInput, Text } from "react-native";
import Colors from "../../constants/Colors";
import ProductSans from "../../constants/fonts/ProductSans";

export default class TextInputWithHeader extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired,
    property: PropTypes.string.isRequired,
    clearButtonMode: PropTypes.string,
    enablesReturnKeyAutomatically: PropTypes.bool,
    keyboardType: PropTypes.string,
    editable: PropTypes.bool,
    returnKeyType: PropTypes.string,
    maxLength: PropTypes.number
  };

  static defaultProps = {
    clearButtonMode: "while-editing",
    enablesReturnKeyAutomatically: true,
    keyboardType: "default",
    editable: true,
    returnKeyType: "next",
    maxLength: 100
  };

  render() {
    const {
      header,
      onChangeText,
      value,
      property,
      clearButtonMode,
      enablesReturnKeyAutomatically,
      keyboardType,
      editable,
      returnKeyType,
      maxLength
    } = this.props;

    return (
      <>
        <Text style={styles.inputHeader}>{header}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onChangeText(property, text)}
          value={value}
          clearButtonMode={clearButtonMode}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          keyboardType={keyboardType}
          editable={editable}
          returnKeyType={returnKeyType}
          maxLength={maxLength}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputHeader: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: ProductSans.bold,
    marginBottom: 2
  },
  textInput: {
    height: 30,
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 4,
    fontFamily: ProductSans.regular
  }
});
