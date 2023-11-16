import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from 'react-native-paper-dropdown';

function TreinoAbc({ route, navigation }) {
  const { nomeAluno, tipoTreino, treinoIndex } = route.params || {};

  const [nomeAlunoAtual, setNomeAlunoAtual] = useState(nomeAluno || '');
  const [tipoTreinoAtual, setTipoTreinoAtual] = useState(tipoTreino || '');
  const [gruposMusculares, setGruposMusculares] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);

  const salvarTreino = async () => {
    try {
      const savedTreinosJSON = await AsyncStorage.getItem('savedMuscles');
      const savedTreinos = savedTreinosJSON ? JSON.parse(savedTreinosJSON) : [];
  
      const nomeTreinoAtual = treinoIndex !== undefined ? `Treino ${String.fromCharCode(65 + treinoIndex)}` : nomeAlunoAtual;
  
      const novoTreino = {
        nomeAluno: nomeAlunoAtual,
        tipoTreino: tipoTreinoAtual,
        gruposMusculares: Array.isArray(gruposMusculares) ? gruposMusculares : [gruposMusculares],
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
    if (typeof gruposMusculares === 'string') {
      setGruposMusculares([grupo]);
    } else {
      if (gruposMusculares.includes(grupo)) {
        setGruposMusculares(gruposMusculares.filter((item) => item !== grupo));
      } else {
        setGruposMusculares([...gruposMusculares, grupo]);
      }
    }
  };

  const gruposMuscularesList = [
    { label: 'Peito', value: 'Peito' },
    { label: 'Costas', value: 'Costas' },
    { label: 'Pernas', value: 'Pernas' },
    { label: 'Ombros', value: 'Ombros' },
  ];

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

        <Divider style={{ marginVertical: 10 }} />

        <Text>Selecione o(s) Grupo(s) Muscular(es):</Text>
        <DropDown
          label="Grupos Musculares"
          mode="outlined"
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={Array.isArray(gruposMusculares) ? gruposMusculares.join(', ') : gruposMusculares}
          setValue={setGruposMusculares}
          list={gruposMuscularesList}
          multiSelect
        />

        <Divider style={{ marginVertical: 10 }} />

        <Button title="Salvar" onPress={salvarTreino} />
      </View>
    </ScrollView>
  );
}

export default TreinoAbc;

