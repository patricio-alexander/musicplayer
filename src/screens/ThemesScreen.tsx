import {FlatList, StyleSheet, Text} from 'react-native';
import Container from '../components/Container';
import ListItem from '../components/ListItem';
import CheckBox from '@react-native-community/checkbox';
import {useThemeStore} from '../store/themeStore';
import {ThemeName} from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const themes = [
  {
    title: 'Default',
    key: 'default',
  },
  {
    title: 'Catppuccin',
    key: 'catppuccin',
  },
  {
    title: 'Dracula',
    key: 'dracula',
  },
  {
    title: 'Orange',
    key: 'orange',
  },
];

const ThemesScreen = () => {
  const {toggleTheme, theme, themeName} = useThemeStore();

  const handleChange = async (key: string) => {
    toggleTheme(key as ThemeName);
    await AsyncStorage.setItem('theme', key);
  };

  return (
    <Container>
      <FlatList
        style={styles.list}
        data={themes}
        renderItem={({item, index}) => (
          <ListItem key={index} onPress={() => handleChange(item.key)}>
            <CheckBox
              value={item.key === themeName}
              tintColors={{
                true: theme.accent,
                false: theme.text,
              }}
              onValueChange={() => handleChange(item.key)}
            />
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'NunitoSans_600SemiBold',
                color: theme.text,
              }}>
              {item.title}
            </Text>
          </ListItem>
        )}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 30,
  },
});

export default ThemesScreen;
