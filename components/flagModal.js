import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { colorsCommunity } from "../constants/data";

const { width, height } = Dimensions.get("screen");

export default function FlagModal({ setFlagModal, setFlagged }) {
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.message}>Flagging any content means it is not related to the community.
                Take this decision carefully because it is irreversible and may lead to deletion of the content.</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.button]} onPress={() => { setFlagged(true); setFlagModal(false) }}>
                    <Text style={styles.buttonText}>Flag</Text>
                </Pressable>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.button]} onPress={() => { setFlagModal(false) }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    button: {
        // borderWidth: 0.5,
        width: 100,
        height: 30,
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorsCommunity.buttonBG
    },
    buttonContainer: {
        // borderWidth: 0.5,
        width: width,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 12
    },
    message: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 50
    },
    modalContainer: {
        position: "absolute",
        bottom: 0,
        height: 300,
        width: width,
        backgroundColor: "white",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12
    }
});