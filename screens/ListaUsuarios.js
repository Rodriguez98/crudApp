import React, { useState, useEffect } from "react";
import { Button } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserScreen = (props) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    firebase.db.collection("usuarios").onSnapshot((querySnapshot) => {
      const usuarios = [];
      querySnapshot.docs.forEach((doc) => {
        const { nombre, correo, celular, cedula, descripcion } = doc.data();
        usuarios.push({
          id: doc.id,
          nombre,
          correo,
          celular,
          cedula,
          descripcion,
        });
      });
      setUsuarios(usuarios);
    });
  }, []);

  return (
    <ScrollView>
      <Button
          style = {{backgroundColor: "#61636E"}}
        onPress={() => props.navigation.navigate("CrearUsuario")}
        title="Crear usuario"
      />
      {usuarios.map((usuario) => {
        return (
          <ListItem
            key={usuario.id}
            bottomDivider
            onPress={() => {
             props.navigation.navigate("DetalleListaUsuario", {
              usuariosId: usuario.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://cdn0.iconfinder.com/data/icons/users-80/30/users-light-profile-neutral-5-512.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{usuario.nombre}</ListItem.Title>
              <ListItem.Subtitle>{usuario.correo}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UserScreen;
