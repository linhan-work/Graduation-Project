import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImageDemo from './component/ImageDemo';
// import ShopDemo from './component/ShopDemo';
// import Login from './component/login';
import Nav from './component/BaseNav'
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="haha">
        <Stack.Screen name="home" component={ImageDemo}></Stack.Screen>
        <Stack.Screen name="haha" component={Nav}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const App: () => React$Node = () => {
//     return (
//       <>
//         <NavigationContainer></NavigationContainer>
//       </>
//       // <>
//       //   <StatusBar barStyle="dark-content" />
//       //   {/* <SafeAreaView style={{flex: 1}}> */}
//       //     {/* <ImageDemo /> */}
//       //     {/* <ShopDemo /> */}
//       //     {/* <Login /> */}
//       //     {/* <Text>111</Text> */}
//       //     <Nav />
//       //   {/* </SafeAreaView> */}
//       // </>
//     );
//   }

export default App;