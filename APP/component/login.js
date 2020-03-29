import React, { Component, useState, useEffect } from 'react';
import { Image, Animated, Text, View, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigator } from 'react-navigation';

import { Button, ThemeProvider } from 'react-native-elements';
const { DeviceWidth, DeviceHeight} = Dimensions.get('window');
const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // 透明度初始值设为0

  React.useEffect(() => {
    Animated.timing(                  // 随时间变化而执行动画
      fadeAnim,                       // 动画中的变量值
      {
        toValue: 1,                   // 透明度最终变为1，即完全不透明
        duration: 1000,              // 让动画持续一段时间
      }
    ).start();                        // 开始执行动画
  }, [])

  return (
    <Animated.View                 // 使用专门的可动画化的View组件
      style={{
        ...props.style,
        opacity: fadeAnim,         // 将透明度绑定到动画变量值
      }}
    >
      {props.children}
    </Animated.View>
  );
}
export default class Login extends Component{
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.container}> 
                <TouchableOpacity style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Text style={{ color: '#666' }}>跳过</Text>
                </TouchableOpacity>
                <View style={styles.logo}>
                    <Image source={ {uri : 'login1'} } style={{width: '50%', height: '50%'}}/>
                    <Text>天下资讯, 尽在我手</Text>
                </View>
                <View style={styles.box}>
                    <Text></Text>
                    <Button
                        title="登录"
                        type="outline"
                    />
                    <Button
                        title="注册" 
                    />
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        width: DeviceWidth,
        height: DeviceHeight,
        backgroundColor: "#FFF",
        padding: 10
    },
    logo: {
        backgroundColor: '#FFF',
        width: "100%",
        height: "75%",
        justifyContent: "center",
        // alignContent: "center",
        alignItems: "center"
    },
    box: {
        width: "100%",
        height: "25%",
        display:"flex",
        justifyContent: 'space-evenly'
    }
})