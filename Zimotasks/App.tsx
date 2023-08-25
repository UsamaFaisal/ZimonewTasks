// In App.js in a new project
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text , Button} from 'react-native';
import Navigator from './controllers/Navigator';
import { Provider} from 'react-redux';
import store from './store/config';


// const store = configureStore()
function App() {
  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigator/>
    </GestureHandlerRootView>
    </Provider>
  );
}


export default App;