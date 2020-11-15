import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import * as authActions from "../../store/actions/auth";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Color";

const AuthScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const [isSignup, setIsSignup] = useState(false);

  const AuthHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isSignup) {
        await dispatch(authActions.signup(email, pass));
        props.navigation.navigate("Shop");
      } else {
        await dispatch(authActions.login(email, pass));
        props.navigation.navigate("Shop");
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.dradient}>
        <Card style={styles.authCountainer}>
          <ScrollView>
            <Text style={styles.label}>E-Mail</Text>
            <TextInput
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              required
              email
              style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              id="pass"
              label="pass"
              keyboardType="default"
              autoCapitalize="none"
              onChangeText={(text) => setPass(text)}
              required
              minLength={5}
              style={styles.input}
            />
          </ScrollView>
          <View style={styles.buttonContianer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={AuthHandler}
              />
            )}
          </View>
          <View style={styles.buttonContianer}>
            <Button
              title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  dradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  authCountainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  label: {
    marginVertical: 8,
    fontWeight: "bold",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  buttonContianer: {
    marginTop: 10,
  },
});

export default AuthScreen;
