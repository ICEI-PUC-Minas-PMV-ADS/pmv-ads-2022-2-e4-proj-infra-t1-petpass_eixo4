import create from 'zustand';

const useData = create((set) => ({
  data:{
    user: {
      id: 1,
      nome: '',
      email: '',
    },

  },
  setData: (data) =>
    set((state) => ({
      ...state,
      data,
    })),
}));

export default useData;