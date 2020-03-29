import React from 'react';
import { View, Text, Button } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

function HomeScreen({ navigation }){
    // render() {
        return(
            <View>
                <Button onPress={() => navigation.navigate('home', {
                    id: 1
                })} title="GO"></Button>  
            </View>
        )
    // }
}
class Detail extends React.Component {
    render() {
        return (
            <View>
                <Text>123</Text>
            </View>
        )
    }
}
// const appNavigator = createStackNavigator({
//     首页: {
//         screen: HomeScreen
//     },
//     Detail: {
//         screen: Detail
//     },
//     initialRouteName: 'Detail'
// })

// const appConteiner = createAppContainer(appNavigator);

export default HomeScreen;