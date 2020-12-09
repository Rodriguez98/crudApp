import React from 'react'
import { render } from 'react-dom';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import  firebase from 'firebase';

export default class LoginScreen extends React.Component {
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
                    {"Hola Mundo"}
                </Text>

                <View style = { styles.errorMessage }>
                    {this.state.errorMessage && <Text style={ styles.error }>{this.state.errorMessage}</Text>}
                </View>

                <View style = { styles.form }>
                    <Text style={ styles.inputTitle}> Email Address </Text>
                    <TextInput style = { styles.input } autoCapitalize = "none"
                    onChangeText={ email => this.setState ({ email })}
                    value = {this.state.email}
                    ></TextInput>
                </View>

                <View style = { styles.form }>
                    <Text style={ styles.inputTitle}> Email Address </Text>
                    <TextInput style = { styles.input } autoCapitalize = "none"
                    onChangeText={ password => this.setState ({ password })}
                    value = {this.state.password}
                    ></TextInput>
                </View>

                <TouchableOpacity style = { styles.button} onPress = { this.handleLogin}
                onPress={() => this.props.navigation.navigate("CreateUserScreen")}>
                    <Text style = {{ color: "#FFF", fontWeight: "250" }}> Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {{ alignSelf: "center", marginTop: 32 }}>
                    <Text> Todavia no tienes cuenta?, 
                    <Text style = {{ color: "#e9446a", fontWeight: 250}}> Registrate </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "200",
        textAlign: "center",
    },

    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30,
    },
    
    error: {
        color: "#e9446a",
        fontSize: 10,
        fontWeight: "300",
        textAlign: "center",
    },

    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },

    inputTitle: {
        color: "#8a8f9e",
        fontSize: 10,
        textTransform: "uppercase",
    },

    input: {
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161f3d",
    }, 

    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
    }
})