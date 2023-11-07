import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Api from '../../services/Api';


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
          <Text>Type: {exercise.type}</Text>
          <Text>Muscle: {exercise.muscle}</Text>
          <Text>Equipment: {exercise.equipment}</Text>
          <Text>Difficulty: {exercise.difficulty}</Text>
          <Text>Instructions: {exercise.instructions}</Text>
        </View>
      ) : (
        <Text>Carregando informações do exercício...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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

export default ExerciciosScreen;
