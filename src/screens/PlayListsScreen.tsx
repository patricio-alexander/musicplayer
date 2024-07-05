import {FlatList, StyleSheet, Text, View} from 'react-native';
import Container from '../components/Container';
import {COLORS} from '../constants/Colors';
import Button from '../components/Button';
import {useQueueStore} from '../store/queueStore';

import type {PlayListScreenProps} from '../types/ScreenTypes';
import React, {useEffect, useState} from 'react';
import Input from '../components/Input';
import BoxPlayList from '../components/BoxPlayList';
import Modal from '../components/Modal';
import Title from '../components/Title';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayListsScreen = ({navigation}: PlayListScreenProps) => {
  const favorites = useQueueStore(state => state.favorites);
  const [visible, setVisible] = useState<boolean>(false);
  const [namePlayList, setNamePlayList] = useState('');
  const playLists = useQueueStore(state => state.playLists);
  const setPlayLists = useQueueStore(state => state.setPlayLists);

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
    <>
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
          icon="heart"
          onPress={() => navigation.navigate('Favorites')}>
          <Text style={style.title}>Canciones favoritas</Text>
          <Text style={style.badge}>{favorites.length}</Text>
        </BoxPlayList>
        <FlatList
          data={playLists}
          renderItem={({item, index}) => (
            <BoxPlayList
              key={index}
              icon="music"
              onPress={() =>
                navigation.navigate('CustomPlayList', {playListId: index})
              }>
              <Text style={style.title}>{item.name}</Text>
              <Text style={style.badge}>{item.tracks?.length}</Text>
            </BoxPlayList>
          )}
        />
      </Container>
    </>
  );
};

const style = StyleSheet.create({
  playListContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    margin: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.chardonnay[300],
    position: 'relative',
  },
  title: {
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.chardonnay[300],
  },
  badge: {
    fontSize: 15,
    padding: 5,
    borderRadius: 100,
    position: 'absolute',
    color: COLORS.chardonnay[300],
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
