import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Api from '../services/Api';

function HomeScreen({ navigation }) {
  const [muscles, setMuscles] = useState([]);

  useEffect(() => {
    Api.get('/exercises')
      .then((response) => {
        const muscleData = response.data.map((exercise) => exercise.muscle);
        const uniqueMuscles = Array.from(new Set(muscleData));
        setMuscles(uniqueMuscles);
      })
      .catch((error) => {
        console.error('Erro ao obter dados da API:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Home Screen</Text>

      <FlatList
        data={muscles}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E2DFE6',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4285F4', // Cor azul, você pode ajustar conforme necessário
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
