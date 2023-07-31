import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useFonts, Outfit_500Medium, Outfit_400Regular } from '@expo-google-fonts/outfit';

import { COLORS, products } from '../constants';
import Card from '../components/Card';
import { Link } from 'expo-router';

export default function home() {

    const [fontsLoaded] = useFonts({
        Outfit_400Regular, Outfit_500Medium
    });

    if (fontsLoaded) {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.topBar}>
                    <View style={{ display: "flex", gap: 15, flexDirection: "row", alignItems: "center" }}>
                        <Link href="/login"><Image source={require("../assets/account_avatar.png")} style={{ width: 30, height: 30 }} /></Link>
                        <Text style={styles.white75text}>Hi, Atharv</Text>
                    </View>
                    <Link href="/cart" style={{ width: 30, height: 40 }}>
                        <Image source={require("../assets/shopping_bag.png")} style={{ width: 25, height: 25 }} />
                    </Link>
                </View>

                <View style={styles.heading}>
                    <Text style={styles.headingText}>
                        We have prepared
                    </Text>
                    <Text style={styles.headingText}>
                        <Text style={{ color: COLORS.paleGreen }}>Nutritious products</Text> for you!
                    </Text>
                </View>

                <View style={styles.grid}>

                    {
                        products.map((item, index) => {
                            return (
                                <Card item={item} ind={index} key={index} />
                            )
                        })
                    }
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
    heading: {
        marginBottom: 50
    },
    white75text: {
        color: COLORS.white75,
        fontFamily: "Outfit_400Regular",
        fontSize: 15,
        fontWeight: "400"
    },
    headingText: {
        color: COLORS.white75,
        fontFamily: "Outfit_500Medium",
        fontSize: 15,
        fontWeight: "500",
        fontSize: 25
    },
    grid: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
        flexWrap: "wrap",
        marginBottom: 70
    }
});
