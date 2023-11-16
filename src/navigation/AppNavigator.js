import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import TreinosSalvosScreen from '../screens/TreinosSalvosScreen';
import TreinosScreen from '../screens/TreinosScreen';
import ExerciciosScreen from '../screens/ExerciciosScreen'; // Importe a página Exercicios
import  AbcTreino  from '../screens/AbcTreino';


const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Treinos Salvos" component={TreinosSalvosScreen} />
        <Tab.Screen
          name="Treinos"
          component={TreinosScreen}
          options={{ tabBarButton: () => null }}
        />
          <Tab.Screen
          name="AbcTreino"
          component={AbcTreino}
          options={{ tabBarButton: () => null }}
        />
        <Tab.Screen
          name="Exercicios"
          component={ExerciciosScreen} // Defina a página "Exercicios"
          options={{ tabBarButton: () => null }} // Esconde o item "Exercicios" na barra de navegação
        />
   
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
