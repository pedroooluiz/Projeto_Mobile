import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Api from '../services/Api';

function ExerciciosScreen({ route }) {
  const { exerciseName } = route.params;
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    Api.get(`/exercises?name=${exerciseName}`)
      .then((response) => {
        if (response.data.length > 0) {
          setExercise(response.data[0]);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter dados da API:', error);
      });
  }, [exerciseName]);

  return (
    <View style={styles.container}>
      {exercise ? (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{exercise.name}</Text>
          <Text style={styles.cardText}>Type: {exercise.type}</Text>
          <Text style={styles.cardText}>Muscle: {exercise.muscle}</Text>
          <Text style={styles.cardText}>Equipment: {exercise.equipment}</Text>
          <Text style={styles.cardText}>Difficulty: {exercise.difficulty}</Text>
          <Text style={styles.cardText}>Instructions: {exercise.instructions}</Text>

          <Image
            source={{ uri: `../../assets/${exerciseName.replace(/\s/g, '')}.gif` }}
            style={styles.gif}
          />
        </View>
      ) : (
        <Text style={styles.loadingText}>Carregando informações do exercício...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E2DFE6',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4285F4', // Cor azul, você pode ajustar conforme necessário
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', // Cor preta, você pode ajustar conforme necessário
  },
  gif: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  loadingText: {
    fontSize: 16,
    color: '#333', // Cor preta, você pode ajustar conforme necessário
  },
});

export default ExerciciosScreen;
