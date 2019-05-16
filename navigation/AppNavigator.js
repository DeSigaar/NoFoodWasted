import { createAppContainer, createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";

// Create the App stack with options
export default (Navigation = createAppContainer(
  createStackNavigator(
    {
      Home: { screen: HomeScreen }
    },
    {
      defaultNavigationOptions: {
        header: null
      },
      initialRouteName: "Home" // Change this if you want to directly go to a screen you are developing
    }
  )
));
