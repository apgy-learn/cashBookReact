import {createStackNavigator} from 'react-navigation-stack';
import Login from '../login/login';
import Register from '../register/register';
import Add from '../add/add';
import Chart from '../chart/chart';
import Home from '../home/home';
import Main from '../main/main';
import My from '../my/my';

const AppNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: {
                title: '登录',
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                title: '注册',
            }
        },
        Add: {
            screen: Add,
        },
        Chart: {
            screen: Chart,
            navigationOptions: {
                title: '图表',
            }
        },
        Home: {
            screen: Home,
            navigationOptions: {
                title: '首页',
            }
        },
        Main: {
            screen: Main,
            navigationOptions: {
                header: null,
            }
        },
        My: {
            screen: My,
            navigationOptions: {
                title: '我的',
            }
        }
    },
    {
         initialRouteName: 'Home',
    }
);
export default AppNavigator;