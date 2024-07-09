import {FlatList, StyleSheet} from 'react-native';
import Container from '../components/Container';
import Title from '../components/Title';
import ListItem from '../components/ListItem';
import CheckBox from '@react-native-community/checkbox';
import {useEffect, useState} from 'react';
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
                true: theme.tertiary,
                false: theme.primary,
              }}
              onValueChange={() => handleChange(item.key)}
            />
            <Title>{item.title}</Title>
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
