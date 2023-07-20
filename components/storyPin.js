import React from "react";
import { StyleSheet, Dimensions, View, Text, Pressable, Modal } from "react-native";
import Image from "react-native-scalable-image";
import ProfileImage from "./profileImage";
import Autolink from "react-native-autolink";
import { EvilIcons, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;

export default function StoryPin({ data, liked, onPress }) {
    const navigation = useNavigation();
    const [like, setLike] = React.useState(getLikeAndFlagStatus());

    function getLikeAndFlagStatus() {
        //fire controller 21 of the community
        if (liked) return true
        return false
    }

    function handleLikeEvent() {
        //backend function to like a pin
        //controller 2 and 4 of content
    }

    async function shareData(url) {
        const downloadPath = FileSystem.cacheDirectory + 'fileName.jpg';
        const downloadInstance = FileSystem.createDownloadResumable(
            url,
            downloadPath
        );
        const result = await downloadInstance.downloadAsync();
        try {
            const sharedResponse = await Sharing.shareAsync(result.uri);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <View style={styles.card}>
                <View style={styles.profile}>
                    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
                        <ProfileImage url={data.userPic} size={50} />
                    </Pressable>
                    <View style={styles.connector}></View>
                </View>
                <View style={{ width: "80%" }}>
                    <Image
                        source={{ uri: data.url }}
                        width={(width - 2 * SPACING) * 0.8}
                        borderRadius={12}
                    />
                    <Text style={styles.text}>
                        <Autolink
                            text={data.text}
                            component={Text}
                            email
                            hashtag="instagram"
                            mention="twitter"
                            phone="sms"
                            url
                        />
                    </Text>
                    <View style={styles.icon}>
                        <View style={styles.iconSub}>
                            <Pressable style={({ pressed }) => [styles.iconWrapper, { paddingLeft: 8 }, pressed && { opacity: 0.7 }]}
                                onPress={() => { navigation.navigate("comment", { contentId: "xyz" }) }}>
                                {/* when actual data will be rendered it will have a field called _id. Send that _id here. */}
                                <EvilIcons name="comment" size={28} color="#444" /></Pressable>
                            <View style={styles.iconWrapper}><Text style={styles.textIcon}>{data.comments.length}</Text></View>
                        </View>
                        <View style={styles.iconSub}>
                            <View style={[styles.iconWrapper,]}>
                                <Pressable style={({ pressed }) => [{ position: "absolute", top: 6, left: 12, zIndex: 10 }, pressed && { opacity: 0.5 }]} onPress={() => {
                                    handleLikeEvent();
                                    like ? setLike(false) : setLike(true)
                                }}>
                                    {like ? <AntDesign name="like1" size={20} color="red" /> : <AntDesign name="like2" size={20} color="black" />}
                                </Pressable>
                            </View>
                            <View style={styles.iconWrapper}><Text style={styles.textIcon}>{data.likes.length}</Text></View>
                        </View>
                        <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
                            <AntDesign name="sharealt" size={20} color="#444" onPress={() => { shareData(data.url) }} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    connector: {
        height: 100,
        borderWidth: 1.5,
        borderColor: "#0f0f104b"
    },
    iconWrapper: {
        // borderWidth: 0.5,
        // borderColor: "red",
        width: "50%",
        height: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    textIcon: {
        // borderWidth: 0.5,
        fontWeight: "bold",
        color: "#444",
    },
    iconSub: {
        // borderWidth: 0.5,
        width: 65,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        // borderWidth: 0.5,
        marginRight: SPACING,
        height: 34,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
        // paddingRight: 18
    },
    profile: {
        // borderWidth: 0.5,
        width: "20%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    text: {
        fontWeight: "bold",
        color: "#000000",
        marginTop: 12,
        textAlign: "left",
        paddingRight: 18,
        lineHeight: 18
    },
    card: {
        // borderWidth: 0.5,
        width: width,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 12
    }
});