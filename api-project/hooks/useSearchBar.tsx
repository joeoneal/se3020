import { useRouter } from 'expo-router';

const useSearchBar = (searchTerm, activeFilter) => {
  const router = useRouter();

  const handleSearchPress = () => {
    if (!searchTerm.trim()) {
      return; 
    }

    router.push({
      pathname: '/results',
      params: {
        term: searchTerm,
        filter: activeFilter,
      },
    });


  };


  return handleSearchPress;
};

export default useSearchBar;