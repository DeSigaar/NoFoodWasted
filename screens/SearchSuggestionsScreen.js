import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
git;
import { InputAutoSuggest } from "react-native-autocomplete-search";

class SearchSuggestions extends Component {
  static propTypes = {
    prop: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [
        { someAttribute: "val1", details: { id: "1", name: "Ijsbergsla", category: "Groenten" } },
        {
          someAttribute: "val2",
          details: { id: "2", name: "Pannenkoeken", category: "Zuivel" }
        },
        { someAttribute: "val3", details: { id: "3", name: "Paprika", category: "Groenten" } },
        { someAttribute: "val4", details: { id: "4", name: "Pindakaas", category: "Beleg" } },
        {
          someAttribute: "val5",
          details: { id: "5", name: "Kipfilet", category: "Kip" }
        },
        { someAttribute: "val6", details: { id: "6", name: "Rundergehakt", category: "Vlees" } }
      ]
    };
  }

  render() {
    const { data } = this.state;
    return (
      <View style={styles.inputAutoSuggestBox}>
        <InputAutoSuggest
          staticData={data}
          itemFormat={{ id: "details.id", name: "details.name" }}
          onDataSelectedChange={data => this.handleClick(data)}
        />
        <Text>kut appss</Text>
      </View>
    );
  }

  handleClick = data => {
    if (data != null) {
      console.log(data.name);
    }
  };
}
const styles = StyleSheet.create({
  inputAutoSuggestBox: {
    marginTop: 100
  }
});
export default SearchSuggestions;
