import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useFonts, Outfit_500Medium, Outfit_400Regular } from '@expo-google-fonts/outfit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, products } from '../constants';
import { useState, useEffect } from 'react';


export default function CartCard({ item, cart, setCart }) {

    const [fontsLoaded] = useFonts({
        Outfit_400Regular, Outfit_500Medium
    });

    useEffect(() => {
        (async () => {
            const prev = await AsyncStorage.getItem('cart');
            if (prev) {
                setCart(JSON.parse(prev))
            }
        })();
    }, [])

    if (fontsLoaded) {
        return (

            <View style={styles.cardcontainer}>
                <Image style={styles.img} source={products[parseInt(item.id)].image} />

                <View style={styles.bottom}>
                    <View style={styles.left}>
                        <Text style={styles.type}>{products[parseInt(item.id)].name}</Text>
                        <Text style={styles.varient}>{products[parseInt(item.id)].type}</Text>
                    </View>
                    <View style={styles.quantityWrap}>
                        <View style={styles.quantity}>
                            <TouchableOpacity onPress={async () => {
                                const prev = await AsyncStorage.getItem('cart');
                                if (prev) {
                                    if (cart && cart?.find(e => e.id === item.id).quantity > 1) {
                                        const prev2 = JSON.parse(prev)
                                        prev2.find(e => e.id === item.id).quantity -= 1;
                                        await AsyncStorage.setItem('cart', JSON.stringify(prev2));
                                        setCart(prev2)
                                    }
                                }
                            }}>
                                <Image source={require("../assets/subtract.png")} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                            <Text style={styles.quantityTxt}>{cart && cart?.find(e => e.id === item.id).quantity}</Text>
                            <TouchableOpacity onPress={async () => {
                                const prev = await AsyncStorage.getItem('cart');
                                if (prev) {
                                    const prev2 = JSON.parse(prev)
                                    prev2.find(e => e.id === item.id).quantity += 1;
                                    await AsyncStorage.setItem('cart', JSON.stringify(prev2));
                                    setCart(prev2)
                                }
                            }}>
                                <Image source={require("../assets/add.png")} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.price}>₹{cart && cart?.find(e => e.id === item.id).quantity * parseInt(products[parseInt(item.id)].price.replace("₹", ""))}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        color: COLORS.white,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 40,
    },
    topBar: {
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40
    },
    white75text: {
        color: COLORS.white75,
        fontFamily: "Outfit_400Regular",
        fontSize: 15,
        fontWeight: "400"
    },
    cardcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: COLORS.gray,
        color: COLORS.bg,
        alignSelf: 'stretch',
        height: 150,
        borderRadius: 17,
        padding: 12,
        gap: 20,
        marginBottom: 30
    },
    img: {
        height: 100,
        width: 90,

    },
    bottom: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    varient: {
        color: COLORS.bg,
        fontFamily: "Outfit_400Regular",
        fontSize: 12,
        fontWeight: "400"
    },
    type: {
        color: COLORS.bg,
        fontFamily: "Outfit_600SemiBold",
        fontSize: 20,
        fontWeight: "600"

    },
    price: {
        color: COLORS.bg,
        fontFamily: "Outfit_600SemiBold",
        fontSize: 15,
        fontWeight: "600"
    },
    quantityWrap: {
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10
    },
    quantity: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    quantityTxt: {
        color: COLORS.bg,
        fontFamily: "Outfit_600SemiBold",
        fontSize: 15,
        fontWeight: "600"
    }
});
