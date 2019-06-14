import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";

class SearchSuggestions extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    const { data } = this.state;
    return <View />;
  }

  handleClick = data => {
    console.log(data);
  };
}
export default SearchSuggestions;
