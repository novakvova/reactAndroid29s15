import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
 } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    photo: null,
    type: ''
  };
  handleChoosePhoto = () => {
    const options = {
      //noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('----image ggg----', response);
      if (response.data) {
        this.setState({ photo: response.data, type: `data:${response.type};base64,` });
      }
      // if (response.uri) {
      //   this.setState({ photo: response });
      // }
    });
  };

  onSubmit = () => {
    console.log('---register click-----');
    const model = 
    { 
        email: this.state.email, 
        password: this.state.password,
        image: this.state.photo 
    }; 
    axios.post('http://10.0.2.2:50005/api/account/register', model)
            .then(
                (data) => { console.log('--get data--', data); },
                (error) => { console.log('--Bad request--'); }
            );
  }

  render() {
    const { photo, type } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: type+photo }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.onSubmit()}>
                    <Text style={styles.loginText}>Реєстрація</Text>
                </TouchableHighlight>

      </View>
    );
  }
}
 
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius: 30,
      borderBottomWidth: 1,
      width: 250,
      height: 45,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center'
  },
  inputs: {
      height: 45,
      marginLeft: 16,
      borderBottomColor: '#FFFFFF',
      flex: 1,
  },
  inputIcon: {
      width: 30,
      height: 30,
      marginLeft: 15,
      justifyContent: 'center'
  },
  buttonContainer: {
      height: 45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      width: 250,
      borderRadius: 30,
  },
  loginButton: {
      backgroundColor: "#00b5ec",
  },
  loginText: {
      color: 'white',
  }
});