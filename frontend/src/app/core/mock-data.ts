export interface Exercicio {
  id: number;
  nome: string;
  grupo: string;
  equipamento: string;
}

export interface ExercicioFicha {
  exercicioId: number;
  nome: string;
  grupo: string;
  series: number;
  repeticoes: string;
}

export interface Ficha {
  id: string;
  nome: string;
  descricao: string;
  grupos: string[];
  exercicios: ExercicioFicha[];
}

export interface RegistroSerie {
  numero: number;
  peso: number;
  repeticoes: number;
  ultimo: string;
  concluida: boolean;
}

export interface RegistroExercicio {
  nome: string;
  grupo: string;
  series: RegistroSerie[];
}

export interface TreinoRealizado {
  id: number;
  data: string;
  duracao: number;
  ficha: string;
  volume: number;
  exercicios: { nome: string; series: number; carga: number; repeticoes: number }[];
}

export interface Recorde {
  exercicio: string;
  tipo: string;
  valor: string;
  data: string;
}

export const MOCK_EXERCICIOS: Exercicio[] = [
  { id: 1, nome: 'Supino reto', grupo: 'Peito', equipamento: 'Barra' },
  { id: 2, nome: 'Supino inclinado', grupo: 'Peito', equipamento: 'Halteres' },
  { id: 3, nome: 'Agachamento livre', grupo: 'Pernas', equipamento: 'Barra' },
  { id: 4, nome: 'Leg press', grupo: 'Pernas', equipamento: 'Máquina' },
  { id: 5, nome: 'Barra fixa', grupo: 'Costas', equipamento: 'Barra' },
  { id: 6, nome: 'Remada baixa', grupo: 'Costas', equipamento: 'Máquina' },
  { id: 7, nome: 'Desenvolvimento de ombros', grupo: 'Ombros', equipamento: 'Halteres' },
  { id: 8, nome: 'Elevação lateral', grupo: 'Ombros', equipamento: 'Halteres' },
  { id: 9, nome: 'Tríceps no pulley', grupo: 'Braços', equipamento: 'Cabo' },
  { id: 10, nome: 'Rosca direta', grupo: 'Braços', equipamento: 'Barra' },
  { id: 11, nome: 'Prancha', grupo: 'Abdômen', equipamento: 'Peso corporal' },
  { id: 12, nome: 'Abdominal máquina', grupo: 'Abdômen', equipamento: 'Máquina' },
];

export const MOCK_FICHAS: Ficha[] = [
  {
    id: 'a',
    nome: 'Ficha A',
    descricao: 'Peito, ombros e tríceps',
    grupos: ['Peito', 'Ombros', 'Braços'],
    exercicios: [
      { exercicioId: 1, nome: 'Supino reto', grupo: 'Peito', series: 4, repeticoes: '8-10' },
      { exercicioId: 2, nome: 'Supino inclinado', grupo: 'Peito', series: 3, repeticoes: '10-12' },
      { exercicioId: 7, nome: 'Desenvolvimento de ombros', grupo: 'Ombros', series: 3, repeticoes: '10' },
      { exercicioId: 8, nome: 'Elevação lateral', grupo: 'Ombros', series: 3, repeticoes: '12-15' },
      { exercicioId: 9, nome: 'Tríceps no pulley', grupo: 'Braços', series: 3, repeticoes: '12' },
    ],
  },
  {
    id: 'b',
    nome: 'Ficha B',
    descricao: 'Costas e bíceps',
    grupos: ['Costas', 'Braços'],
    exercicios: [
      { exercicioId: 5, nome: 'Barra fixa', grupo: 'Costas', series: 4, repeticoes: '6-8' },
      { exercicioId: 6, nome: 'Remada baixa', grupo: 'Costas', series: 4, repeticoes: '10' },
      { exercicioId: 10, nome: 'Rosca direta', grupo: 'Braços', series: 3, repeticoes: '12' },
    ],
  },
  {
    id: 'c',
    nome: 'Ficha C',
    descricao: 'Pernas e abdômen',
    grupos: ['Pernas', 'Abdômen'],
    exercicios: [
      { exercicioId: 3, nome: 'Agachamento livre', grupo: 'Pernas', series: 4, repeticoes: '6-8' },
      { exercicioId: 4, nome: 'Leg press', grupo: 'Pernas', series: 3, repeticoes: '12' },
      { exercicioId: 11, nome: 'Prancha', grupo: 'Abdômen', series: 3, repeticoes: '40s' },
      { exercicioId: 12, nome: 'Abdominal máquina', grupo: 'Abdômen', series: 3, repeticoes: '15' },
    ],
  },
  {
    id: 'd',
    nome: 'Ficha D',
    descricao: 'Treino completo leve',
    grupos: ['Peito', 'Costas', 'Pernas'],
    exercicios: [
      { exercicioId: 1, nome: 'Supino reto', grupo: 'Peito', series: 3, repeticoes: '10' },
      { exercicioId: 6, nome: 'Remada baixa', grupo: 'Costas', series: 3, repeticoes: '12' },
      { exercicioId: 4, nome: 'Leg press', grupo: 'Pernas', series: 3, repeticoes: '12' },
    ],
  },
];

