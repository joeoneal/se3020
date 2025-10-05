export interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  }
  
  const White: Theme = {
    dark: false,
    colors: {
      primary: '#007AFF',
      background: '#FFFFFF',
      card: '#F5F5F5',
      text: '#1C1C1E',
      border: '#D8D8D8',
      notification: '#FF3B30',
    },
  };
  
  const Black: Theme = {
    dark: true,
    colors: {
      primary: '#0A84FF',
      background: '#000000',
      card: '#1C1C1E',
      text: '#E5E5E7',
      border: '#2C2C2E',
      notification: '#FF453A',
    },
  };
  
  const Grey: Theme = {
    dark: true,
    colors: {
      primary: '#58A6FF',
      background: '#333333',
      card: '#444444',
      text: '#E0E0E0',
      border: '#555555',
      notification: '#FF6B6B',
    },
  };
  
  const Green: Theme = {
    dark: true,
    colors: {
      primary: '#34C759',
      background: '#013220',
      card: '#02402C',
      text: '#E6F8F0',
      border: '#03593C',
      notification: '#FF9500',
    },
  };
  
  const Blue: Theme = {
    dark: true,
    colors: {
      primary: '#3399FF',
      background: '#001F3F',
      card: '#003366',
      text: '#D6EAF8',
      border: '#004C99',
      notification: '#FF7F50',
    },
  };
  
  const Red: Theme = {
    dark: true,
    colors: {
      primary: '#D90429',
      background: '#5E0B15',
      card: '#720B15',
      text: '#F8E0E3',
      border: '#8C1C13',
      notification: '#FFC300',
    },
  };
  
  export const themes = {
    White,
    Black,
    Grey,
    Green,
    Blue,
    Red,
  };