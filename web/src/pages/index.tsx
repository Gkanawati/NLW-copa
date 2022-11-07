import { FormEvent, useState } from 'react';
import Image from 'next/image';

import appPreviewIMg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExample from '../assets/avatars-examples.png';
import IconCheckImg from '../assets/check-icon.svg';
import { api } from '../lib/axios';

interface HomeProps {
  pollCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [pollTitle, setPollTitle] = useState('');

  async function createPoll(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/polls', {
        title: pollTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      setPollTitle('');
      alert(
        'Bolão criado com sucesso! O código foi copiado para a área de transferência'
      );
    } catch (error) {
      console.log(error);
      alert('Falha ao criar o bolão, tente novamente');
    }
  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoImg} alt='NLW COpa' />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExample} alt='' />

          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPoll} className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
            type='text'
            name='poll'
            id='poll'
            required
            placeholder='Qual o nome do seu bolão?'
            value={pollTitle}
            onChange={(event) => setPollTitle(event.target.value)}
          />
          <button
            type='submit'
            className='bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold uppercase text-sm hover:bg-yellow-700'
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className='flex justify-between items-center mt-10 pt-10 border-t border-gray-600 text-gray-100'>
          <div className='flex items-center gap-6 '>
            <Image src={IconCheckImg} alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.pollCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600'></div>
          <div className='flex items-center gap-6 '>
            <Image src={IconCheckImg} alt='' />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewIMg}
        alt='Dois celulares exibindo uma prévia da aplicação móvel do nlw'
      />
    </div>
  );
}

export const getStaticProps = async () => {
  const [pollCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('polls/count'),
      api.get('guesses/count'),
      api.get('users/count'),
    ]);

  return {
    props: {
      pollCount: pollCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
