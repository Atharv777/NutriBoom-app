

import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

import { Link } from 'expo-router';
import { useFonts, Outfit_500Medium, Outfit_400Regular, Outfit_300Light, Outfit_600SemiBold } from '@expo-google-fonts/outfit';


export default function Card({ item, ind }) {

    const [fontsLoaded] = useFonts({
        Outfit_400Regular, Outfit_500Medium, Outfit_300Light, Outfit_600SemiBold
    });

    if (fontsLoaded) {
        return (
            <Link href={`/product/${ind}`}>
                <View style={styles.container}>
                    <Image style={styles.img} source={item.image} />

                    <View style={styles.bottom}>
                        <View style={styles.left}>
                            <Text style={styles.type}>{item.name}</Text>
                            <Text style={styles.varient}>{item.type}</Text>
                        </View>
                        <Text style={styles.price}>{item.price}</Text>
                    </View>
                </View>
            </Link>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLORS.gray,
        color: COLORS.bg,
        width: (Dimensions.get("window").width - 80) / 2,
        height: 170,
        borderRadius: 17,
        padding: 12,
        gap: 20
    },
    img: {
        height: 100,
        width: "auto"
    },
    bottom: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    varient: {
        color: COLORS.bg,
        fontFamily: "Outfit_300Light",
        fontSize: 8,
        fontWeight: "300"
    },
    price: {
        color: COLORS.bg,
        fontFamily: "Outfit_600SemiBold",
        fontSize: 12,
        fontWeight: "600"
    }
});
