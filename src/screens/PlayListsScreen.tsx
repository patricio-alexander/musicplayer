import {FlatList, StyleSheet, Text, View} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import {useQueueStore} from '../store/queueStore';

import type {PlayListScreenProps} from '../types/ScreenTypes';
import React, {useState} from 'react';
import Input from '../components/Input';
import BoxPlayList from '../components/BoxPlayList';
import Modal from '../components/Modal';
import Title from '../components/Title';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useThemeStore} from '../store/themeStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const PlayListsScreen = ({navigation}: PlayListScreenProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [namePlayList, setNamePlayList] = useState('');
  const {theme} = useThemeStore();
  const insets = useSafeAreaInsets();

  const {
    favorites,
    playLists,
    setPlayingFavorites,
    setPlayLists,
    setPlayListId,
  } = useQueueStore();

  const addPlayList = async () => {
    const data = {
      name: namePlayList,
      tracks: [],
    };
    setPlayLists([...playLists, data]);
    await AsyncStorage.setItem(
      'playLists',
      JSON.stringify([...playLists, data]),
    );
    setNamePlayList('');
    setVisible(false);
  };

  return (
    <Container style={{paddingTop: insets.top}}>
      <Modal
        animationType="fade"
        visible={visible}
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => setVisible(false)}>
        <Title>Lista de reproducción</Title>
        <Input
          placeholder="Nombre de lista de reproducción"
          value={namePlayList}
          onChangeText={setNamePlayList}
        />
        <View style={style.modalFooter}>
          <Button
            title="Agregar"
            variant="text"
            onPress={addPlayList}
            disabled={!Boolean(namePlayList.length)}
          />
          <Button title="Cancelar" onPress={() => setVisible(false)} />
        </View>
      </Modal>
      <Container>
        <Button
          title="Agregar"
          style={{width: 100}}
          onPress={() => setVisible(true)}
        />

        <BoxPlayList
          icon="star"
          onPress={() => {
            navigation.navigate('Favorites');
          }}>
          <Title>Canciones favoritas</Title>
          <Text
            style={[
              style.badge,
              {
                color: theme.text,
              },
            ]}>
            {favorites.length}
          </Text>
        </BoxPlayList>
        <FlatList
          data={playLists}
          renderItem={({item, index}) => (
            <BoxPlayList
              key={index}
              icon="playlist-music"
              onPress={() => {
                setPlayListId(index.toString());
                navigation.navigate('CustomPlayList', {playListId: index});
              }}>
              <Title>{item.name}</Title>
              <Text
                style={[
                  style.badge,
                  {
                    color: theme.text,
                  },
                ]}>
                {item.tracks?.length}
              </Text>
            </BoxPlayList>
          )}
        />
      </Container>
    </Container>
  );
};

const style = StyleSheet.create({
  badge: {
    fontSize: 15,
    padding: 5,
    borderRadius: 100,
    position: 'absolute',
    top: 5,
    right: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `rgba(0, 0, 0, 0.4)`,
  },
  modalFooter: {
    width: '100%',
    flexDirection: 'row-reverse',
  },
});

export default PlayListsScreen;
