import { Home } from '../Screens/HomeScreen/home';
import {  createDrawerNavigator  } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function TabNav() {
  // const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
<Tab.Navigator screenOptions={{ tabBarIconStyle: {display: 'none'} , tabBarLabelStyle: { color: "black" , fontSize: 15} , tabBarStyle: {
    width:'100%',
    backgroundColor:'#fa7da7',
    elevation:5,
    height:50,
    display:'flex',
    flexDirection:'row',
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'space-between'} , tabBarBadgeStyle:{borderColor: "black" , borderWidth: 1 }}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
    </NavigationContainer>
    
  );
}