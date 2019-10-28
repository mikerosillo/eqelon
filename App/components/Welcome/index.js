// import React, { Component } from 'react';
// import {
//     StyleSheet, View, AsyncStorage,
//     TextInput, Button, Alert, Text,
//     TouchableOpacity, ImageBackground,
//     TouchableHighlight, ScrollView, FlatList, Image, Dimensions
// } from 'react-native';
// import { Actions } from 'react-native-router-flux';
// const final = []
// //import all the components we are going to use. 
// export default class Welcome extends Component {
//     goToRegister() {
//         Actions.register()
//     }
//     goToLogin() {
//         Actions.login()
//     }
//     render() {
//         return (
//             <ImageBackground style={styles.imgBackground}
//                 resizeMode='cover'
//                 source={require('../../../assets/BG_LEGALES_11.png')}>
//                 <View style={styles.MainContainer}>
//                     {/* <Text style={styles.heading}>Welcome</Text> */}
//                     <View style={styles.logo}>
//                         <Image
//                             style={styles.image}
//                             resizeMode={'contain'}
//                             source={require('../../../assets/LOGO_EQELON.png')}
//                         />
//                         <TouchableOpacity
//                             onPress={this.goToLogin}
//                             style={styles.buttonLogOut}>
//                             <Text style={styles.buttonText}>Sign In </Text>
//                         </TouchableOpacity>
//                         <Text style={styles.Text}>WORLDSHAPERS FOUND</Text>
//                     </View>
//                 </View>
//             </ImageBackground>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     imgBackground: {
//         width: '100%',
//         height: '100%',
//         flex: 1,
//     },
//     MainContainer: {
//         alignItems: 'flex-end',
//         flex: 1,
//         justifyContent: 'flex-end'
//         // margin: 10,
//         // marginTop: 60
//     },
//     image: {
//         width: Dimensions.get('window').width - 170,
//         resizeMode: "contain",
//         height: 211,
//     },
//     heading: {
//         fontSize: 50,
//         color: '#FFF',
//         alignItems: 'center',
//         margin: 10,
//         marginBottom: 80,
//     },
//     logo: {
//         width: '100%',
//         height: '50%',
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     buttonLogOut: {
//         backgroundColor: 'rgba(52, 52, 52, 0.6)',
//         height: 50,
//         width: '75%',
//         //alignSelf: 'stretch',
//         marginTop: 20,
//         marginBottom: 20,
//         justifyContent: 'center',
//         borderRadius: 10,
//     },
//     buttonSignIn: {
//         backgroundColor: '#FFF',
//         height: 50,
//         width: '70%',
//         //alignSelf: 'stretch',
//         marginTop: 20,
//         marginBottom: 20,
//         justifyContent: 'center',
//         borderRadius: 10,
//     },
//     buttonText: {
//         color: '#FFF',
//         textAlign: 'center',
//         fontSize: 20,
//     },
//     Text: {
//         //flex: 1,
//         //justifyContent: 'flex-end',
//         //alignItems: 'center',
//         marginTop: 200,
//         color: '#FFF',
//         textAlign: 'center',
//         fontSize: 10,
//     },
// });
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
var rendered = []
export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            after3seconds: 'WORLDSHAPERS FUND',
        };

    }
    goToRegister() {
        Actions.register()
    }
    goToLogin() {
        Actions.login()
    }
    after3seconds() {
        console.warn('none')
    }
    componentDidMount() {
        setTimeout(() => {
            this.goToLogin()
            // this.setState({ after3seconds: [] });
        }, 3000);
    };
    // componentWillMount() {
    //     setTimeout(() => {
    //         this.goToLogin()
    //         // this.setState({ after3seconds: [] });
    //     }, 3000);
    // }
    render() {
        return (
            <ImageBackground style={styles.imgBackground}
                resizeMode='cover'
                source={require('../../../assets/BG_LEGALES_11.png')}>
                <View style={styles.MainContainer}>
                    <View style={styles.logo}>

                        <Image
                            style={styles.image}
                            resizeMode={'contain'}
                            source={require('../../../assets/LOGO_EQELON.png')}
                        />

                        <Text style={styles.Text}>{this.state.after3seconds}</Text>
                    </View>
                </View>
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
    MainContainer: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'flex-end'
        // margin: 10,
        // marginTop: 60
    },
    image: {
        width: Dimensions.get('window').width - 170,
        resizeMode: "contain",
        height: 211,
    },
    logo: {
        width: '100%',
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Text: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 10,
        position: 'absolute',
        bottom: 30
    },
});