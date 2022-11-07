import { useEffect, useState, useCallback } from 'react';
import { VStack, Icon, useToast, FlatList } from 'native-base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

import { api } from '../services/api';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { PollCard, PollCardProps } from '../components/PollCard';
import { Loading } from '../components/Loading';
import { EmptyPollList } from '../components/EmptyPollList';

export function Polls() {
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PollCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      async function fetchPolls() {
        try {
          setIsLoading(true);
          const response = await api.get('/polls');

          setPolls(response.data.polls);
        } catch (err) {
          console.log(err);
          toast.show({
            title: 'Nao foi possível carregar os bolões',
            placement: 'top',
            bgColor: 'red.500',
          });
        } finally {
          setIsLoading(false);
        }
      }
      fetchPolls();
    }, [])
  );

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Meus Bolões' />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}
      >
        <Button
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={
            <Icon as={Octicons} name='search' color='black' size='md' />
          }
          onPress={() => navigate('find')}
        />
      </VStack>

      {!isLoading ? (
        <FlatList
          data={polls}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
          ListEmptyComponent={() => <EmptyPollList />}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
        />
      ) : (
        <Loading />
      )}
    </VStack>
  );
}
