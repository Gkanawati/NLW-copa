import { Platform } from 'react-native';
import { useTheme } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { New } from '../screens/New';
import { Polls } from '../screens/Polls';
import { Find } from '../screens/Find';

const { Navigator, Screen } = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function PollStackRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='polls' component={Polls} />
      <Stack.Screen name='find' component={Find} />
    </Stack.Navigator>
  );
}

export function AppRoutes() {
  const { colors, sizes } = useTheme();

  const size = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[22],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800],
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0,
        },
      }}
    >
      <Screen
        name='new'
        component={New}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <PlusCircle color={color} size={size} />
          ),
          tabBarLabel: 'Novo Bolão',
        }}
      />
      <Screen
        name='pollStack'
        component={PollStackRoutes}
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} size={size} />,
          tabBarLabel: 'Meus Bolões',
        }}
      />
    </Navigator>
  );
}
