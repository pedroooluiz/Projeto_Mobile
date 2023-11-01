import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Ir para Treinos"
        onPress={() => {
          // Navegar para "Treinos" quando o botão for pressionado
          navigation.navigate('Treinos');
        }}
      />
    </View>
  );
}

export default HomeScreen;
