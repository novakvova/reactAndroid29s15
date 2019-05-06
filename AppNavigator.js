import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./app/components/HomeScreen";
import RegisterScreen from "./app/components/auth/register/RegisterScreen";

const AppNavigator = createStackNavigator(
    {
      Home:  HomeScreen,
      Register: RegisterScreen 
    //   Login: LoginPage,

    //   Register: RegisterPage
    },
    {
      initialRouteName: "Home"
    }
  );
  
  export default createAppContainer(AppNavigator);