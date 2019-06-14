import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import * as firebase from "firebase";

import { Header, Container } from "../components/common";
import { DiscountItem } from "../components/Discount";
import { MaterialIcons } from "@expo/vector-icons";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

export default class HomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      barcodeLoading: false,
      products: [],
      discounts: [],
      loaded: false
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

  render() {
    const { navigation } = this.props;
    const { barcodeLoading, products, discounts, loaded } = this.state;
    let first = true;

    return (
      <>
        <Header navigation={navigation} title="Afprijzen" />
        <Container addStyles={{ padding: 20, paddingBottom: 10, paddingTop: 10 }}>
          <Text style={styles.head}>
            In het onderstaande overzicht vindt je alle actieve afprijzingen. Je kan zien hoeveel de voorraad nog is en
            hoeveel keer een product bekeken is. Er is te zien wat de oude prijs was en de nieuwe prijs is. Op deze
            pagina kan je een product toevoegen of aanpassen.
          </Text>
        </Container>
        <Container type="ScrollView" addStyles={styles.container}>
          {loaded ? (
            discounts.map(discount => {
              const product = products.filter(product => product.id === discount.product);
              if (first) {
                first = false;
                return <DiscountItem key={discount.id} product={product[0]} discount={discount} first={true} />;
              } else {
                return <DiscountItem key={discount.id} product={product[0]} discount={discount} first={false} />;
              }
            })
          ) : (
            <>
              <ActivityIndicator color={Colors.blue} style={styles.loader} size="large" />
              <Text style={styles.loaderText}>Laden van afgeprijsde producten...</Text>
            </>
          )}
        </Container>
        <TouchableOpacity
          activeOpacity={barcodeLoading ? 1 : 0.5}
          onPress={() => {
            this.setState({ barcodeLoading: true });
            setTimeout(() => {
              navigation.navigate("Barcode");
              this.setState({ barcodeLoading: false });
            }, 100);
          }}
          style={styles.FAB1}
        >
          {barcodeLoading ? <ActivityIndicator color="#FFFFFF" /> : <MaterialIcons style={styles.FABicon} name="add" />}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={barcodeLoading ? 1 : 0.5}
          onPress={() => {
            this.setState({ barcodeLoading: true });
            setTimeout(() => {
              navigation.navigate("Barcode");
              this.setState({ barcodeLoading: false });
            }, 100);
          }}
          style={styles.FAB2}
        >
          {barcodeLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <MaterialIcons style={styles.FABicon} name="search" />
          )}
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    color: Colors.greyTextColor,
    fontFamily: ProductSans.regular,
    fontSize: 14
  },
  container: {
    margin: 0,
    marginTop: 0
  },
  loader: {
    padding: 40,
    paddingBottom: 10
  },
  loaderText: {
    color: Colors.blue,
    textAlign: "center"
  },
  FAB1: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    right: 100,
    bottom: 25,
    elevation: 4
  },
  FAB2: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    right: 25,
    bottom: 25,
    elevation: 4
  },
  FABicon: {
    fontSize: 35,
    color: Colors.white
  }
});
