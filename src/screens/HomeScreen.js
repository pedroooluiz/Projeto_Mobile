import React, { useState, useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import Api from '../services/Api';

function HomeScreen({ navigation }) {
  const [muscles, setMuscles] = useState([]);

  useEffect(() => {
    // Fazer a requisição à API e atualizar o estado 'muscles' com os dados
    Api.get('/exercises')
      .then((response) => {
        const muscleData = response.data.map((exercise) => exercise.muscle);
        const uniqueMuscles = Array.from(new Set(muscleData));
        setMuscles(uniqueMuscles);
      })
      .catch((error) => {
        console.error('Erro ao obter dados da API:', error);
        // Isso é para checar sse a Api estava retornado um array
      });
  }, []); 

  return (
    <View>
      <Text>Home Screen</Text>

      <FlatList
        data={muscles}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Card
            onPress={() => {
              navigation.navigate('Treinos', { muscle: item });
            }}
          >
            <Card.Title title={item} />
          </Card>
        )}
      />
    </View>
  );
}

export default HomeScreen;
