import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import TextInputWithHeader from "./TextInputWithHeader";
import ProductSans from "../../constants/fonts/ProductSans";
import Colors from "../../constants/Colors";

import { InputAutoSuggest } from "react-native-autocomplete-search";

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
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

  componentDidMount() {
    firebase
      .firestore()
      .collection("products")
      .onSnapshot(querySnapshot => {
        let products = [];
        querySnapshot.forEach(doc => {
          products.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ products });
      });

    firebase
      .firestore()
      .collection("discounts")
      .onSnapshot(querySnapshot => {
        let discounts = [];
        querySnapshot.forEach(doc => {
          discounts.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ discounts, loaded: true });
      });
  }

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

  handleClick = data => {
    if (data != null) {
      console.log(data.name);
    }
  };

  render() {
    const { onClose, state, onChangeText, onSubmit } = this.props;
    const {
      type,
      barcode,
      name,
      brand,
      description,
      regularPrice,
      discountedPrice,
      discountPercentageOff,
      modalLoading,
      discounts,
      products
    } = state;

    <InputAutoSuggest
      style={{ flex: 1 }}
      staticData={data}
      itemFormat={{ id: "details.id", name: "details.name" }}
      onDataSelectedChange={data => this.handleClick(data)}
    />;

    return (
      <>
        <TouchableOpacity activeOpacity={0.2} onPress={() => onClose()} style={styles.close}>
          <MaterialIcons name="close" style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Toevoegen van product</Text>
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
            <Text style={styles.submitText}>Add product to database</Text>
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
    width: 220,
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
