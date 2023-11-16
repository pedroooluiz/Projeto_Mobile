import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from 'react-native-paper-dropdown';

function TreinoAbc({ route, navigation }) {
  const { nomeAluno, tipoTreino, treinoIndex } = route.params || {};

  const [nomeAlunoAtual, setNomeAlunoAtual] = useState(nomeAluno || '');
  const [tipoTreinoAtual, setTipoTreinoAtual] = useState(tipoTreino || '');
  const [gruposMuscularesA, setGruposMuscularesA] = useState([]);
  const [showDropDownA, setShowDropDownA] = useState(false);

  const [gruposMuscularesB, setGruposMuscularesB] = useState([]);
  const [showDropDownB, setShowDropDownB] = useState(false);

  const [gruposMuscularesC, setGruposMuscularesC] = useState([]);
  const [showDropDownC, setShowDropDownC] = useState(false);

  const [gruposMuscularesD, setGruposMuscularesD] = useState([]);
  const [showDropDownD, setShowDropDownD] = useState(false);

  const salvarTreino = async () => {
    try {
      const savedTreinosJSON = await AsyncStorage.getItem('savedMuscles');
      const savedTreinos = savedTreinosJSON ? JSON.parse(savedTreinosJSON) : [];
  
      const nomeTreinoAtual = treinoIndex !== undefined ? `Treino ${String.fromCharCode(65 + treinoIndex)}` : nomeAlunoAtual;
  
      const novoTreino = {
        nomeAluno: nomeAlunoAtual,
        tipoTreino: tipoTreinoAtual,
        gruposMuscularesA: Array.isArray(gruposMuscularesA) ? gruposMuscularesA : [gruposMuscularesA],
        gruposMuscularesB: Array.isArray(gruposMuscularesB) ? gruposMuscularesB : [gruposMuscularesB],
        gruposMuscularesC: Array.isArray(gruposMuscularesC) ? gruposMuscularesC : [gruposMuscularesC],
        gruposMuscularesD: Array.isArray(gruposMuscularesD) ? gruposMuscularesD : [gruposMuscularesD],
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
      setGruposMuscularesA([]);
      setGruposMuscularesB([]);
      setGruposMuscularesC([]);
      setGruposMuscularesD([]);
  
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
    }
  };
  
  const toggleGrupoMuscularA = (grupo) => {
    if (typeof gruposMuscularesA === 'string') {
      setGruposMuscularesA([grupo]);
    } else {
      if (gruposMuscularesA.includes(grupo)) {
        setGruposMuscularesA(gruposMuscularesA.filter((item) => item !== grupo));
      } else {
        setGruposMuscularesA([...gruposMuscularesA, grupo]);
      }
    }
  };

  const toggleGrupoMuscularB = (grupo) => {
    // Similar to your existing toggleGrupoMuscular function for group B
  };

  const toggleGrupoMuscularC = (grupo) => {
    // Similar to your existing toggleGrupoMuscular function for group C
  };

  const toggleGrupoMuscularD = (grupo) => {
    // Similar to your existing toggleGrupoMuscular function for group D
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

        <Text>Selecione o(s) Grupo(s) Muscular(es) A:</Text>
        <DropDown
          label="Grupos Musculares A"
          mode="outlined"
          visible={showDropDownA}
          showDropDown={() => setShowDropDownA(true)}
          onDismiss={() => setShowDropDownA(false)}
          value={Array.isArray(gruposMuscularesA) ? gruposMuscularesA.join(', ') : gruposMuscularesA}
          setValue={setGruposMuscularesA}
          list={gruposMuscularesList}
          multiSelect
        />

        <Divider style={{ marginVertical: 10 }} />

        {/* Similar sections for groups B, C, and D */}
        
        <Text>Selecione o(s) Grupo(s) Muscular(es) B:</Text>
        <DropDown
          label="Grupos Musculares B"
          mode="outlined"
          visible={showDropDownB}
          showDropDown={() => setShowDropDownB(true)}
          onDismiss={() => setShowDropDownB(false)}
          value={Array.isArray(gruposMuscularesB) ? gruposMuscularesB.join(', ') : gruposMuscularesB}
          setValue={setGruposMuscularesB}
          list={gruposMuscularesList}
          multiSelect
        />

        <Divider style={{ marginVertical: 10 }} />

        <Text>Selecione o(s) Grupo(s) Muscular(es) C:</Text>
        <DropDown
          label="Grupos Musculares C"
          mode="outlined"
          visible={showDropDownC}
          showDropDown={() => setShowDropDownC(true)}
          onDismiss={() => setShowDropDownC(false)}
          value={Array.isArray(gruposMuscularesC) ? gruposMuscularesC.join(', ') : gruposMuscularesC}
          setValue={setGruposMuscularesC}
          list={gruposMuscularesList}
          multiSelect
        />

        <Divider style={{ marginVertical: 10 }} />

        <Text>Selecione o(s) Grupo(s) Muscular(es) D:</Text>
        <DropDown
          label="Grupos Musculares D"
          mode="outlined"
          visible={showDropDownD}
          showDropDown={() => setShowDropDownD(true)}
          onDismiss={() => setShowDropDownD(false)}
          value={Array.isArray(gruposMuscularesD) ? gruposMuscularesD.join(', ') : gruposMuscularesD}
          setValue={setGruposMuscularesD}
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

