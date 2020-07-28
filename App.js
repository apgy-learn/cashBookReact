/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
} from 'react-native';
import {createAppContainer} from 'react-navigation';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Main from './app/main/main';
import AppNavigator from './app/router/index';

const AppContainer = createAppContainer(AppNavigator);
//const App: () => React$Node = () => {
//    return (
//            <Main />
//    );
//};
/*
    <NavigationContainer>
    </NavigationContainer>
*/
const styles = StyleSheet.create({
});
export default class App extends Component {
    render() {
        return <NavigationContainer>
            <AppContainer />
        </NavigationContainer>
    }
}
//export default App;
