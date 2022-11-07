import { useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { VStack, Heading, useToast } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPoll() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código do Bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      await api.post('/polls/join', { code });

      toast.show({
        title: 'Voce entrou no Bolão com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigate('polls');
    } catch (err) {
      console.log(err);

      if (err.response?.data?.message == 'Poll not found') {
        return toast.show({
          title: 'Bolão nao encontrado.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      if (err.response?.data?.message == 'You already joined this poll') {
        return toast.show({
          title: 'Voce já está nesse Bolão.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }

      toast.show({
        title: 'Não foi possível encontrar o bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
      setIsLoading(false);
    }
  }
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack mt={8} mx={5} alignItems='center'>
          <Heading
            fontFamily='heading'
            color='white'
            fontSize='xl'
            textAlign='center'
            mb={8}
          >
            Entre em um bolão através de {'\n'} seu código único
          </Heading>

          <Input
            mb={2}
            placeholder='Qual o código do bolão?'
            value={code}
            onChangeText={setCode}
            autoCapitalize='characters'
          />

          <Button
            title='BUSCAR BOLÃO'
            onPress={handleJoinPoll}
            isLoading={isLoading}
          />
        </VStack>
      </TouchableWithoutFeedback>
    </VStack>
  );
}
