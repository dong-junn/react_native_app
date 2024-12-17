import { useTheme } from '../context/ThemeContext';

export const useThemedStyles = () => {
  const { isDarkMode } = useTheme();

  const theme = {
    colors: {
      background: isDarkMode ? '#121212' : '#FFFFFF',
      card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#000000',
      textSecondary: isDarkMode ? '#B0B0B0' : '#666666',
      border: isDarkMode ? '#2D2D2D' : '#E0E0E0',
      primary: '#2196F3',
    }
  };

  return theme;
}; 