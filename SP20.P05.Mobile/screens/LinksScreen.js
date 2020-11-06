import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { RectButton, ScrollView } from "react-native-gesture-handler";

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Text style={styles.WelcomeText}>What is LA Community Farms?</Text>
        </View>

        <View style={styles.getStartedContainer}>
          {/* <DevelopmentModeNotice /> */}

          <Text style={styles.getStartedText}>
            Envoc AgriCo brings to you our LA Community Fields brand, a simple
            solution to reserving and purchasing tickets to your favorite local
            farm fields. We are an LA based agricultural tourism company who
            aims to bring to farmers and communities closer
          </Text>
        </View>
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}
        >
          <MonoText style={styles.codeHighlightText}>
            navigation/BottomTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </View>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          {/* <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" /> */}
          <Image
            style={styles.tinyLogo}
            source={{
              uri: "https://i.imgur.com/HGn2cIG.jpeg"
            }}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  },
  getStartedText: {
    fontSize: 15,
    paddingBottom: 10,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 50
  },
  WelcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(96,100,109, 1)",
    lineHeight: 27,
    textAlign: "center",
    paddingBottom: 15
  },
  welcomeContainer: {
    marginBottom: 20,
    marginTop: 10
  }
});