export const MOCK_SESSAO: RegistroExercicio[] = [
  {
    nome: 'Supino reto',
    grupo: 'Peito',
    series: [
      { numero: 1, peso: 60, repeticoes: 10, ultimo: '60 kg × 10', concluida: true },
      { numero: 2, peso: 62.5, repeticoes: 9, ultimo: '60 kg × 9', concluida: true },
      { numero: 3, peso: 62.5, repeticoes: 8, ultimo: '60 kg × 8', concluida: false },
      { numero: 4, peso: 60, repeticoes: 8, ultimo: '58 kg × 8', concluida: false },
    ],
  },
  {
    nome: 'Supino inclinado',
    grupo: 'Peito',
    series: [
      { numero: 1, peso: 22, repeticoes: 12, ultimo: '20 kg × 12', concluida: false },
      { numero: 2, peso: 22, repeticoes: 10, ultimo: '20 kg × 10', concluida: false },
      { numero: 3, peso: 20, repeticoes: 10, ultimo: '20 kg × 10', concluida: false },
    ],
  },
  {
    nome: 'Desenvolvimento de ombros',
    grupo: 'Ombros',
    series: [
      { numero: 1, peso: 16, repeticoes: 10, ultimo: '14 kg × 10', concluida: false },
      { numero: 2, peso: 16, repeticoes: 9, ultimo: '14 kg × 9', concluida: false },
      { numero: 3, peso: 14, repeticoes: 10, ultimo: '14 kg × 10', concluida: false },
    ],
  },
  {
    nome: 'Elevação lateral',
    grupo: 'Ombros',
    series: [
      { numero: 1, peso: 8, repeticoes: 15, ultimo: '8 kg × 15', concluida: false },
      { numero: 2, peso: 8, repeticoes: 14, ultimo: '8 kg × 12', concluida: false },
      { numero: 3, peso: 7, repeticoes: 15, ultimo: '7 kg × 15', concluida: false },
    ],
  },
  {
    nome: 'Tríceps no pulley',
    grupo: 'Braços',
    series: [
      { numero: 1, peso: 25, repeticoes: 12, ultimo: '22 kg × 12', concluida: false },
      { numero: 2, peso: 25, repeticoes: 12, ultimo: '22 kg × 12', concluida: false },
      { numero: 3, peso: 22, repeticoes: 12, ultimo: '20 kg × 12', concluida: false },
    ],
  },
];

export const MOCK_SESSOES: TreinoRealizado[] = [
  {
    id: 1, data: '16/11/2026', duracao: 54, ficha: 'Ficha A', volume: 8420,
    exercicios: [
      { nome: 'Supino reto', series: 4, carga: 60, repeticoes: 9 },
      { nome: 'Supino inclinado', series: 3, carga: 20, repeticoes: 11 },
      { nome: 'Desenvolvimento de ombros', series: 3, carga: 14, repeticoes: 10 },
      { nome: 'Tríceps no pulley', series: 3, carga: 22, repeticoes: 12 },
    ],
  },
  {
    id: 2, data: '13/11/2026', duracao: 61, ficha: 'Ficha C', volume: 12480,
    exercicios: [
      { nome: 'Agachamento livre', series: 4, carga: 80, repeticoes: 7 },
      { nome: 'Leg press', series: 3, carga: 140, repeticoes: 12 },
      { nome: 'Prancha', series: 3, carga: 0, repeticoes: 40 },
    ],
  },
  {
    id: 3, data: '11/11/2026', duracao: 48, ficha: 'Ficha B', volume: 6980,
    exercicios: [
      { nome: 'Barra fixa', series: 4, carga: 0, repeticoes: 7 },
      { nome: 'Remada baixa', series: 4, carga: 55, repeticoes: 10 },
      { nome: 'Rosca direta', series: 3, carga: 20, repeticoes: 12 },
    ],
  },
  {
    id: 4, data: '09/11/2026', duracao: 57, ficha: 'Ficha A', volume: 8110,
    exercicios: [
      { nome: 'Supino reto', series: 4, carga: 58, repeticoes: 9 },
      { nome: 'Supino inclinado', series: 3, carga: 20, repeticoes: 10 },
      { nome: 'Elevação lateral', series: 3, carga: 8, repeticoes: 14 },
    ],
  },
  {
    id: 5, data: '06/11/2026', duracao: 63, ficha: 'Ficha C', volume: 11950,
    exercicios: [
      { nome: 'Agachamento livre', series: 4, carga: 75, repeticoes: 8 },
      { nome: 'Leg press', series: 3, carga: 130, repeticoes: 12 },
      { nome: 'Abdominal máquina', series: 3, carga: 30, repeticoes: 15 },
    ],
  },
];

export const MOCK_RECORDES: Recorde[] = [
  { exercicio: 'Agachamento livre', tipo: 'Maior carga', valor: '85 kg', data: '13/11/2026' },
  { exercicio: 'Supino reto', tipo: 'Maior carga', valor: '65 kg', data: '16/11/2026' },
  { exercicio: 'Leg press', tipo: 'Maior volume', valor: '5.040 kg', data: '13/11/2026' },
  { exercicio: 'Prancha', tipo: 'Maior tempo', valor: '50 s', data: '06/11/2026' },
];

export const MOCK_EVOLUCAO_CARGA: number[] = [62, 66, 64, 70, 68, 75, 73, 80, 78, 84, 82, 88];

export const MOCK_VOLUME_SEMANAL = [
  { rotulo: 'Sem 1', valor: 18420 },
  { rotulo: 'Sem 2', valor: 21150 },
  { rotulo: 'Sem 3', valor: 19800 },
  { rotulo: 'Sem 4', valor: 24310 },
  { rotulo: 'Sem 5', valor: 26870 },
];
