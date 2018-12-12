import AppMain from './app/AppMain'
import PageLink from './app/PageLink'

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

const NavigationScreens = createStackNavigator({
        Home: AppMain,
        PageLink: PageLink,
    }, {
        initialRouteName: "Home"
    }
);
const App = createAppContainer(NavigationScreens);

export default App;

