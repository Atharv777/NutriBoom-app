import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Outfit_500Medium, Outfit_400Regular } from '@expo-google-fonts/outfit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, products } from '../constants';
import CartCard from '../components/CartCard';

import { useState, useEffect } from 'react';
import { Link } from 'expo-router';

export default function cart() {

    const [cartt, setCart] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let sum = 0
        cartt?.forEach((item) => sum += parseInt(item.quantity) * parseInt(products[parseInt(item.id)].price.replace("₹", "")))
        setTotalPrice(sum)
    }, [cartt])


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
            <ScrollView style={styles.container}>
                <View style={styles.topBar}>
                    <View style={{ display: "flex", gap: 15, flexDirection: "row", alignItems: "center" }}>
                        <Image source={require("../assets/account_avatar.png")} style={{ width: 30, height: 30 }} />
                        <Text style={styles.white75text}>Hi, Atharv</Text>
                    </View>
                    <Link href="/cart" style={{ width: 30, height: 40 }}>
                        <Image source={require("../assets/shopping_bag.png")} style={{ width: 25, height: 25 }} />
                    </Link>
                </View>


                {
                    cartt && cartt.length
                        ? cartt.map((item, ind) => {
                            return (
                                <CartCard item={item} key={ind} cart={cartt} setCart={setCart} />
                            )
                        })
                        : <Text style={{ ...styles.totalPricePrice, textAlign: "center" }}>No items added!</Text>
                }

                <View style={styles.goToBottom} >


                    <View style={styles.totalPriceWrap}>
                        <Text style={styles.totalPrice}>Total:</Text>
                        <Text style={styles.totalPricePrice}>₹{totalPrice}</Text>
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonTxt}>Make payment →</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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
        gap: 20
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
    },
    button: {
        display: "flex",
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginTop: 20
    },
    buttonTxt: {
        color: COLORS.white90,
        textAlign: "center",
        fontFamily: "Outfit_500Medium",
        fontSize: 17,
        fontWeight: "500"
    },
    totalPriceWrap: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 7
    },
    totalPrice: {
        color: COLORS.white50,
        fontFamily: "Outfit_500Medium",
        fontSize: 14,
        fontWeight: "500"
    },
    totalPricePrice: {
        color: COLORS.white90,
        fontFamily: "Outfit_600SemiBold",
        fontSize: 18,
        fontWeight: "600"
    },
    goToBottom: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 60
    }
});
