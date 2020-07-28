import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ImageBackground,
    StatusBar,
    DeviceEventEmitter,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components';
import HTTP from '../http/HTTPBase';

import Home from '../home/home';
import Chart from '../chart/chart';
import Add from '../add/add';
import My from '../my/my';
import Login from '../login/login';
export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'my',
            isHiddenTabBar: false,
        };
    }
    clickNav(tab) {
        this.setState({
            selectedTab: tab,
        })
    }

    UNSAFE_componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('hiddenTabbar', (message) => {
            console.log('hiddenTabbar:', message, this.state.isHiddenTabBar)
            if (this.state.isHiddenTabBar != message) {
                this.setState({
                    isHiddenTabBar: message
                }, () => {
                    console.log('hiddenTabbar after:', this.state.isHiddenTabBar)
                });
            }
        });
        console.log('hehe:', this.props.navigator)
    }
    UNSAFE_componentWillUnmount() {
        if (this.listener) {
            this.listener.remove();
        }
    }

    renderTabNavigatorItem(tab, title, icon, component) {
        return(
            <TabNavigator.Item
                title={title}
                selected={this.state.selectedTab === tab}
                titleStyle={{color: 'black'}}
                selectedTitleStyle={{color: 'black'}}
                renderIcon={() => <Image source={{uri: icon}} style={styles.navIcon} />}
                renderSelectedIcon={() => <Image source={{uri: icon}} style={[styles.navIcon, styles.navIconSelected]} />}
                onPress={() => this.clickNav(tab)}
                >
                <Text>{title}</Text>
            </TabNavigator.Item>
        )
    }

                /*<Navigator
                    initialRoute={{name: tab, component: component}}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component {...route.params} navigator={navigator}
                                />
                        )
                    }}
                 />
                */
    render() {
        return (
            <>
                <StatusBar backgroundColor="#f9db61" />
                <TabNavigator
                    tabBarStyle={this.state.isHiddenTabBar !== true ? styles.empty : styles.tabBarStyle}
                    sceneStyle={this.state.isHiddenTabBar !== true ? styles.empty : styles.sceneStyle}
                    >
                    {this.renderTabNavigatorItem('home', '首页', 'icon_177', Home)}
                    {this.renderTabNavigatorItem('chart', '图表', 'icon_169', Chart)}
                    {this.renderTabNavigatorItem('addBook', '记账', 'icon_165', Add)}
                    {this.renderTabNavigatorItem('my', '我的', 'icon_172', My)}
                </TabNavigator>

            </>
        )
    }
}

const styles = StyleSheet.create({
    navIcon: {
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25,
        borderRadius: Platform.OS === 'ios' ? 15 : 12,
    },
    empty: {
    },
    tabBarStyle: {
        height: 0,
        overflow: 'hidden',
    },
    navIconSelected: {
        backgroundColor: 'rgb(255, 215, 0)',
    },
    sceneStyle: {
        paddingBottom: 0,
    }
});