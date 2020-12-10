import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView } from "react-native";

import firebase from "../database/firebase";

const AgregarNuevoUsuario = (props) => {
  const initalState = {
    nombre: "",
    apellido: "",
    correo: "",
    celular: "",
    cedula: "",
    descripcion: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };

  const saveNewusuario = async () => {
    if (state.nombre === "") {
      alert("please provide a nombre");
    } else {
      try {
        await firebase.db.collection("usuarios").add({
          nombre: state.nombre,
          correo: state.correo,
          celular: state.celular,
          cedula: state.cedula,
          descripcion: state.descripcion,
        });

        props.navigation.navigate("ListaUsuarios");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* nombre Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, "nombre")}
          value={state.nombre}
        />
      </View>

      {/* correo Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Correo"
          onChangeText={(value) => handleChangeText(value, "correo")}
          value={state.correo}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Celular"
          onChangeText={(value) => handleChangeText(value, "celular")}
          value={state.celular}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Cedula"
          onChangeText={(value) => handleChangeText(value, "cedula")}
          value={state.cedula}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Descripcion"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "descripcion")}
          value={state.descripcion}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save usuario" onPress={() => saveNewusuario()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#AEB2B5'
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default AgregarNuevoUsuario;
