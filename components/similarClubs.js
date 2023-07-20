import { StyleSheet, View, Text, FlatList, Image, Pressable, Dimensions } from "react-native";
import { suggestionsForClub, colorsCommunity, colors } from "../constants/data";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

export default function SimilarClub() {
    const navigation = useNavigation();
    return (
        <View style={{ marginTop: 18, marginBottom: 18 }}>
            <Text style={styles.title}>Clubs for you...</Text>
            <FlatList
                data={suggestionsForClub}
                keyExtractor={(_, index) => index}
                contentContainerStyle={{ padding: 12 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.card}>
                            <Image source={{ uri: item.secondaryImg }} style={{ width: 60, height: 60, borderRadius: 30, resizeMode: "cover", marginTop: 12 }} />
                            <Text style={styles.label}>{item.name}</Text>
                            <Text style={styles.subText}>{item.tag[0]}</Text>
                            <Text style={[styles.subText, { color: "#444" }]}>{item.motto}</Text>
                            <Pressable style={({ pressed }) => [styles.join, pressed && { opacity: 0.5 }]} onPress={() => { navigation.navigate("club", { name: item.name, secondaryImg: item.secondaryImg }) }}>
                                <Text style={styles.joinText}>Visit</Text>
                            </Pressable>
                        </View>
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    joinText: {
        fontWeight: "bold",
        color: "white"
    },
    join: {
        // borderWidth: 0.5,
        width: 60,
        height: 24,
        borderRadius: 12,
        marginTop: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorsCommunity.buttonBG
    },
    subText: {
        fontWeight: "bold",
        marginTop: 4
    },
    label: {
        marginTop: 6,
        fontWeight: "bold",
        fontSize: 16
    },
    card: {
        width: width * 0.6,
        height: height * 0.2,
        borderWidth: 0.5,
        borderColor: "#bab8b8",
        borderRadius: 12,
        marginHorizontal: 12,
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        paddingLeft: 12,
        fontSize: 22,
        color: colorsCommunity.label
    }
});