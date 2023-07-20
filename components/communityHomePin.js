import React from "react";
import { StyleSheet, Dimensions, View, Text, Pressable, Modal } from "react-native";
import Image from "react-native-scalable-image";
import ProfileImage from "./profileImage";
import Autolink from "react-native-autolink";
import { colorsCommunity } from "../constants/data";
import { EvilIcons, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import FlagModal from "./flagModal";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;
export default function CommunityHomePin({ data, liked }) {
    const navigation = useNavigation();
    const [flagModal, setFlagModal] = React.useState(false);
    const [flagged, setFlagged] = React.useState(getLikeAndFlagStatus())
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

    function handleFlaggingEvent() {
        if (!flagged) {
            //fire controller 7 of the community
            setFlagModal(true);
        }
        else {
            return
        }
    }


    return (
        <>
            <Modal visible={flagModal} animationType="slide" transparent={true}>
                <FlagModal setFlagModal={setFlagModal} setFlagged={setFlagged} />
            </Modal>
            <View style={{ flexDirection: "row", marginLeft: 18 }}>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { navigation.navigate("community", { name: data.communityName, secondary: data.communityProfile }) }}>
                    <ProfileImage url={data.communityCover} size={50} />
                </Pressable>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { navigation.navigate("community", { name: data.communityName, secondary: data.communityProfile }) }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: "bold", marginLeft: 12, fontSize: 20 }}>{data.communityTitle}</Text>
                        <MaterialIcons name="verified" size={16} color="#1ea1ed" />
                    </View>
                    <Text style={{ fontWeight: "bold", color: "#444", marginLeft: 12 }}>Posted {data.time} ago</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.profile]}>
                    <ProfileImage url={data.userPic} size={50} />
                </Pressable>
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
                                <EvilIcons name="comment" size={28} color={colorsCommunity.label} /></Pressable>
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
                            <AntDesign name="sharealt" size={20} color={colorsCommunity.label} onPress={() => { shareData(data.url) }} />
                        </Pressable>
                        <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { handleFlaggingEvent() }}>
                            {!flagged ? <FontAwesome name="flag-o" size={22} color="#444" /> : <FontAwesome name="flag" size={22} color="#444" />}
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
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
        color: colorsCommunity.label,
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
        color: colorsCommunity.title,
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