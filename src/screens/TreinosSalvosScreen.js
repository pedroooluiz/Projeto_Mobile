import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Button, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TreinosSalvosScreen({ navigation }) {
  const [savedTreinos, setSavedTreinos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    try {
      const savedTreinosJSON = await AsyncStorage.getItem('savedMuscles');
      const savedTreinos = savedTreinosJSON ? JSON.parse(savedTreinosJSON) : [];
      setSavedTreinos(savedTreinos);
    } catch (error) {
      console.error('Erro ao recuperar treinos salvos:', error);
    }
  }

  const excluirTreino = async (index) => {
    try {
      const updatedTreinos = [...savedTreinos];
      updatedTreinos.splice(index, 1);
      await AsyncStorage.setItem('savedMuscles', JSON.stringify(updatedTreinos));
      setSavedTreinos(updatedTreinos);
    } catch (error) {
      console.error('Erro ao excluir treino:', error);
    }
  };
  const editarTreino = (index) => {
    const treinoParaEditar = savedTreinos[index];
    navigation.navigate('AbcTreino', {
      nomeAluno: treinoParaEditar.nomeAluno || '',
      tipoTreino: treinoParaEditar.tipoTreino || '',
      gruposMuscularesA: treinoParaEditar.gruposMuscularesA || [],
      gruposMuscularesB: treinoParaEditar.gruposMuscularesB || [],
      gruposMuscularesC: treinoParaEditar.gruposMuscularesC || [],
      gruposMuscularesD: treinoParaEditar.gruposMuscularesD || [],
      treinoIndex: index, // Adiciona o índice do treino para identificação durante a edição
    });
  };

  return (
    <View>
      <Text>Home Screen</Text>

      {savedTreinos.length > 0 ? (
        <View>
          <Text>Treinos Salvos:</Text>
          <FlatList
            data={savedTreinos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 20 }}>
                <Text>Nome do Aluno: {item.nomeAluno}</Text>
                <Text>Tipo de Treino: {item.tipoTreino}</Text>
                <Text>Grupos Musculares A:</Text>
                {Array.isArray(item.gruposMuscularesA) && item.gruposMuscularesA.map((grupo, grupoIndex) => (
                  <Text key={grupoIndex}>{grupo}</Text>
                ))}
                <Text>Grupos Musculares B:</Text>
                {Array.isArray(item.gruposMuscularesB) && item.gruposMuscularesB.map((grupo, grupoIndex) => (
                  <Text key={grupoIndex}>{grupo}</Text>
                ))}
                <Text>Grupos Musculares C:</Text>
                {Array.isArray(item.gruposMuscularesC) && item.gruposMuscularesC.map((grupo, grupoIndex) => (
                  <Text key={grupoIndex}>{grupo}</Text>
                ))}
                <Text>Grupos Musculares D:</Text>
                {Array.isArray(item.gruposMuscularesD) && item.gruposMuscularesD.map((grupo, grupoIndex) => (
                  <Text key={grupoIndex}>{grupo}</Text>
                ))}
                <TouchableOpacity onPress={() => editarTreino(index)}>
                  <Text style={{ color: 'blue' }}>Editar Treino</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluirTreino(index)}>
                  <Text style={{ color: 'red' }}>Excluir Treino</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <Text>Nenhum treino salvo.</Text>
      )}
      <Button
        title="Adicionar Treino"
        onPress={() => navigation.navigate('AbcTreino', { nomeAluno: '', tipoTreino: '' })}
      />
    </View>
  );
}

export default TreinosSalvosScreen;