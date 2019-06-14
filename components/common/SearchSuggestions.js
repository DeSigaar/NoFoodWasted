import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { InputAutoSuggest } from "react-native-autocomplete-search";

class SearchSuggestions extends Component {
  static propTypes = {
    prop: PropTypes
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
      <View>
        <InputAutoSuggest
          style={{ flex: 1 }}
          staticData={data}
          itemFormat={{ id: "details.id", name: "details.name", tags: ["details.category"] }}
          onDataSelectedChange={data => this.handleClick(data)}
        />
      </View>
    );
  }

  handleClick = data => {
    console.log(data);
  };
}
export default SearchSuggestions;
