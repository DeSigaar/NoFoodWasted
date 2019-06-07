import React, { Component } from "react";
import { View, StyleSheet, Platform, StatusBar, Dimensions, Alert } from "react-native";
import { BarCodeScanner } from "expo";
import PropTypes from "prop-types";
import axios from "axios";
import * as firebase from "firebase";
import "firebase/firestore";

import { Header, Modal } from "../components/common";
import { Overlay, Modal as ModalContent } from "../components/barcode";

export default class BarcodeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    /* eslint-disable no-console */
    /* eslint-disable camelcase */

    this.state = {
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

  componentWillUnmount() {
    this.setState({ modalShowing: false });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, loading: true, modalShowing: false, modalLoading: false, type, barcode: data });

    firebase
      .firestore()
      .collection("products")
      .where("barcode", "==", data)
      .where("type", "==", type)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          // Found no product in our database
          // Ask to check external
          Alert.alert(
            "Geen product gevonden",
            "Wil je dat we extern zoeken naar het product?",
            [
              {
                text: "Annuleren",
                onPress: () => {
                  this.setState({ loading: false });
                },
                style: "cancel"
              },
              {
                text: "Zoeken",
                onPress: () => {
                  axios
                    .get("https://api.upcitemdb.com/prod/trial/lookup", {
                      params: {
                        upc: data
                      }
                    })
                    .then(res => {
                      const { items } = res.data;
                      if (items.length !== 0) {
                        // Found a product in the external database call
                        // Ask user to add this product to our database
                        Alert.alert(
                          `${items[0].title} gevonden`,
                          "Wil je dit product toevoegen aan je aanbod?",
                          [
                            {
                              text: "Annuleren",
                              onPress: () => {
                                this.setState({ loading: false });
                              },
                              style: "cancel"
                            },
                            {
                              text: "Voeg toe",
                              onPress: () => {
                                // Show user a preview of the product before adding
                                this.setState({
                                  modalShowing: true,
                                  name: items[0].title,
                                  brand: items[0].brand,
                                  description: items[0].description
                                });
                              },
                              style: "default"
                            }
                          ],
                          { cancelable: false }
                        );
                      } else {
                        // No product found in external database
                        // Ask user to add new product to our database
                        Alert.alert(
                          "Geen product gevonden",
                          "Wil je dit product handmatig toevoegen aan je aanbod?",
                          [
                            {
                              text: "Annuleren",
                              onPress: () => {
                                this.setState({ loading: false });
                              },
                              style: "cancel"
                            },
                            {
                              text: "Handmatig toevoegen",
                              onPress: () => {
                                // Show user a screen with all data in it
                                this.setState({ modalShowing: true });
                              },
                              style: "default"
                            }
                          ],
                          { cancelable: false }
                        );
                      }
                      this.setState({ loading: false });
                    })
                    .catch(error => {
                      console.error(error);
                      this.setState({ loading: false });
                    });
                },
                style: "default"
              }
            ],
            { cancelable: false }
          );
        } else {
          querySnapshot.forEach(doc => {
            Alert.alert(
              `${doc.get("brand")} ${doc.get("name")}`,
              `Wil je dit product afprijzen met de prijs van €${doc.get("discounted_price").toFixed(2)}?`,
              [
                {
                  text: "Annuleren",
                  onPress: () => {
                    this.setState({ loading: false });
                  },
                  style: "cancel"
                },
                {
                  text: "Product afprijzen",
                  onPress: () => {
                    // TODO: Actually discount this item
                    console.log("Barcode: Added to discounts!");
                  },
                  style: "default"
                }
              ],
              { cancelable: false }
            );
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  saveProductToFirebase = () => {
    const {
      type,
      barcode,
      name,
      brand,
      description,
      regularPrice,
      discountedPrice,
      discountPercentageOff
    } = this.state;

    firebase
      .firestore()
      .collection("products")
      .add({
        barcode,
        brand,
        description,
        discount_percentage_off: Number(discountPercentageOff),
        discounted_price: Number(discountedPrice),
        name,
        regular_price: Number(regularPrice),
        type
      })
      .then(() => {
        Alert.alert(`${name} toegevoegd!`, "Het product in je aanbod zetten ging goed!");
        this.setState({
          loading: false,
          modalShowing: false,
          modalLoading: false,
          type: 0,
          barcode: "",
          name: "",
          brand: "",
          description: "",
          regularPrice: 0,
          discountedPrice: 0,
          discountPercentageOff: 0
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false, modalShowing: false, modalLoading: false });
      });
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
            this.setState({ modalShowing: false });
          },
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const { scanned, loading, modalShowing } = this.state;
    const { navigation } = this.props;
    const { width, height } = Dimensions.get("window");

    return (
      <>
        {Platform.OS === "ios" && <StatusBar animated={true} barStyle="light-content" />}
        <Header navigation={navigation} title="Scan een barcode" color="#FFFFFF" iconName="chevron-left" />
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Overlay
            width={width}
            height={height}
            scanned={scanned}
            loading={loading}
            onPress={() => this.setState({ scanned: false })}
          />
          <Modal isVisible={modalShowing} width={width - 80} height={500} onBackdropPress={() => this.closeModal()}>
            <ModalContent
              onClose={() => this.closeModal()}
              state={this.state}
              onChangeText={(property, value) => this.setState({ [property]: value })}
              onSubmit={() => this.saveProductToFirebase()}
            />
          </Modal>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1
  }
});
