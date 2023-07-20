import { Image, StyleSheet } from "react-native";

export default function ProfileImage({ url, size }) {
    return (
        <Image
            source={{ uri: url }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            resizeMode="cover"
        />
    )
};

