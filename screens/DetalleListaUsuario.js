import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    correo: "",
    celular: "",
    cedula: "",
    descripcion: "",
  };

  const [usuario, setUsuario] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUsuario({ ...usuario, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("usuarios").doc(id);
    const doc = await dbRef.get();
    const usuario = doc.data();
    setUsuario({ ...usuario, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("usuarios")
      .doc(props.route.params.usuarioId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("ListaUsuarios");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("usuarios").doc(usuario.id);
    await userRef.set({
         nombre: state.nombre,
          correo: state.correo,
          celular: state.celular,
          cedula: state.cedula,
          descripcion: state.descripcion,
    });
    setUsuario(initialState);
    props.navigation.navigate("ListaUsuarios");
  };

  useEffect(() => {
    getUserById(props.route.params.usuarioId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="nombre"
          style={styles.inputGroup}
          value={usuario.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          placeholder="correo"
          style={styles.inputGroup}
          value={usuario.correo}
          onChangeText={(value) => handleTextChange(value, "correo")}
        />
      </View>
      <View>
        <TextInput
          placeholder="celular"
          style={styles.inputGroup}
          value={usuario.celular}
          onChangeText={(value) => handleTextChange(value, "celular")}
        />
      </View>

      <View>
        <TextInput
          placeholder="cedula"
          style={styles.inputGroup}
          value={usuario.cedula}
          onChangeText={(value) => handleTextChange(value, "cedula")}
        />
      </View>
      
      <View>
        <TextInput
          placeholder="descripcion"
          style={styles.inputGroup}
          value={usuario.descripcion}
          onChangeText={(value) => handleTextChange(value, "descripcion")}
        />

      </View>

      {/*<View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />

      </View>*/}

      {/*<View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>*/}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#AEB2B5'
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;
