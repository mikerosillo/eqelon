import React, { Component } from 'react';
import { Alert, Text, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

class PlaceHolder extends Component {
    async componentWillMount() {
        const gotToken = await AsyncStorage.getItem('ACCESS_TOKEN');
        const gotClient = await AsyncStorage.getItem('CLIENT');
        const gotUid = await AsyncStorage.getItem('UID');

        if (gotToken && gotClient && gotUid) {
            // console.warn(gotToken, gotClient, gotUid)

            // Actions.myinfo({

            // })

            Actions.profile({ type: 'reset' })
            // return fetch('http://hq.eucledian.com:7270/funds/2', {
            //   method: 'GET',
            //   headers: {
            //     'access-token': gotToken,
            //     client: gotClient,
            //     uid: gotUid,
            //   },
            // })
            // .then((response) => {
            //   response
            //     .json()
            //     .then((data) => {
            //       console.warn(data)
            //       AsyncStorage.setItem('SERIE_NAME', JSON.stringify(data.fund.total_cost));
            //     })
            //     .then(() => {
            //       AsyncStorage.getItem('SERIE_NAME').then((value) => {
            //         if (value !== null) {
            //           const d = JSON.parse(value);
            //           Alert.alert(JSON.stringify(d + 'from placeHolder'))
            //         } else {
            //           Alert.alert('some wrong');
            //         }
            //       });
            //     })
            //     .catch((error) => {
            //       Alert.alert(error.message);
            //     });
            // })
            // .then(() => Actions.profile({ type: 'reset' }));
        } else {
            Actions.welcome({ type: 'reset' });
        }
    }
    render() {
        return <View />;
    }
}
export default PlaceHolder;
