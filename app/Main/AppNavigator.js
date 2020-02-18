// Library Imports
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthLoading from '../Screens/AuthLoading.screen';
import Login from '../Screens/Login.screen';
import Profile from '../Screens/Profile.screen';
import AdvInfoForm from '../Screens/AdvInfoForm.screen';
import ClientForm from '../Screens/ClientForm.screen';

// Stack Navigator
const MainStack = createStackNavigator(
  {
    Profile: Profile,
    ClientForm: ClientForm,
    AdvInfoForm: AdvInfoForm
  },
  {
    headerMode: 'none'
  }
);

// Switch Navigator
const AuthStack = createStackNavigator(
  {
    Login: Login,
  },
  {
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: MainStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
)

export default AppContainer;
