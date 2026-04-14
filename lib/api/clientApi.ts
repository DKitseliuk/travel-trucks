import { api } from './api';

const getCampers = async () => {
  const { data } = await api.get('/campers', {
    params: {
      p: 1,
      l: 4,
    },
  });
  return data.items;
};

export { getCampers };
