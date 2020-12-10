import React from "react";
import { StyleSheet } from "react-native";
// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CrearUsuario from "./screens/CrearUsuario";
import DetalleListaUsuario from "./screens/DetalleListaUsuario";
import ListaUsuarios from "./screens/ListaUsuarios";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#AEB2B5',
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          textAlign: "center"
        },
      }}
    >
      
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ title: "Login Screen",
        ali: "center",
      }}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ title: "Register Screen" }}
      />

      <Stack.Screen
        name="ListaUsuarios"
        component={ListaUsuarios}
        options={{ title: "usuarios List" }}
      />
      <Stack.Screen
        name="CrearUsuario"
        component={CrearUsuario}
        options={{ title: "Create a New usuario" }}
      />
      <Stack.Screen
        name="DetalleListaUsuario"
        component={DetalleListaUsuario}
        options={{ title: "usuario Detail" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
