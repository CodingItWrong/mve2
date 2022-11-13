import { View, Text } from 'react-native';
import { useEffect, useReducer, useState } from 'react';

import LensList from './components/LensList';
import LensFilter from './components/LensFilter';
import LoadLens from './utils/apiService';

export default function App() {
  const [selected, setSelected] = useState('All');

  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return { ...state, isLoading: true, isError: false };
      case 'FETCH_SUCCESS':
        return { ...state, isLoading: false, isError: false, data: action.payload };
      case 'FETCH_FAILURE':
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
  
      try {
        const result = await LoadLens();
        const filtered = selected === 'All' 
          ? result.data 
          : result.data.filter((iol) => iol.name.brand === selected)
        
        if (result.status === 200) {
          dispatch({ type: 'FETCH_SUCCESS', payload: filtered });
        } else {
          throw Error();
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };
    fetchData();
  }, [selected]);

  const brands = ['All', 'Alcon', 'Zeiss'];

  return (
    <View>
      <Text accessibilityRole="text">IOL Assist</Text>
      <LensFilter brands={brands} setSelected={setSelected} />
      <LensList lens={state.data} loading={state.isLoading} error={state.isError} />
    </View>
  );
}
