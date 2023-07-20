import React from "react";
import { StyleSheet, View, Text, Dimensions, Image, Pressable, TextInput } from "react-native"
import { MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { colorsCommunity } from "../constants/data";

const { width, height } = Dimensions.get("screen");
const SPACING = 12;

//for backend fire patch controller of user schema

export default function EditProfile({ data, setActive }) {
    const [profile, setProfile] = React.useState({ assets: [{ type: "", uri: data.image }] });
    const [name, setName] = React.useState(data.name);
    const [course, setCourse] = React.useState(data.course);
    const [interests, setInterests] = React.useState(data.interests);

    async function uploadPermission() {
        if (Platform.OS !== "web") {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Permission denied!");
            }
            else {
                uploadFile()
            }
        }
    }

    async function uploadFile() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        })
        if (!result.canceled) {
            setProfile(result);
        }
    }

    //function to upload the image 
    async function uploadImage(image) {
        let newFile = {
            uri: image.assets[0].uri,
            type: `test/${image.assets[0].uri.split(".")[1]}`,
            name: image.assets[0].fileName
        }
        let data = new FormData();
        data.append("file", newFile);
        data.append("upload_preset", "yukw2rxf");
        data.append("folder", "test");
        try {
            let res = await fetch(`https://api.cloudinary.com/v1_1/dq4iomrfv/image/upload`, { method: "post", body: data });
            const urlData = await res.json();
            return urlData.url
        } catch (error) {
            console.log(error);
        }
    }

    async function handleEditEvent() {
        const data = await uploadImage(profile);
        console.log(data);
        return
    }

    return (
        <View>
            <View><Text style={styles.title}>Edit Profile</Text></View>
            <View style={styles.imageBox}>
                <Image source={{ uri: profile.assets[0].uri }} style={styles.image} />
                <Pressable style={({ pressed }) => [pressed && { opacity: 0.5 }, { marginLeft: 8 * SPACING }]} onPress={() => { uploadPermission() }}>
                    <MaterialIcons name="add-a-photo" size={24} color="black" />
                </Pressable>
                <Text style={styles.subTitle}>Name</Text>
                <TextInput
                    placeholder="Enter your name."
                    style={styles.nameInput}
                    onChangeText={(txt) => setName(txt)}
                    value={name}
                />
                <Text style={styles.subTitle}>Course</Text>
                <TextInput
                    placeholder="Enter your course."
                    style={styles.nameInput}
                    onChangeText={(txt) => setCourse(txt)}
                    value={course}
                />
                <Text style={styles.subTitle}>#interest1</Text>
                <TextInput
                    placeholder="#tag1"
                    style={styles.nameInput}
                    onChangeText={(txt) => setCourse(txt)}
                    value={interests[0]}
                />
                <Text style={styles.subTitle}>#interest2</Text>
                <TextInput
                    placeholder="#tag2"
                    style={styles.nameInput}
                    onChangeText={(txt) => setCourse(txt)}
                    value={interests[1]}
                />
                <Text style={styles.subTitle}>#interest3</Text>
                <TextInput
                    placeholder="#tag3"
                    style={styles.nameInput}
                    onChangeText={(txt) => setCourse(txt)}
                    value={interests[2]}
                />
                <View style={styles.btnBox}>
                    <Pressable style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]} onPress={() => { setActive("general") }}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.btn, pressed && { opacity: 0.6 }]} onPress={() => { handleEditEvent() }}>
                        <Text style={styles.btnText}>Update</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        marginLeft: SPACING,
        fontSize: 24
    },
    btnText: {
        fontWeight: "bold",
        color: "white"
    },
    btnBox: {
        // borderWidth: 0.5,
        width: width,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: SPACING,
        marginTop: 4 * SPACING
    },
    btn: {
        // borderWidth: 0.5,
        paddingHorizontal: SPACING,
        paddingVertical: SPACING / 2,
        backgroundColor: colorsCommunity.buttonBG,
        borderRadius: SPACING,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    subTitle: {
        fontWeight: "bold",
        marginTop: SPACING,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        width: width - 2 * SPACING,
        paddingHorizontal: SPACING,
        color: "#4445559d"
    },
    nameInput: {
        borderWidth: 1,
        borderColor: "#3b3b3b49",
        marginTop: 6,
        width: width - 2 * SPACING,
        height: 3 * SPACING,
        borderRadius: SPACING,
        paddingHorizontal: SPACING,
        fontWeight: "bold",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        resizeMode: "cover"
    },
    name: {
        fontWeight: "bold",
        marginTop: SPACING,
        fontSize: 18
    },
    imageBox: {
        marginTop: height * 0.08,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
});