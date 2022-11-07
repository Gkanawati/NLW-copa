import { useEffect, useState } from 'react';
import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PollHeader } from '../components/PollHeader';
import { PollCardProps } from '../components/PollCard';
import { EmptyMyPollList } from '../components/EmptyMyPollList';
import { Option } from '../components/Option';
import { Share } from 'react-native';
import { Guesses } from '../components/Guesses';

interface RouteParams {
  id: string;
}

export function Details() {
  const [pollDetails, setPollDetails] = useState<PollCardProps>(
    {} as PollCardProps
  );
  const [isLoading, setIsLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>(
    'guesses'
  );

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  async function handleCodeShare() {
    await Share.share({
      message: pollDetails.code,
    });
  }

  useEffect(() => {
    async function getPollData() {
      try {
        const response = await api.get(`polls/${id}`);
        setPollDetails(response.data.poll);
      } catch (err) {
        console.log(err);
        toast.show({
          title: 'Nao foi possível carregar os detalhes do bolão',
          placement: 'top',
          bgColor: 'red.500',
        });
      } finally {
        setIsLoading(false);
      }
    }
    getPollData();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header
        title={pollDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {pollDetails._count.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PollHeader data={pollDetails} />

          <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
            <Option
              title='Seus Palpites'
              isSelected={optionSelected === 'guesses'}
              onPress={() => setOptionSelected('guesses')}
            />
            <Option
              title='Ranking do grupo'
              isSelected={optionSelected === 'ranking'}
              onPress={() => setOptionSelected('ranking')}
            />
          </HStack>

          {optionSelected == 'guesses' ? (
            <Guesses pollId={pollDetails.id} code={pollDetails.code} />
          ) : null}
        </VStack>
      ) : (
        <EmptyMyPollList code={pollDetails.code} />
      )}
    </VStack>
  );
}
