import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';


import { useFonts, Outfit_500Medium } from '@expo-google-fonts/outfit';

export default function LoginScreen() {

    const [fontsLoaded] = useFonts({
        Outfit_500Medium
    });


    if (fontsLoaded) {
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../assets/mobile_bg_illustration.png")} resizeMode='cover' style={styles.bgImg}>
                    <View style={styles.innerView}>
                        <View style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
                            <Image style={styles.logo} source={require("../assets/nurtiboom_logo.png")} />
                        </View>

                        <View style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}>
                            <TouchableOpacity style={styles.button}>
                                <Link href="/home" style={styles.buttonTxt}>Sign up with Google</Link>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        color: COLORS.white
    },
    bgImg: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "between",
        alignItems: "center"
    },
    innerView: {
        flex: 1,
        display: "flex",
        justifyContent: "between",
        alignItems: "center",
        paddingTop: 100,
        paddingBottom: 100
    },
    logo: {
        width: Dimensions.get("window").width * 3 / 4,
        resizeMode: "contain",
    },
    button: {
        display: "flex",
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        width: Dimensions.get("window").width * 3 / 4,
        borderRadius: 50,
        backgroundColor: COLORS.paleGreen
    },
    buttonTxt: {
        color: COLORS.bg,
        textAlign: "center",
        fontFamily: "Outfit_500Medium",
        fontSize: 17,
        fontWeight: "500"
    }
});
