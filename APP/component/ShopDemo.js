import React ,{Component} from 'react'
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

let {width, height} = Dimensions.get('window');
export default class ShopDemo extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}>
                {/* 按钮部分 */}
                <View style={styles.topView}>
                    <TouchableOpacity 
                        style={styles.btnClickShop}
                        onPress={() => this._addShop()}
                    >
                        <Text style={styles.btnText}>添加商品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.btnClickShop,{marginLeft: 10, backgroundColor: "red"}]}
                        onPress={() => this._delShop()}
                    >
                        <Text style={styles.btnText}>删除商品</Text>
                    </TouchableOpacity>
                </View>
                {/* 商品部分 */}
                <View style={styles.boView}></View>
            </View>
        );
    }
    _addShop() {
        let col = 3; let row = 3;
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "cyan",
        alignItems: "center"
    },
    btnClickShop: {
        width: 100,
        height: 40,
        backgroundColor: "green",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop:30,
    },
    btnText: {
        color:"#fff",
        fontSize: 15
    },
    topView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    boView: {
        width: width * 0.9,
        height: height * 0.75,
        backgroundColor: "#fff",
        marginTop: 30
    }
});
