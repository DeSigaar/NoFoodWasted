/* eslint-disable camelcase */
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInputWithHeader } from "../barcode";
import ProductSans from "../../constants/fonts/ProductSans";
import Colors from "../../constants/Colors";

export default class InventoryModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  calculateDiscount = discount_percentage_off => {
    const { onChangeText, state } = this.props;
    let { discounted_price, regular_price } = state;
    discounted_price = Number(discounted_price);
    discount_percentage_off = Number(discount_percentage_off);
    regular_price = Number(regular_price);

    if (regular_price > 0) {
      discounted_price = (regular_price / 100) * (100 - discount_percentage_off);
      onChangeText("discounted_price", discounted_price.toFixed(2));
    }
  };

  onNumberPress = type => {
    const { onChangeText, state } = this.props;
    let { discount_percentage_off } = state;
    discount_percentage_off = Number(discount_percentage_off);

    switch (type) {
      case "add":
        if (discount_percentage_off !== 100) discount_percentage_off += 5;
        break;
      case "remove":
        if (discount_percentage_off !== 0) discount_percentage_off -= 5;
        break;
    }

    onChangeText("discount_percentage_off", discount_percentage_off.toFixed(0));
    this.calculateDiscount(discount_percentage_off.toFixed(0));
  };

  render() {
    const { onClose, state, onChangeText, onSubmit } = this.props;
    const {
      modalShowing,
      modalLoading,
      type,
      barcode,
      name,
      brand,
      description,
      regular_price,
      discounted_price,
      discount_percentage_off
    } = state;

    return (
      <>
        <TouchableOpacity activeOpacity={0.2} onPress={() => onClose()} style={styles.close}>
          <MaterialIcons name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>
          {brand} {name}
        </Text>
        <View style={styles.box}>
          <View style={styles.left}>
            <Text style={styles.inputHeader}>Type</Text>
            <TextInput style={styles.textInput} value={type.toString()} editable={false} />
          </View>
          <View style={styles.right}>
            <Text style={styles.inputHeader}>Barcode</Text>
            <TextInput style={styles.textInput} value={barcode.toString()} editable={false} />
          </View>
        </View>
        <View style={styles.divider} />
        <TextInputWithHeader
          header="Merk naam"
          property="brand"
          onChangeText={(property, value) => onChangeText(property, value)}
          value={brand}
        />
        <TextInputWithHeader
          header="Product naam"
          property="name"
          onChangeText={(property, value) => onChangeText(property, value)}
          value={name}
        />
        <TextInputWithHeader
          header="Beschrijving"
          property="description"
          onChangeText={(property, value) => onChangeText(property, value)}
          value={description}
        />
        <View style={styles.divider} />
        <TextInputWithHeader
          header="Normale prijs"
          property="regular_price"
          onChangeText={(property, value) => {
            onChangeText(property, value);
            this.calculateDiscount(discount_percentage_off);
          }}
          value={regular_price.toString()}
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
                value={`${discount_percentage_off.toString()}%`}
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
            <TextInput style={styles.textInput} value={discounted_price.toString()} editable={false} />
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
            <Text style={styles.submitText}>Product aanpassen</Text>
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
    marginTop: 16,
    backgroundColor: Colors.blue,
    borderRadius: 13,
    height: 35,
    paddingLeft: 20,
    paddingRight: 20,
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
