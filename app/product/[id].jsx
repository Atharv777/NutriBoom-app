import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useFonts, Outfit_500Medium, Outfit_400Regular } from '@expo-google-fonts/outfit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS, products } from '../../constants';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';


export default function home() {

    const { id } = useLocalSearchParams();
    const [cart, setCart] = useState(null)

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
                        <Link href="/" style={{ width: 30, height: 30 }}>
                            <Image source={require("../../assets/account_avatar.png")} style={{ width: 30, height: 30 }} />
                        </Link>
                        <Text style={styles.white75text}>Hi, Atharv</Text>
                    </View>
                    <Link href="/cart" style={{ width: 30, height: 40 }}>
                        <Image source={require("../../assets/shopping_bag.png")} style={{ width: 25, height: 25 }} />
                    </Link>
                </View>

                <Image source={products[parseInt(id)].image} style={{ width: 300, height: 280, marginBottom: 30 }} />

                <View style={styles.middle}>
                    <View style={styles.left}>
                        <Text style={styles.type}>{products[parseInt(id)].name}</Text>
                        <Text style={styles.varient}>{products[parseInt(id)].type}</Text>
                    </View>
                    <Text style={styles.price}>{products[parseInt(id)].price}</Text>
                </View>

                <Text style={styles.white50text}>
                    {products[parseInt(id)].desc}
                </Text>

                {
                    cart && cart?.some(e => e.id === parseInt(id))
                        ? <View style={styles.button}>
                            <Link href="/cart" style={styles.buttonTxt}>View Cart →</Link>
                        </View>

                        : <TouchableOpacity style={styles.button} onPress={async () => {
                            // setCart([...Cart, { id: parseInt(id), quantity: 1 }])
                            const prev = await AsyncStorage.getItem('cart');
                            if (prev) {
                                const jsonValue = JSON.stringify([...JSON.parse(prev), { id: parseInt(id), quantity: 1 }]);
                                await AsyncStorage.setItem('cart', jsonValue);
                                setCart(JSON.parse(jsonValue))
                            }
                            else {
                                const jsonValue = JSON.stringify([{ id: parseInt(id), quantity: 1 }]);
                                await AsyncStorage.setItem('cart', jsonValue);
                                setCart(JSON.parse(jsonValue))
                            }
                        }}>
                            <Text style={styles.buttonTxt}>Add to cart</Text>
                        </TouchableOpacity>
                }

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

    white50text: {
        color: COLORS.white50,
        fontFamily: "Outfit_400Regular",
        fontSize: 15,
        fontWeight: "400",
        marginTop: 50
    },
    image: {
        width: Dimensions.get("window").width - 100,
        height: "auto"
    },
    white75text: {
        color: COLORS.white75,
        fontFamily: "Outfit_400Regular",
        fontSize: 15,
        fontWeight: "400"
    },
    type: {
        color: COLORS.white,
        fontFamily: "Outfit_500Medium",
        fontSize: 30,
        fontWeight: "500"
    },
    varient: {
        color: COLORS.white50,
        fontFamily: "Outfit_300Light",
        fontSize: 15,
        fontWeight: "300"
    },
    price: {
        color: COLORS.white90,
        fontFamily: "Outfit_600SemiBold",
        fontSize: 23,
        fontWeight: "600"
    },
    middle: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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
        marginTop: 50
    },
    buttonTxt: {
        color: COLORS.white90,
        textAlign: "center",
        fontFamily: "Outfit_500Medium",
        fontSize: 17,
        fontWeight: "500"
    }
});
