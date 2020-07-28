import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Button,
    DeviceEventEmitter,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import CommonHeader from '../main/commonHeader';
import Login from '../login/login';
import md5 from 'js-md5';
import {alert} from '../assets/js/public';

const {width, height} = Dimensions.get('window');

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            confirmPass: '',
            rememberPassFlag: false,
        }
    }

    onChangeText(event) {
        console.log('onChangeText:', event);
    }
    rememberPass() {
        this.setState({
            rememberPassFlag: !this.state.rememberPassFlag,
        });
    }
    register() {
        if (!this.state.userName) {
            alert('请输入用户名!');
            return;
        }
        if (!this.state.password) {
            alert('请输入密码!');
            return;
        }
        if (!this.state.confirmPass) {
            alert('请输入确认密码!');
            return;
        }
        if (this.state.password != this.state.confirmPass) {
            alert('密码与确认密码不一致，请重新输入!', () => {
                this.setState({confirmPass: ''});
            });
            return;
        }
        HTTPBase.get('users/register', {
            username: this.state.userName,
            password: md5(this.state.password)
        }).then(res => {
            if (res.code === 200) {
                alert(res.desc, () => {
                    this.back();
                });
            } else {
                alert(res.desc);
            }
        })
    }
    toLogin() {
        this.props.navigator.push({
            component: Login,
        })
    }

    renderLeftItem() {
        return(
            <TouchableOpacity activeOpacity={0.6} onPress={() => this.back()}>
                <Image source={{uri: 'back'}} style={styles.navLeftItemStyle} />
            </TouchableOpacity>
        )
    }
    renderTitleItem() {
        return (
            <Text style={styles.navTitleItemStyle}>注册</Text>
        )
    }
    back() {
        if (this.props.navigator.getCurrentRoutes.length > 1) {
            this.props.navigator.pop();
        }
    }
    alert(message, confirm, title = '提示') {

    }

    componentWillMount() {
        console.log('register: componentDidMount');
        DeviceEventEmitter.emit('hiddenTabbar', true);
    }

    render() {
        return(
            <View style={styles.container}>
                <CommonHeader
                    leftItem={() => this.renderLeftItem()}
                    titleItem={() => this.renderTitleItem()}
                    />
                <Image source={{uri: 'icon_round'}} style={styles.icon} />
                <View style={styles.loginForm}>
                    <TextInput value={this.state.userName} placeholder="用户名" style={styles.textInput}
                        onChangeText={(username) => {this.setState({userName: username})}}  />
                    <TextInput value={this.state.password} placeholder="密码"  style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(pass) => {this.setState({password: pass})}}  />
                    <TextInput value={this.state.confirmPass} placeholder="确认密码"  style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(pass) => {this.setState({confirmPass: pass})}}  />
                    <TouchableOpacity onPress={() => this.register()} activeOpacity={0.6}>
                       <Text style={styles.formBtn}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.back()} activeOpacity={0.6}>
                       <Text style={styles.registerTip}>有账号？去登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: width,
        height: height,
        backgroundColor: 'rgba(255, 215, 0, 0.1)'
    },
    navLeftItemStyle: {
        marginLeft: 15,
        width: 20,
        height: 20,
    },
    navTitleItemStyle: {
        width: 66,
        height: 30,
        lineHeight: 30,
        fontSize: 18,
        textAlign: 'center',
    },

    icon: {
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 100,
        height: 100,
    },
    loginForm: {
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 260,
    },
    textInput: {
        paddingLeft: 10,
        marginTop: 1,
        width: '100%',
        height: 46,
        backgroundColor: 'rgba(255, 255, 255, .6)',
    },
    aboutPass: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 40,
    },
    rememberPassWrap: {
        flex: 1,
        height: 40,
        lineHeight: 40,
        flexDirection: 'row',
    },
    radio: {
        marginTop: 11,
        marginRight: 3,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    radioActive: {
        backgroundColor: 'rgb(255, 215, 0)',
    },
    forgetPass: {
        flex: 1,
        flex: 1,
        height: 40,
        lineHeight: 40,
        fontSize: 14,
        textAlign: 'right',
    },
    formBtn: {
        marginTop: 44,
        width: '100%',
        height: 44,
        lineHeight: 44,
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'rgb(255, 215, 0)',
        borderRadius: 20,
        textAlign: 'center',
    },
    registerTip: {
        marginTop: 10,
        width: '100%',
        height: 46,
        lineHeight: 46,
        fontSize: 16,
        color: '#5f545a',
        textAlign: 'center',
    },

    empty: {}
})