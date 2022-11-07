import { useState } from 'react';
import { VStack, Text, Heading, useToast } from 'native-base';
import { Header } from '../components/Header';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import Logo from '../assets/logo.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';

export function New() {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePollCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);

      await api.post('/polls', { title: title.toUpperCase() });

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (err) {
      console.log(err);
      toast.show({
        title: 'Não foi possível criar o bolão.',
        placement: 'top',
        bgColor: 'red.500',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }

    setTitle('');
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Criar novo Bolão' />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack mt={8} mx={5} alignItems='center'>
          <Logo />

          <Heading
            fontFamily='heading'
            color='white'
            fontSize='xl'
            textAlign='center'
            my={8}
          >
            Crie seu próprio bolão da copa e {'\n'} compartilhe entre amigos!
          </Heading>

          <Input
            value={title}
            onChangeText={setTitle}
            mb={2}
            placeholder='Qual o nome do seu bolão?'
          />

          <Button
            title='CRIAR O MEU BOLÃO'
            onPress={handlePollCreate}
            isLoading={isLoading}
          />

          <Text
            color='gray.200'
            fontSize='sm'
            textAlign='center'
            px={10}
            mt={4}
          >
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas.
          </Text>
        </VStack>
      </TouchableWithoutFeedback>
    </VStack>
  );
}
