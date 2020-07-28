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
    AsyncStorage,
} from 'react-native';
import CommonHeader from '../main/commonHeader';
import Register from '../register/register';
import Home from '../home/home';
import {alert} from '../assets/js/public';
import md5 from 'js-md5';

const {width, height} = Dimensions.get('window');
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            rememberPassFlag: false,
        }
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
            <Text style={styles.navTitleItemStyle}>登录</Text>
        )
    }
    back() {
//        console.log('this:', this.props)
        if (this.props.navigator.getCurrentRoutes.length > 1) {
            this.props.navigator.pop();
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
    login() {
        if (!this.state.userName) {
            alert('请输入用户名!');
            return;
        }
        if (!this.state.password) {
            alert('请输入密码!');
            return;
        }
        HTTPBase.get('users/login', {
            username: this.state.userName,
            password: md5(this.state.password)
        }).then(res => {
            if (res.code === 200) {
                if (this.state.rememberPassFlag) {
                    AsyncStorage.setItem('userInfo:', JSON.stringify({
                        username: this.state.userName,
                        password: this.state.password,
                    }), (err) => {
                        console.log('失败了:', res);
                    }).then(res => {
                        console.log('存储结果：', res);
                    });
                } else {
                    AsyncStorage.removeItem('userInfo');
                }
                AsyncStorage.setItem('username', this.state.userName);
                alert(res.desc, () => {
                    this.props.navigator.replace({
                        component: Home,
                    });
                });
            } else {
                alert(res.desc);
            }
        })
    }
    toRegister() {
        this.props.navigator.replace({
            component: Register
        });
    }

    UNSAFE_componentWillMount() {
        console.log('login: componentDidMount');
        DeviceEventEmitter.emit('hiddenTabbar', true);
    }
    UNSAFE_componentDidMount() {
        console.log('hehe:', Storage.get('userInfo'));
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
                    <View style={styles.aboutPass} >
                        <TouchableOpacity onPress={() => this.rememberPass()}
                            style={styles.rememberPassWrap} activeOpacity={0.6} >
                            <View style={[styles.radio, this.state.rememberPassFlag ? styles.radioActive : styles.empty]}></View>
                            <Text style={{fontSize: 14,height: 40, lineHeight: 40,}}>记住密码</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.6}>
                            <Text style={styles.forgetPass}>忘记密码？</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => this.login()} activeOpacity={0.6}>
                       <Text style={styles.formBtn}>登录</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.toRegister()} activeOpacity={0.6}>
                       <Text style={styles.registerTip}>没有账号？立即注册</Text>
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