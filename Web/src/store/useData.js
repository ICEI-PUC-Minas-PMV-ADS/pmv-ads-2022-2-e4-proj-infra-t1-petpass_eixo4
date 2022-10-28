import create from 'zustand';

const useData = create((set) => ({
  data:{
    user: {
      id: '',
      nome: '',
      email: '',
    },
    pet: [{
      id: 1,
      nomePet: 'Bethoven',
      tipo: 'Cachorro',
      sexo: 'Macho',
      raca: 'Maltês',
      idade: 5,
      vacina:[{}]
    }]
  },
  setData: (data) =>
    set((state) => ({
      ...state,
      data,
    })),
}));

export default useData;