/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
  ToastAndroid,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import * as firebase from "firebase";

import { Header, Container, Modal } from "../components/common";
import { Item, Modal as ModalContent } from "../components/inventory";
import { MaterialIcons } from "@expo/vector-icons";

import ProductSans from "../constants/fonts/ProductSans";
import Colors from "../constants/Colors";

export default class InventoryScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      barcodeLoading: false,
      products: [],
      loaded: false,
      modalShowing: false,
      modalLoading: false,
      deleteLoading: false
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

  handleInventoryPress = product => {
    this.setState({ modalShowing: true, ...product });
  };

  closeModal = () => {
    Alert.alert(
      "Weet je zeker dat je wilt afbreken?",
      "Alle informatie zal verloren gaan.",
      [
        {
          text: "Blijf",
          style: "default"
        },
        {
          text: "Breek af",
          onPress: () => {
            this.setState({ loading: false, modalShowing: false, modalLoading: false });
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  onSubmit = () => {
    const {
      id,
      type,
      barcode,
      name,
      brand,
      description,
      regular_price,
      discounted_price,
      discount_percentage_off
    } = this.state;
    firebase
      .firestore()
      .collection("products")
      .doc(id)
      .update({
        type,
        barcode,
        name,
        brand,
        description,
        regular_price: Number(regular_price),
        discounted_price: Number(discounted_price),
        discount_percentage_off: Number(discount_percentage_off)
      })
      .then(() => {
        if (Platform.OS === "android") {
          ToastAndroid.show(`${name} aangepast!`, ToastAndroid.LONG);
        } else {
          Alert.alert(`${name} aangepast!`);
        }
        this.setState({ modalLoading: false, modalShowing: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleDelete = product => {
    this.setState({ deleteLoading: true });
    const { id, brand, name } = product;

    Alert.alert(
      `${brand} ${name}`,
      "Weet je zeker dat je deze wilt verwijderen?",
      [
        {
          text: "Annuleren",
          onPress: () => {
            this.setState({ deleteLoading: false });
          },
          style: "cancel"
        },
        {
          text: "Verwijderen",
          onPress: () => {
            // Show user a preview of the product before adding
            firebase
              .firestore()
              .collection("products")
              .doc(id)
              .delete()
              .then(() => {
                if (Platform.OS === "android") {
                  ToastAndroid.show(`${name} verwijderd!`, ToastAndroid.LONG);
                } else {
                  Alert.alert(`${name} verwijderd!`);
                }
                this.setState({ modalLoading: false, modalShowing: false, deleteLoading: false });
              })
              .catch(error => {
                console.log(error);
              });
          },
          style: "default"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { navigation } = this.props;
    const { barcodeLoading, products, loaded, modalShowing } = this.state;
    const { width } = Dimensions.get("window");
    let height = 500;
    let first = true;

    if (this.state.brand && this.state.name) {
      if (this.state.name.length + this.state.brand.length >= 15) {
        height = 525;
      }
      if (this.state.name.length + this.state.brand.length >= 30) {
        height = 550;
      }
    }

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
                return (
                  <Item
                    key={product.id}
                    product={product}
                    first={true}
                    onPress={() => this.handleInventoryPress(product)}
                  />
                );
              } else {
                return (
                  <Item
                    key={product.id}
                    product={product}
                    first={false}
                    onPress={() => this.handleInventoryPress(product)}
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
        <Modal isVisible={modalShowing} width={width - 80} height={height} onBackdropPress={() => this.closeModal()}>
          <ModalContent
            onClose={() => this.closeModal()}
            state={this.state}
            onChangeText={(property, value) => this.setState({ [property]: value })}
            onDelete={product => this.handleDelete(product)}
            onSubmit={() => this.onSubmit()}
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
