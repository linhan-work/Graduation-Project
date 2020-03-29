import React, {Component} from 'react';
import {Image, Text, View, Dimensions, StyleSheet} from 'react-native'
let data = [
    {
        "name": "bao",
        "intro": "小宝宝"
    },
    {
        "name": "eat",
        "intro": "吃东西"
    },
    {
        "name": "xin",
        "intro": "小心心"
    }
]
let imageHight = 120;
let imageWidth = 120;
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
let leftMargin = (deviceWidth - imageWidth * 3) / 4;
export default function imageDemo ({route, navigation}){
    // constructor() {
    //     super();
    // }
    // render() {
        return (
            <>
                <View style={{flexDirection: "row"}}>
                    {/* {this._renderItem()}  */}
                    <Text>{route.params.id}</Text>
                </View>
            </>
        );
    // }
    // _renderItem() {
        
    //     let arr = [];
    //     for(let i = 0; i < data.length; i++) {
    //         arr.push(
    //             <View key={i} style={styles.container}>
    //                 <Image source={{ uri: data[i].name }} style={{width: 100, height:100}} />
    //                 <Text>{data[i].intro}</Text>
    //             </View>
    //         );
    //     }
    //     return arr;
    // }
}
let styles = StyleSheet.create({
    container: {
        width: imageWidth,
        height: imageHight, 
        marginLeft: leftMargin, 
        justifyContent: "center", 
        alignItems: "center" 
        // flex-wrap 换行
    }
})