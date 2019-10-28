import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  AsyncStorage,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  BackHandler,
  ToastAndroid,
  View,

} from 'react-native';
import { Footer, FooterTab } from 'native-base';
import { Actions } from 'react-native-router-flux';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  goToOther() {
    Actions.profile();
  };
  check() {
    if (this.state.email !== '') {
      this.forgotPassword()
      // Alert.alert(this.state.email)
    } else {

      Alert.alert('Add email please')
    }
  };
  forgotPassword = async () => {
    const response = await fetch('http://hq.eucledian.com:7270/auth/password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          Alert.alert('An email has been sent to' + ' ' + this.state.email)
        } else {
          Alert.alert('Email not found')
        }
        console.warn(response)
        response.json().then((data) => {

        }).catch((err) => {
          console.warn(err.message)
        })

      })
      .catch(err => console.warn(err.message));
  };

  registeredAlready = async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    const client = await AsyncStorage.getItem('CLIENT');
    const uid = await AsyncStorage.getItem('UID');
    if (token && client && uid !== null) {
      this.goToOther();
    } else {
      Alert.alert('Need to register first');
    }
  };
  lets() {
    Alert.alert('pressed')
  }
  onLoginPressed = async () => {
    const response = await fetch('http://hq.eucledian.com:7270/auth/sign_in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        let token = response.headers.map['access-token'];
        let client = response.headers.map.client;
        let uid = response.headers.map.uid;
        response.json().then((data) => {
          let userName = data.app_user.name
          let userVehicles = data.app_user.vehicles
          let id = data.app_user.id
          console.warn('from login', data.app_user.pending_return_payments)
          AsyncStorage.setItem('USER_ID', JSON.stringify(id))
          AsyncStorage.setItem('USER_VEHICLES', JSON.stringify(userVehicles))
          AsyncStorage.setItem('USER_NAME', userName)
          // AsyncStorage.getItem('USER_ID').then((value) => {
          //   console.warn(value)
          // })
        }).catch((err) => {
          console.warn(err.message)
        })
        AsyncStorage.setItem('ACCESS_TOKEN', token);
        AsyncStorage.setItem('CLIENT', client);
        AsyncStorage.setItem('UID', uid);
        // console.warn(token, client, uid)
        if (token && client && uid !== null) {
          this.registeredAlready()
        } else {
          Alert.alert('Please enter correct information');
        }
      })
      .catch(err => console.warn(err.message));
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    ToastAndroid.show('Please Login', ToastAndroid.SHORT);
    return true;
  }
  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={require('../../../assets/BG_PROYECTO.png')}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode={'contain'}
            source={require('../../../assets/LOGO_EQELON.png')}
          />
          <TextInput
            onChangeText={val => this.setState({ email: val })}
            style={styles.input}
            placeholder=" Correo Electrónico"
            placeholderTextColor="#FFF"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.Password.focus();
            }}
            blurOnSubmit={false}
          />
          <TextInput
            onChangeText={val => this.setState({ password: val })}
            style={styles.input}
            ref={(input) => {
              this.Password = input;
            }}
            placeholder=" Contraseña"
            placeholderTextColor="#FFF"
            secureTextEntry
          />
          <TouchableOpacity onPress={this.onLoginPressed.bind(this)} style={styles.buttonLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.check.bind(this)}>
            <Text style={{ color: 'white', marginTop: 25 }}>Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          {/* <Text onPress={this.lets.bind(this)} style={{ color: 'white', marginTop: 25 }}>Forgot password?</Text> */}
        </View>
        <Footer style={{ marginTop: 100, height: 30 }}>
          <FooterTab style={{ alignItems: 'center', justifyContent: 'flex-end', backgroundColor: '#000000', height: 30 }}>
            <Text style={{ color: 'rgb(195, 145, 55)', fontWeight: '100', marginRight: 20 }}>
              WORLDSHAPERS{'  '}<Text style={{ color: 'rgb(195, 145, 55)', fontWeight: 'bold' }}>FUND</Text>
            </Text>
          </FooterTab>
        </Footer>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  image: {
    width: Dimensions.get('window').width - 170,
    resizeMode: "contain",
    height: 211,
    marginTop: 0,
  },
  input: {
    padding: 4,
    fontSize: 18,
    color: '#FFF',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
    height: 50,
    width: '75%',
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonLogin: {
    backgroundColor: '#FFF',
    height: 50,
    width: '75%',
    marginTop: 40,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    color: 'black',
    alignSelf: 'center',
    fontWeight: '100'
  },
});
export default Login;