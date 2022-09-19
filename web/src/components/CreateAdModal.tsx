import { FormEvent, useEffect, useState } from 'react';

import { Check, GameController } from 'phosphor-react';
import axios from 'axios';

import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Dialog from '@radix-ui/react-dialog';

import { Input } from './Form/Input';
import { Select } from './Form/Select';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  useEffect(() => {
    axios.get<Game[]>('http://localhost:3333/games').then(response => setGames(response.data));
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    console.log(data);
    console.log(Number(data.yearsPlaying));

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: data.useVoiceChannel === 'on',
      });

      alert('Anúncio criado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao criar o anúncio!');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[488px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form
          className="mt-8 flex flex-col gap-4"
          onSubmit={handleCreateAd}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select
              name="game"
              title="Game"
              placeholder="Selecione o game que deseja jogar"
              options={games.map(game => ({
                value: game.id,
                label: game.title,
              }))}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)?</label>
            <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">Joga há quantos anos?</label>
              <Input name="yearsPlaying" id="yeasPlaying" type="number" placeholder="Tudo bem ser zero" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
              <Input name="discord" id="discord" placeholder="Usuario#0000" />
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={value => setWeekDays(value)}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className="w-8 h-8 rounded bg-zinc-900 radix-state-on:bg-violet-500"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className="font-semibold">Qual horário do dia?</label>
              
              <div className="grid grid-cols-2 gap-1">
                <Input type="time" name="hourStart" id="hourStart" placeholder="De" />
                <Input type="time" name="hourEnd" id="hourEnd" placeholder="Até" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900" name="useVoiceChannel">
              <Checkbox.Indicator>
                <Check className="w-4 h-3 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>

            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold">Cancelar</Dialog.Close>

            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}