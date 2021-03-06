import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import  firebase from 'firebase';

export default class LoginScreen    extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
    }

    handleLogin = () => {
        const { email, password } = this.state

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage : error.message}))
    }


    render(){
        return(
            <View style = { styles.container }>
                <Text style = { styles.greeting }>
                    {"Bienvenido"}
                </Text>

                <View style = { styles.errorMessage }>
                    {this.state.errorMessage && <Text style={ styles.error }>{this.state.errorMessage}</Text>}
                </View>

                <View style = { styles.form }>
                    <Text style={ styles.inputTitle}> Nombre Completo </Text>
                    <TextInput style = { styles.input } autoCapitalize = "none"
                    onChangeText={ email => this.setState ({ email })}
                    value = {this.state.email}
                    ></TextInput>
                </View>

                <View style = { styles.form }>
                    <Text style={ styles.inputTitle}> Email Address </Text>
                    <TextInput style = { styles.input } secureTextEntry autoCapitalize = "none"
                    onChangeText={ password => this.setState ({ password })}
                    value = {this.state.password}
                    ></TextInput>
                </View>

                <TouchableOpacity style = { styles.button} onPress = { this.handleLogin}>
                    <Text style = {{ color: "#FFF", fontWeight: "250" }}> Iniciar Sesion </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {{ alignSelf: "center", marginTop: 32 }}
                onPress={() => this.props.navigation.navigate("ListaUsuarios")}>
                    <Text> Todavia no tienes cuenta?, 
                    <Text style = {{ color: "#FF0000", fontWeight: 250}}> Registrate </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB2B5'
    },

    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
    },

    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "200",
        textAlign: "center",
    },

    error: {
        color: "#e9446a",
        fontSize: 10,
        fontWeight: "300",
        textAlign: "center",
    },

    form: {
        color: 'black',
        marginBottom: 48,
        marginHorizontal: 30,
    },

    inputTitle: {
        color: "black",
        fontSize: 10,
        textTransform: "uppercase",
    },

    input: {
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161f3d",
    }, 

    button: {
        marginHorizontal: 30,
        backgroundColor: "#61636E",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    }
})