import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TreinoAbc({ route, navigation }) {
  const { nomeAluno, tipoTreino, treinoIndex } = route.params || {};

  const [nomeAlunoAtual, setNomeAlunoAtual] = useState(nomeAluno || '');
  const [tipoTreinoAtual, setTipoTreinoAtual] = useState(tipoTreino || '');
  const [gruposMusculares, setGruposMusculares] = useState([]);

  const salvarTreino = async () => {
    try {
      const savedTreinosJSON = await AsyncStorage.getItem('savedMuscles');
      const savedTreinos = savedTreinosJSON ? JSON.parse(savedTreinosJSON) : [];

      const nomeTreinoAtual = treinoIndex !== undefined ? `Treino ${String.fromCharCode(65 + treinoIndex)}` : nomeAlunoAtual;

      const novoTreino = {
        nomeAluno: nomeAlunoAtual,
        tipoTreino: tipoTreinoAtual,
        gruposMusculares: gruposMusculares,
      };

      if (treinoIndex !== undefined) {
        savedTreinos[treinoIndex] = novoTreino;
      } else {
        savedTreinos.push(novoTreino);
      }

      await AsyncStorage.setItem('savedMuscles', JSON.stringify(savedTreinos));

      // Limpa os inputs após salvar
      setNomeAlunoAtual('');
      setTipoTreinoAtual('');
      setGruposMusculares([]);

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
    }
  };

  const toggleGrupoMuscular = (grupo) => {
    // Verifica se o grupo muscular já está selecionado
    if (gruposMusculares.includes(grupo)) {
      // Se estiver, remove o grupo muscular da lista
      setGruposMusculares(gruposMusculares.filter((item) => item !== grupo));
    } else {
      // Se não estiver, adiciona o grupo muscular à lista
      setGruposMusculares([...gruposMusculares, grupo]);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>Formulário de Treino ABC</Text>

        <Text>Nome do Aluno:</Text>
        <TextInput
          placeholder="Nome do Aluno"
          value={nomeAlunoAtual}
          onChangeText={(text) => setNomeAlunoAtual(text)}
        />

        <Text>Selecione o Tipo de Treino:</Text>
        <TextInput
          placeholder="Tipo de Treino (A, B, C, D)"
          value={tipoTreinoAtual}
          onChangeText={(text) => setTipoTreinoAtual(text.toUpperCase())}
        />

        <Text>Selecione o(s) Grupo(s) Muscular(es):</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => toggleGrupoMuscular('Peito')}>
            <Text>Peito</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleGrupoMuscular('Costas')}>
            <Text>Costas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleGrupoMuscular('Pernas')}>
            <Text>Pernas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleGrupoMuscular('Ombros')}>
            <Text>Ombros</Text>
          </TouchableOpacity>
        </View>

        <Button title="Salvar" onPress={salvarTreino} />
      </View>
    </ScrollView>
  );
}

export default TreinoAbc;

