import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentPin from "../components/contentPin";
import ClubHomePin from "../components/clubHomePin";
import CommunityHomePin from "../components/communityHomePin";
import { macbeaseData, story, suggestionsForCommunity, userBio } from "../constants/data";
import SimilarCommunity from "../components/similarCommunity";
import SimilarClub from "../components/similarClubs";
import { StoriesContext } from "../store/storiesContext";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;


export default function Landing({ navigation }) {
    const storiesCtx = useContext(StoriesContext);

    let stories = storiesCtx.storiesList;

    function updateStories(item) {
        let storyName = item.tags[1];
        let length = stories.length;
        let alreadyExists = false;
        for (let i = 0; i < length; i++) {
            let story = stories[i];
            if (story.title === storyName) {
                story = { title: storyName, pins: [...story.pins, item] };
                stories[i] = story;
                alreadyExists = true;
            }
        }
        if (!alreadyExists) {
            stories.push({ title: storyName, pins: [item] })
        }
        // storiesCtx.setStoriesList([]);
        storiesCtx.setStoriesList(() => stories);
    }

    function getRightPin(item, index) {
        if (item.tags[0] === "story") {
            updateStories(item)
            if (item.tags[2] === "firstPin") {
                return <ContentPin data={item} key={index} />
            }
        }
        else if (item.sendBy === "Macbease") {
            return <ContentPin data={item} key={index} />
        }
        else if (item.sendBy === "club") {
            return <ClubHomePin data={item} key={index} />
        }
        else if (item.sendBy === "userCommunity") {
            return <CommunityHomePin data={item} key={index} />
        }
    }

    //for backend fire controller 10 of content

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topBox}>
                    <Text style={styles.title}>Good morning {userBio.name.split(" ")[0]}</Text>
                    <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }]} onPress={() => { navigation.navigate("profile", { userBio }) }}>
                        <Image source={{ uri: userBio.image }} style={styles.profileImg} />
                    </Pressable>
                </View>
                {macbeaseData.map((item, index) => {
                    return (
                        getRightPin(item, index)
                    )
                })}
                <SimilarCommunity similarCommunity={suggestionsForCommunity} />
                <SimilarClub />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 24
    },
    profileImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: "cover"
    },
    topBox: {
        // borderWidth: 0.5,
        height: 40,
        width: width - 2 * SPACING,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: SPACING
    }
});