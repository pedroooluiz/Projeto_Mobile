import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import Api from '../services/Api';

function TreinosScreen({ route, navigation }) {
  const { muscle } = route.params;
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Fazer a solicitação à API para obter exercícios para o músculo selecionado
    Api.get(`/exercises?muscle=${muscle}`)
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter dados da API:', error);
          //Coloquei isso aqui pq não estava conseguido obter os dados da api 
      });
  }, [muscle]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treinos para {muscle}</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              // Navegar para os detalhes do exercício com o nome do exercício como parâmetro
              navigation.navigate('Exercicios', { exerciseName: item.name });
            }}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TreinosScreen;



