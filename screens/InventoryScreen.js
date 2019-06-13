import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from "react-native";
import PropTypes from "prop-types";
import * as firebase from "firebase";

import { Header, Container, Modal } from "../components/common";
import { Modal as ModalContent } from "../components/barcode";

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
      scanned: false,
      loading: false,
      modalShowing: false,
      type: 0,
      barcode: "",
      name: "",
      brand: "",
      description: "",
      regularPrice: 0,
      discountedPrice: 0,
      discountPercentageOff: 0,
      modalLoading: false
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
  }

  closeModal = () => {
    Alert.alert(
      "Weet je zeker dat je wilt afbreken?",
      "De informatie zal niet worden opgeslagen.",
      [
        {
          text: "Blijf",
          style: "default"
        },
        {
          text: "Breek af",
          onPress: () => {
            this.setState({ modalShowing: false });
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  handleItemClick = () => {
    this.setState({ modalShowing: true });
  };

  render() {
    const { navigation } = this.props;
    const { barcodeLoading, products, modalShowing } = this.state;
    const { width, height } = Dimensions.get("window");
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
          {products !== [] ? (
            products.map(product => {
              if (first) {
                first = false;
                return (
                  <InventoryItem
                    key={product.id}
                    product={product}
                    first={true}
                    onPress={() => this.handleItemClick()}
                  />
                );
              } else {
                return (
                  <InventoryItem
                    key={product.id}
                    product={product}
                    first={false}
                    onPress={() => this.handleItemClick()}
                  />
                );
              }
            })
          ) : (
            <>
              <ActivityIndicator color={Colors.blue} style={styles.loader} size="large" />
              <Text style={styles.loaderText}>Laden van producten...</Text>
            </>
          )}
        </Container>
        <Modal isVisible={modalShowing} width={width - 80} height={500} onBackdropPress={() => this.closeModal()}>
          <ModalContent
            onClose={() => this.closeModal()}
            state={this.state}
            onChangeText={(property, value) => this.setState({ [property]: value })}
            onSubmit={() => this.saveProductToFirebase()}
          />
        </Modal>
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
