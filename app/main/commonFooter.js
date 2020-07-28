import React, {Component} from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet,
    Platform,
} from 'react-native';

export default class CommonHeader extends Component {

    renderFooterItem(title, icon, name) {
        return(
            <TouchableOpacity style={styles.footerItem} onPress={() => this.clickFooterItem(name)} >
                <Image style={[styles.footerImage, this.props.activeFooter === name ? styles.activeFooterImage : styles.empty]} source={{uri: icon}} />
                <Text style={styles.footerText} >{title}</Text>
            </TouchableOpacity>
        )
    }
    clickFooterItem(name) {
        this.props.navigation.navigate(name);
    }

    render() {
        return(
            <View style={styles.footerContainer} >
                {this.renderFooterItem('首页', 'icon_177', 'Home')}
                {this.renderFooterItem('图表', 'icon_169', 'Chart')}
                {this.renderFooterItem('记账', 'icon_165', 'Add')}
                {this.renderFooterItem('我的', 'icon_172', 'My')}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    footerContainer: {
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        display: 'flex',
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 60,
    },
    footerItem: {
        flex: 1,
    },
    footerImage: {
        marginTop: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: Platform.OS === 'ios' ? 30 : 25,
        height: Platform.OS === 'ios' ? 30 : 25,
        borderRadius: Platform.OS === 'ios' ? 15 : 12,
    },
    activeFooterImage: {
        backgroundColor: 'rgb(255, 215, 0)',
    },
    footerText: {
        width: '100%',
        textAlign: 'center',
        height: 20,
        fontSize: 14,
    },
    empty: {},
});