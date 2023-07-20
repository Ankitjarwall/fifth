import React, { useContext } from "react";
import { ScrollView, StyleSheet, View, Text, Image, Dimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import StoryPin from "../components/storyPin";
import * as Animatable from "react-native-animatable";
import { StoriesContext } from "../store/storiesContext";


const { width, height } = Dimensions.get("screen");
const SPACING = 12;

export default function Story({ navigation, route }) {
    const { storyName } = route.params;
    const storiesCtx = useContext(StoriesContext);
    const allStories = storiesCtx.storiesList;

    function getPins() {
        let len = allStories.length;
        for (let i = 0; i < len; i++) {
            let collection = allStories[i];
            if (collection.pins[0].tags[1] === storyName) {
                console.log(collection.pins.length)
                return collection.pins
            }
        }
    }

    const [storyPins, setStoryPins] = React.useState(getPins())


    let name = storyPins[0].contributorName.split(" ");
    let img = storyPins[0].contributorPic;
    let course = "Hotel Management (3rd year)";
    let contents = 13;

    const animationLeft = {
        0: { opacity: 0, translateX: -120 },
        1: { opacity: 1, translateX: 0 },
    }

    const animationRight = {
        0: { opacity: 0, translateX: 120 },
        1: { opacity: 1, translateX: 0 },
    }

    const opacity = {
        0: { opacity: 0 },
        1: { opacity: 1 },
    }

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <View style={styles.topBox}>
                    <Animatable.View animation={animationLeft} useNativeDriver delay={400}>
                        <Text style={styles.titleText}>Covered by {name[0]}</Text>
                        <View style={{ flexDirection: "row", marginTop: 6 }}>
                            <FontAwesome5 name="code" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                            <Text style={styles.subText}>{course}</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 2 }}>
                            <Entypo name="edit" size={13} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                            <Text style={styles.subText}>13 stories published</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 2 }}>
                            <FontAwesome name="hashtag" size={14} color="#1c1c1dbf" style={{ marginRight: 6, marginTop: 3 }} />
                            <Text style={styles.subText}>Content creator @Macbease</Text>
                        </View>
                    </Animatable.View>
                    <Animatable.View animation={animationRight} useNativeDriver delay={400}>
                        <Image source={{ uri: img }} style={styles.img} />
                    </Animatable.View>
                </View>
                <View style={styles.divider}></View>
                <Animatable.View animation={opacity} useNativeDriver delay={400}>
                    {storyPins.map((item, index) => {
                        return (
                            <StoryPin data={item} key={index} liked={false} />
                        )
                    })}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    divider: {
        borderWidth: 1,
        borderColor: "#7879817e",
        width: width,
        marginTop: SPACING
    },
    subText: {
        fontWeight: "bold",
        color: "#1c1c1dbf"
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 30,
        resizeMode: "cover"
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 22
    },
    topBox: {
        // borderWidth: 0.5,
        width: width - 2 * SPACING,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})