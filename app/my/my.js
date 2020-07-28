import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ImageBackground,
    DeviceEventEmitter,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import CommonHeader from '../main/commonHeader';
import CommonFooter from '../main/commonFooter';
import {Navigator} from 'react-native-deprecated-custom-components';
import Login from '../login/login';
import Storage from '../storage/index';
export default class My extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    clickName() {
        if (this.state.userName) {
            return;
        }
        this.props.navigator.push({
            component: Login,
        });
    }

    renderTitleItem() {
        return(
            <Text style={styles.navTitleItemStyle} >我的</Text>
        )
    }

    componentDidMount() {
        DeviceEventEmitter.emit('hiddenTabbar', false);
//        AsyncStorage.setItem('username', 'admin', err => {
//            console.log('err:', err);
//        }).then(res => {
//            console.log('存储：', res);
            AsyncStorage.getItem('username').then(val => {
                console.log('get:', val);
                if (val) {
                    this.setState({
                        userName: val
                    });
                }
            });
//        });

    }

    render() {
        return (
            <View style={styles.container}>
                <CommonHeader titleItem={() => this.renderTitleItem()} />
                <View style={styles.myHeader}>
                    <Image source={{uri: 'logo_round'}} style={styles.userAvatar} />
                    <TouchableOpacity activeOpacity={0.6} onPress={() => this.clickName()} >
                        <Text>{this.state.userName ? this.state.userName : '去登录'}</Text>
                    </TouchableOpacity>
                </View>
                <CommonFooter activeFooter={'My'} navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    myHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        width: '100%',
        height: 100,
    },
    userAvatar: {
        marginLeft: 40,
        marginRight: 10,
        width: 80,
        height: 80,
    },
    userName: {
        flex: 1,
        height: 100,
        fontSize: 20,
        backgroundColor: '#f99'
    }
});