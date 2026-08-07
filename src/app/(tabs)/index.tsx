import { router } from "expo-router";
import { Button, Text, TouchableOpacity, View } from "react-native";
import {
  GoogleOneTapSignIn,
  isNoSavedCredentialFoundResponse,
  isSuccessResponse,
} from "react-native-nitro-google-signin";

GoogleOneTapSignIn.configure({
  webClientId:
    "842994417850-o8p2v52r4hfreivghua5agf28n22ukhk.apps.googleusercontent.com",
  // "842994417850-0629hr9r4hg8nd73vetsf6gbennvkeom.apps.googleusercontent.com", //android
});

export default function Index() {
  const test = () => {
    router.push("/(test)/test");
  };

  const startSignInFlow = async () => {
    await GoogleOneTapSignIn.checkPlayServices();

    let response = await GoogleOneTapSignIn.signIn();

    if (isNoSavedCredentialFoundResponse(response)) {
      response = await GoogleOneTapSignIn.createAccount();
    }
    if (isNoSavedCredentialFoundResponse(response)) {
      response = await GoogleOneTapSignIn.presentExplicitSignIn();
    }

    if (isSuccessResponse(response)) {
      const { user, idToken } = response.data;
      // Send idToken to your backend for verification
      console.log(user.email, idToken);
    }
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Button title="Sign in" onPress={startSignInFlow} />
      <TouchableOpacity style={{ padding: 12 }} onPress={test}>
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
}
