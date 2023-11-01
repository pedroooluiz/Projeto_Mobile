import React from 'react';
import { View, Text, Button } from 'react-native';

function TreinosScreen({ navigation }) {
  return (
    <View>
      <Text>Treinos Screen</Text>
      <Button
        title="Ir para Exercicios"
        onPress={() => navigation.navigate('Exercicios')}
      />
    </View>
  );
}

export default TreinosScreen;

