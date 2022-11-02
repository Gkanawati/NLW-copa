import { StatusBar, NativeBaseProvider, Center } from 'native-base';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { New } from './src/screens/New';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          translucent
          backgroundColor='transparent'
        />
        {fontsLoaded ? <New /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
