
import Add from './app/add/add';
import Chart from './app/chart/chart';
import Home from './app/home/home';
import My from './app/my/my';

const TabRouteConfigs = {
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({focused}) => {
                if (focused) {
                    return(
                        <Image source={{uri: 'icon_177'}} />
                    )
                }
                return (
                    <Image source={{uri: 'icon_177'}} />
                )
            }
        }
    },
    Chart: {
        screen: Chart,
        navigationOptions: {
            tabBarLabel: '图表',
            tabBarIcon: ({focused}) => {
                if (focused) {
                    return(
                        <Image source={{uri: 'icon_169'}} />
                    )
                }
                return (
                    <Image source={{uri: 'icon_169'}} />
                )
            }
        }
    },
    Add: {
        screen: Add,
        navigationOptions: {
            tabBarLabel: '记账',
            tabBarIcon: ({focused}) => {
                if (focused) {
                    return(
                        <Image source={{uri: 'icon_165'}} />
                    )
                }
                return (
                    <Image source={{uri: 'icon_165'}} />
                )
            }
        }
    },
    My: {
        screen: My,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused}) => {
                if (focused) {
                    return(
                        <Image source={{uri: 'icon_172'}} />
                    )
                }
                return (
                    <Image source={{uri: 'icon_172'}} />
                )
            }
        }
    }
}
const TabNavigatorConfig = {
    tabBarOptions: {},
    tabBarComponent: Home,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
}