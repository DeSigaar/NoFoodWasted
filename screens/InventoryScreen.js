import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import * as firebase from "firebase";

import { Header, Container } from "../components/common";
import { InventoryItem } from "../components/inventory";
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
        this.setState({ products, loaded: true });
      });
  }

  render() {
    const { navigation } = this.props;
    const { barcodeLoading, products, loaded } = this.state;
    let first = true;

    return (
      <>
        <Header navigation={navigation} title="Aanbod" />
        <Container addStyles={{ padding: 20, paddingBottom: 10, paddingTop: 10 }}>
          <Text style={styles.head}>
            In het onderstaande overzicht staan alle producten die bij uw bedrijf zijn toegevoegd aan het aanbod. U kunt
            via deze pagina het aanbod uitbreiden en aanpassen.
          </Text>
        </Container>
        <Container type="ScrollView" addStyles={styles.container}>
          {loaded ? (
            products.map(product => {
              if (first) {
                first = false;
                return <InventoryItem key={product.id} product={product} first={true} />;
              } else {
                return <InventoryItem key={product.id} product={product} first={false} />;
              }
            })
          ) : (
            <>
              <ActivityIndicator color={Colors.blue} style={styles.loader} size="large" />
              <Text style={styles.loaderText}>Laden van producten...</Text>
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
          style={styles.FAB}
        >
          {barcodeLoading ? <ActivityIndicator color="#FFFFFF" /> : <MaterialIcons style={styles.FABicon} name="add" />}
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
  FAB: {
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
