import { useEffect, useState } from 'react';
import { FlatList, useToast } from 'native-base';
import { api } from '../services/api';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';
import { EmptyMyPollList } from './EmptyMyPollList';

interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [games, setGames] = useState<GameProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);
      const response = await api.get(`/polls/${pollId}/games`);
      setGames(response.data.games);
    } catch (err) {
      console.log(err);
      toast.show({
        title: 'Nao foi possível carregar os jogos',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do seu palpite.',
          placement: 'top',
          bgColor: 'yellow.500',
        });
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite enviado com sucesso!.',
        placement: 'top',
        bgColor: 'green.500',
      });

      fetchGames();
    } catch (err) {
      console.log(err);
      toast.show({
        title: 'Nao foi possível enviar o seu palpite.',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 120 }}
      ListEmptyComponent={() => <EmptyMyPollList code={code} />}
    />
  );
}
