import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row } from 'react-native-table-component';

function TreinosSalvosScreen({ navigation }) {
  const [savedTreinos, setSavedTreinos] = useState([]);
  const tableHead = ['Nome do Aluno', 'Tipo de Treino', 'Grupos Musculares A', 'Dias A', 'Grupos Musculares B', 'Dias B', 'Grupos Musculares C', 'Dias C', 'Grupos Musculares D', 'Dias D', 'Ações'];

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
      diasSemanaA: treinoParaEditar.diasSemanaA || [],
      gruposMuscularesB: treinoParaEditar.gruposMuscularesB || [],
      diasSemanaB: treinoParaEditar.diasSemanaB || [],
      gruposMuscularesC: treinoParaEditar.gruposMuscularesC || [],
      diasSemanaC: treinoParaEditar.diasSemanaC || [],
      gruposMuscularesD: treinoParaEditar.gruposMuscularesD || [],
      diasSemanaD: treinoParaEditar.diasSemanaD || [],
      treinoIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Treinos Salvos</Text>
      {savedTreinos.length > 0 ? (
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{ margin: 6 }} />
          {savedTreinos.map((item, index) => (
            <Row
              key={index}
              data={[
                item.nomeAluno || '',
                item.tipoTreino || '',
                Array.isArray(item.gruposMuscularesA) ? item.gruposMuscularesA.join(', ') : '',
                Array.isArray(item.diasSemanaA) ? item.diasSemanaA.join(', ') : '',
                Array.isArray(item.gruposMuscularesB) ? item.gruposMuscularesB.join(', ') : '',
                Array.isArray(item.diasSemanaB) ? item.diasSemanaB.join(', ') : '',
                Array.isArray(item.gruposMuscularesC) ? item.gruposMuscularesC.join(', ') : '',
                Array.isArray(item.diasSemanaC) ? item.diasSemanaC.join(', ') : '',
                Array.isArray(item.gruposMuscularesD) ? item.gruposMuscularesD.join(', ') : '',
                Array.isArray(item.diasSemanaD) ? item.diasSemanaD.join(', ') : '',
                <View style={styles.actionsContainer}>
                  <TouchableOpacity onPress={() => editarTreino(index)}>
                    <Text style={styles.editText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => excluirTreino(index)}>
                    <Text style={styles.deleteText}>Excluir</Text>
                  </TouchableOpacity>
                </View>,
              ]}
              textStyle={{ margin: 6 }}
            />
          ))}
        </Table>
      ) : (
        <Text style={styles.noTreinosText}>Nenhum treino salvo.</Text>
      )}
      <Button
        title="Adicionar Treino"
        onPress={() => navigation.navigate('AbcTreino', { nomeAluno: '', tipoTreino: '' })}
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
  actionsContainer: {
    flexDirection: 'row',
  },
  editText: {
    color: 'blue',
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
  noTreinosText: {
    fontSize: 16,
    color: '#333', // Cor preta, você pode ajustar conforme necessário
  },
});

export default TreinosSalvosScreen;
