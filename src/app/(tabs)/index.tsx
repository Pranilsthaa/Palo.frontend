import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",

  tokenEndpoint: "https://oauth2.googleapis.com/token",

  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export default function Index() {
  const redirectUri = makeRedirectUri({
    scheme: "palo",
    path: "redirect",
  });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId:
        "842994417850-gt6efj6n2fkf3md8s0qbvllvk7sugrhr.apps.googleusercontent.com",
      redirectUri,
      scopes: ["openid", "profile", "email"],
      responseType: "code",
      usePKCE: true,
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      console.log("Authorization code:", code);

      // Send this code to your backend.
      // Exchange it for tokens securely on the server.
    }

    if (response?.type === "error") {
      console.error("OAuth error:", response.error);
    }
  }, [response]);

  const test = () => {
    router.push("/(test)/test");
  };

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Button
        title="Sign in"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      <TouchableOpacity style={{ padding: 12 }} onPress={test}>
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
}
