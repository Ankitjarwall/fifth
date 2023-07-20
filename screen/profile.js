import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome5, FontAwesome, AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import EditProfile from "../components/editProfile";
import ContentPin from "../components/contentPin";
import CommunityHomePin from "../components/communityHomePin";
import ClubHomePin from "../components/clubHomePin";
import { likedData } from "../constants/data";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;

//for backend fire controller getUserBio of user schema
//also fire controller 43 of club to get all liked pins

export default function Profile({ navigation, route }) {
    const { userBio } = route.params;
    const [active, setActive] = React.useState("general");

    function getCorrectContent() {
        if (active === "general") {
            return (
                <ScrollView>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, { marginRight: SPACING }]}>
                            <Ionicons name="chatbubbles" size={24} color="#444" />
                        </Pressable>
                        <Menu style={{ marginRight: SPACING }}>
                            <MenuTrigger><Entypo name="dots-three-vertical" size={20} color="black" /></MenuTrigger>
                            <MenuOptions customStyles={optionsStyles}>
                                <MenuOption onSelect={() => { setActive("editing") }}>
                                    <View style={[styles.statBox, { marginTop: 3 }]}>
                                        <Feather name="edit" size={18} color="#1c1c1dff" style={{ marginRight: 6, marginTop: 0 }} />
                                        <Text style={styles.optionText}>Edit</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption>
                                    <View style={[styles.statBox, { marginTop: 3 }]}>
                                        <AntDesign name="logout" size={18} color="#1c1c1dff" style={{ marginRight: 6, marginTop: 0 }} />
                                        <Text style={styles.optionText}>Log out</Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </View>
                    <View style={styles.imageBox}>
                        <Image source={{ uri: userBio.image }} style={styles.image} />
                        <Text style={styles.name}>{userBio.name}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <FontAwesome5 name="code" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 2 }} />
                        <Text style={styles.subText}>{userBio.course}</Text>
                    </View>
                    <View style={[styles.statBox, { marginTop: 3 }]}>
                        <FontAwesome name="hashtag" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                        <Text style={styles.subText}> {userBio.interests[0]}, {userBio.interests[1]}, {userBio.interests[2]}</Text>
                    </View>
                    <View style={[styles.statBox, { marginTop: 3 }]}>
                        <Entypo name="sports-club" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                        <Text style={styles.subText}> Member of {userBio.clubs} clubs</Text>
                    </View>
                    <View style={[styles.statBox, { marginTop: 3 }]}>
                        <Entypo name="edit" size={13} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                        <Text style={styles.subText}>Created {userBio.communitiesCreated} communities</Text>
                    </View>
                    <View style={[styles.statBox, { marginTop: 3 }]}>
                        <Entypo name="network" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                        <Text style={styles.subText}> Part of {userBio.communitiesPartOf} community</Text>
                    </View>
                    <View style={[styles.statBox, { marginTop: 3 }]}>
                        <AntDesign name="gift" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                        <Text style={styles.subText}> Send {userBio.giftsSend} gifts</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.titleBox}><Text style={styles.title}>Liked Pins</Text></View>
                    {likedData.map((item, index) => {
                        if (item.sendBy === "Macbease") {
                            return <ContentPin data={item} key={index} />
                        }
                        else if (item.sendBy === "userCommunity") {
                            return <CommunityHomePin data={item} liked={true} key={index} />
                        }
                        else if (item.sendBy === "club") {
                            return <ClubHomePin data={item} liked={true} key={index} />
                        }
                    })}
                </ScrollView>
            )
        }
        else if (active === "editing") {
            return (
                <EditProfile data={userBio} setActive={setActive} />
            )
        }
    }

    return (
        <SafeAreaView>
            {getCorrectContent()}
        </SafeAreaView>
    )
}

const optionsStyles = {
    optionsContainer: {
        padding: 5,
        borderRadius: SPACING,
    }
}

const styles = StyleSheet.create({
    titleBox: {
        width: width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 2 * SPACING
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#444"
    },
    separator: {
        borderWidth: 1,
        borderColor: "#3b3b3b49",
        marginTop: SPACING,
        marginBottom: SPACING
    },
    optionText: {
        fontWeight: "bold",
        color: "#444",
        fontSize: 16
    },
    statBox: {
        flexDirection: "row",
        marginTop: 2 * SPACING,
        marginLeft: SPACING
    },
    subText: {
        fontWeight: "bold",
        color: "#1c1c1dbf"
    },
    name: {
        fontWeight: "bold",
        marginTop: SPACING,
        fontSize: 18
    },
    imageBox: {
        marginTop: height * 0.05,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: "cover"
    },
});