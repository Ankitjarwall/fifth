import React from "react";
import { StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import { colorsCommunity } from "../constants/data";
import { useNavigation } from "@react-navigation/native";

export default function SimilarCommunity({ similarCommunity }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Communities for you...</Text>
            <FlatList
                data={similarCommunity}
                keyExtractor={(_, index) => index}
                contentContainerStyle={{ padding: 12 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { navigation.navigate("community", { name: item.title, secondary: item.secondaryCover }) }}>
                            <View style={styles.card}>
                                <Image source={{ uri: item.secondaryCover }} style={{ height: 80, width: 80, borderRadius: 40, resizeMode: "cover" }} />
                                <Text style={styles.subtitle}>{item.name}</Text>
                                <Text style={[styles.subtitle, { color: "#444", fontSize: 12 }]}>Active members</Text>
                                <Text style={[styles.subtitle, { color: "#444", fontSize: 12 }]}>{item.activeMembers}</Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    subtitle: {
        fontWeight: "bold",
        marginTop: 8,
    },
    card: {
        height: 200,
        width: 125,
        borderRadius: 22,
        borderWidth: 0.5,
        borderColor: "#bab8b8",
        marginHorizontal: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontWeight: "bold",
        paddingLeft: 12,
        fontSize: 22,
        color: colorsCommunity.label
    },
    container: {
        // borderWidth: 0.5,
        marginTop: 18
    }
});