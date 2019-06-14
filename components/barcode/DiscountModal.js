import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import TextInputWithHeader from "./TextInputWithHeader";
import ProductSans from "../../constants/fonts/ProductSans";
import Colors from "../../constants/Colors";
import SearchSuggestions from "../common/SearchSuggestions";

export default class DiscountModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  calculateDiscount = discountPercentageOff => {
    const { onChangeText } = this.props;
    let { discountedPrice, regularPrice } = this.props.state;
    discountedPrice = Number(discountedPrice);
    discountPercentageOff = Number(discountPercentageOff);
    regularPrice = Number(regularPrice);

    if (regularPrice > 0) {
      discountedPrice = (regularPrice / 100) * (100 - discountPercentageOff);
      onChangeText("discountedPrice", discountedPrice.toFixed(2));
    }
  };

  onNumberPress = type => {
    const { onChangeText } = this.props;
    let { discountPercentageOff } = this.props.state;
    discountPercentageOff = Number(discountPercentageOff);

    switch (type) {
      case "add":
        if (discountPercentageOff !== 100) discountPercentageOff += 5;
        break;
      case "remove":
        if (discountPercentageOff !== 0) discountPercentageOff -= 5;
        break;
    }

    onChangeText("discountPercentageOff", discountPercentageOff.toFixed(0));
    this.calculateDiscount(discountPercentageOff.toFixed(0));
  };

  onAmountPress = type => {
    const { onChangeText } = this.props;
    let { amount } = this.props.state;
    amount = Number(amount);

    switch (type) {
      case "add":
        if (amount !== 999) amount += 1;
        break;
      case "remove":
        if (amount !== 0) amount -= 1;
        break;
    }

    onChangeText("amount", amount.toFixed(0));
  };

  render() {
    const { onClose, state, onChangeText, onSubmit } = this.props;
    const {
      name,
      brand,
      description,
      regularPrice,
      discountedPrice,
      discountPercentageOff,
      modalLoading,
      amount
    } = state;

    return (
      <>
        <TouchableOpacity activeOpacity={0.2} onPress={() => onClose()} style={styles.close}>
          <MaterialIcons name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Product afprijzen</Text>
        <Text style={styles.h1}>
          {brand} {name}
        </Text>
        <Text style={styles.p}>{description}</Text>
        <View style={styles.divider} />
        <TextInputWithHeader
          header="Normale prijs"
          property="regularPrice"
          onChangeText={(property, value) => {
            onChangeText(property, value);
            this.calculateDiscount(discountPercentageOff);
          }}
          value={regularPrice.toString()}
          keyboardType="numeric"
          maxLength={6}
        />
        <View style={styles.box}>
          <View style={styles.left2}>
            <Text style={styles.inputHeader}>Korting</Text>
            <View style={styles.number}>
              <TouchableOpacity
                activeOpacity={0.2}
                style={styles.numberButton}
                onPress={() => this.onNumberPress("remove")}
              >
                <MaterialIcons name="remove" style={styles.numberIcon} />
              </TouchableOpacity>
              <TextInput
                value={`${discountPercentageOff.toString()}%`}
                editable={false}
                style={[styles.textInput, styles.numberInput]}
              />
              <TouchableOpacity
                activeOpacity={0.2}
                style={styles.numberButton}
                onPress={() => this.onNumberPress("add")}
              >
                <MaterialIcons name="add" style={styles.numberIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.right2}>
            <Text style={styles.inputHeader}>Afgeprijsde prijs</Text>
            <TextInput style={styles.textInput} value={discountedPrice.toString()} editable={false} />
          </View>
        </View>
        <View style={styles.divider} />

        <View style={styles.left2}>
          <Text style={styles.inputHeader}>Aantal</Text>
          <View style={styles.number}>
            <TouchableOpacity
              activeOpacity={0.2}
              style={styles.numberButton}
              onPress={() => this.onAmountPress("remove")}
            >
              <MaterialIcons name="remove" style={styles.numberIcon} />
            </TouchableOpacity>
            <TextInput
              maxLength={3}
              keyboardType="numeric"
              value={amount.toString()}
              style={[styles.textInput, styles.numberInput, styles.activeNumberInput]}
              onChangeText={e => onChangeText("amount", e)}
            />
            <TouchableOpacity activeOpacity={0.2} style={styles.numberButton} onPress={() => this.onAmountPress("add")}>
              <MaterialIcons name="add" style={styles.numberIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            onChangeText("modalLoading", true);
            onSubmit();
          }}
          style={styles.submitButton}
        >
          {modalLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitText}>Prijs product af</Text>
          )}
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  close: {
    position: "absolute",
    top: 8,
    right: 8
  },
  closeIcon: {
    padding: 12,
    fontSize: 24
  },
  header: {
    fontFamily: ProductSans.bold,
    fontSize: 24,
    marginTop: -6,
    marginBottom: 16
  },
  h1: {
    fontFamily: ProductSans.bold
  },
  p: {
    fontFamily: ProductSans.regular
  },
  inputHeader: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: ProductSans.bold,
    marginBottom: 2
  },
  textInput: {
    height: 30,
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 4,
    fontFamily: ProductSans.regular
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  left: {
    width: 50
  },
  right: {
    marginLeft: 14,
    flex: 1
  },
  left2: {
    width: 100
  },
  right2: {
    marginLeft: 14,
    flex: 1
  },
  number: {
    flexDirection: "row"
  },
  numberButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },
  numberIcon: {
    color: Colors.black,
    fontSize: 20
  },
  numberInput: {
    height: 32,
    width: 48,
    textAlign: "center"
  },
  activeNumberInput: {
    borderColor: Colors.black
  },
  divider: {
    height: 1,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "black"
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: Colors.blue,
    borderRadius: 13,
    height: 35,
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  submitText: {
    fontFamily: ProductSans.regular,
    fontSize: 16,
    color: Colors.white
  }
});
