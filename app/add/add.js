import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Dimensions,
    TextInput,
    DatePickerAndroid,
    DatePickerIOS,
    DeviceEventEmitter,
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

import CommonHeader from '../main/commonHeader';
import Home from '../home/home';

let {width} = Dimensions.get('window');
let keyItemWidth = parseInt(width / 4);
export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amtType: 0,
            bookTypeList: [],
            activeTypeId: -1,
            remark: '',
            amt: '0',
            today: [],
            bookDate: [],
        };
    }

    renderHeaderTab(text, type) {
        return (
            <TouchableOpacity onPress={() => this.selectHeaderTab(type)}>
                <Text style={[styles.headerTab, type === this.state.amtType ? styles.activeTab : styles.empty]}>{text}</Text>
            </TouchableOpacity>
        )
    }
    selectHeaderTab(type) {
        this.setState({
            amtType: type,
        }, () => {
            this.getBookType();
        });
    }

    getBookType() {
        let that = this;
        HTTPBase.get('bookType/get', {type: this.state.amtType})
        .then(res => {
            if (res.code === 200) {
                that.setState({
                    bookTypeList: res.bookTypeList,
                });
            }
        }, res => {
            console.log('fail:', res);
        });
    }
    renderBookTypeItem(item, index) {
        return (
            <TouchableOpacity key={index} onPress={() => this.selectBookType(item.id)} activeOpacity={0.8}>
                <View style={styles.bookTypeItemWrap}>
                    <View style={[styles.bookTypeImgWrap, this.state.activeTypeId === item.id ? styles.selectedBookType : styles.empty]}>
                        <Image source={{uri: item.book_type_icon}} style={styles.bookTypeImg} />
                    </View>
                    <Text style={styles.bookTypeName}>{item.book_type_name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    selectBookType(id) {
        if(this.state.activeTypeId === id) {
            id = -1;
        }
        this.setState({
            activeTypeId: id,
        });
    }

    renderKeyBoard() { //渲染键盘
        return (
            <View style={styles.keyboardWrap} >
                {this.renderKeyboardHeader()}
                {this.renderKeyboardNum('7')}
                {this.renderKeyboardNum('8')}
                {this.renderKeyboardNum('9')}
                {this.renderCalendar()}
                {this.renderKeyboardNum('4')}
                {this.renderKeyboardNum('5')}
                {this.renderKeyboardNum('6')}
                {this.renderKeyboardNum('+')}
                {this.renderKeyboardNum('1')}
                {this.renderKeyboardNum('2')}
                {this.renderKeyboardNum('3')}
                {this.renderKeyboardNum('-')}
                {this.renderKeyboardNum('.')}
                {this.renderKeyboardNum('0')}
                {this.renderKeyBoardDel()}
                {this.renderKeyDone()}
            </View>
        )
    }
    renderKeyboardHeader() {
        return (
            <View style={styles.keyboardHeader}>
                <Image source={{uri: 'icon_168'}} style={styles.keyboardRemarkImg} />
                <Text>备注：</Text>
                <TextInput onChangeText={text => this.setRemark(text)} style={styles.keyboardRemarkInput}
                    placeholder="点击写备注" />
                <Text style={styles.keyboardAmt} >{this.state.amt}</Text>
            </View>
        )
    }
    renderKeyboardNum(num) {
        return <TouchableOpacity  activeOpacity={0.6} onPress={() => this.clickNum(num)} >
            <Text style={styles.keyboardItem}>{num}</Text>
        </TouchableOpacity>
    }
    clickNum(num) { //输入数字、.、+-
        let amt = this.state.amt;
        if (amt == 0 && num == 0) return;  //当前值为0，输入为0不做操作
        if(num === '+' || num === '-') {//如果输入的是运算符
            if (this.isLastCharOperator()) { //若最后一位是运算符则替换
                amt = amt.substr(0, amt.length - 1) + num;
            } else if (amt.indexOf('+') != -1 || amt.indexOf('-') != -1) {
                amt = this.calculatorAmt() + num;
            } else {
                amt = amt + num;
            }
        } else {
            if (num === '.' && this.getLastChar() === '.') return; //已有小数点且最后一位是小数点不做操作
            let lastNum = this.getLastNum(amt);
            let index = lastNum.lastIndexOf('.');
            if (index != -1 && lastNum.length - index > 2) {//小数点后只保存两个字符
                return;
            }
            amt = lastNum === '0' && num != '.' ? num : amt + num;
        }
        this.setState({
            amt: amt,
        });
    }
    renderCalendar() { //渲染日历按钮
        let today = this.state.today.join('-');
        let bookDate = this.state.bookDate.join('-');
        return <TouchableOpacity activeOpacity={0.6} style={[styles.keyboardItem, styles.keyboardItemOther]} onPress={() => this.showDatePicker()} >
            {
                today === bookDate
                ? (
                    <>
                    <Image source={{uri: 'icon_166'}} style={styles.keyboardItemCalendarImg} />
                    <Text >今天</Text>
                    </>
                ) : <Text> {bookDate}</Text>
            }
        </TouchableOpacity>
    }
    async showDatePicker() {
        if (Platform.OS === 'ios') {} else {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    // 下面显示的会是2020年5月25日。月份是从0开始算的。
                    date: new Date(...this.state.bookDate)
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                    this.setState({
                        bookDate: [year, month, day],
                    });
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }
    }
    renderKeyBoardDel() { //渲染删除按钮
        return <TouchableOpacity activeOpacity={0.6} style={[styles.keyboardItem, styles.keyboardItemOther]} onPress={() => this.keyboardDel()} >
            <Image source={{uri: 'icon_176'}} style={styles.keyboardItemDelImg} />
        </TouchableOpacity>
    }
    keyboardDel() { // 删除
        let amt = this.state.amt;
        if (amt.length) {
            amt = amt.substr(0, amt.length - 1);
        }
        if (amt === '') amt = '0';
        this.setState({
            amt: amt,
        });
    }
    renderKeyDone() { //渲染完成键
        return <TouchableOpacity activeOpacity={0.6} onPress={() => this.keyDone()} >
            <Text style={[styles.keyboardItem, {backgroundColor: '#f9db61'}]}>完成</Text>
        </TouchableOpacity>
    }
    keyDone() {
        let amt = this.calculatorAmt();
        console.log('keyDone:', amt);
        this.setState({
            amt: amt
        });
    }
    setRemark(text) { //设置备注
        this.setState({
            remark: text,
        })
    }
    getLastChar() { //获取最后一个字符
        let amt = this.state.amt;
        return amt[amt.length - 1];
    }
    getLastNum(amt) { //获取最后一个数字，特别针对有运算符的情况
        let splitSym = '';
        if (amt.indexOf('+') != -1) {
            splitSym = '+';
        }
        if (amt.indexOf('-') != -1) {
            splitSym = '-';
        }
        if ( splitSym) {
            let splitArr = amt.split(splitSym);
            return splitArr[splitArr.length - 1];
        }
        return amt;
    }
    isLastCharOperator() { //判断最后一个字符是否是运算符
        let lastChar = this.getLastChar();
        if (lastChar === '+' || lastChar === '-') {
            return true;
        }
        return false;
    }
    calculatorAmt() {
        let res = eval(this.state.amt);
        if(parseInt(res) != res) {
            res = res.toFixed(2);
        }
        return res;
    }
    getCurrentDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let state = {
            today: [year, month, day],
        }
        if (true) {
            state.bookDate = [year, month, day];
        }
        this.setState(state);
    }

    renderTitleItem() {
        return(
            <View style={styles.header} >
                {this.renderHeaderTab('支出', 0)}
                {this.renderHeaderTab('收入', 1)}
            </View>
        )
    }
    renderRightItem() {
        return <TouchableOpacity activeOpacity={0.6} onPress={() => this.back()} >
            <Text style={styles.navRightItemStyle} >取消</Text>
        </TouchableOpacity>
    }
    back() {
        if (this.props.navigator.getCurrentRoutes.length > 1) {
            this.props.navigator.pop();
        } else {
            this.props.navigator.push({
                component: Home,
            })
        }
    }

    componentWillMount() {
        this.getBookType();
        this.getCurrentDate();
        console.log('hahaha:add')
        DeviceEventEmitter.emit('hiddenTabbar', true);
    }

    render() {
        return (
            <View style={styles.container}>
                <CommonHeader
                    titleItem={() => this.renderTitleItem()}
                    rightItem={() => this.renderRightItem()}
                 />
                <FlatList style={styles.bookTypeListWrap} numColumns={4}
                    data={this.state.bookTypeList}
                    contentContainerStyle={{justifyContent: 'center'}}
                    renderItem={({item, index}) => this.renderBookTypeItem(item, index)}
                    />
                {/* this.renderKeyBoard() */}
                {this.state.activeTypeId != -1 && this.renderKeyBoard()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#F5FCFF',
    },
    navRightItemStyle: {
        width: 60,
        height: 40,
        lineHeight: 40,
        fontSize: 16,
        textAlign: 'center',
    },
    header: {
        marginLeft: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 200,
        height: Platform === 'ios' ? 64 : 44,
        backgroundColor: '#f9db61',
    },
    headerTab: {
       paddingLeft: 15,
       paddingRight: 15,
       color: '#343233',
       height: Platform === 'ios' ? 64 : 44,
       lineHeight: Platform === 'ios' ? 64 : 44,
       textAlign: 'center',
       fontSize: 16,
    },
    activeTab: {
        borderEndColor: '#343233',
        borderBottomWidth: 4,
    },

    bookTypeListWrap: {
        width: width,
        height: 200,
    },
    bookTypeItemWrap: {
        marginTop: 10,
        width: keyItemWidth,
        height: 75,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookTypeImgWrap: {
        width: 50,
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedBookType: {
        backgroundColor: '#f9db61',
    },
    bookTypeImg: {
        width: 30,
        height: 30,
    },
    bookTypeName: {
        width: '100%',
        height: 24,
        lineHeight: 24,
        fontSize: 14,
        color: '#747373',
        textAlign: 'center',
    },

    keyboardWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 280,
        backgroundColor: '#f3f3f3',
    },
    keyboardHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 52,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    keyboardItem: {
        width: keyItemWidth,
        height: 57,
        lineHeight: 57,
        fontSize: 15,
        textAlign: 'center',
        borderColor: '#ddd',
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    keyboardItemOther: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboardItemCalendarImg: {
        marginRight: 4,
        width: 16,
        height: 16,
    },
    keyboardItemDelImg: {
        width: 22,
        height: 15,
    },
    keyboardAmt: {
        flex: 1,
        paddingRight: 10,
        fontSize: 20,
        textAlign: 'right',
    },
    keyboardRemarkImg: {
        marginLeft: 10,
        marginRight: 5,
        width: 13,
        height: 15,
    },
    keyboardRemarkInput: {
        width: 200,
    },

    empty: {}
});