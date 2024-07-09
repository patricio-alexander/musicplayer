import SettingItem from '../components/SettingItem';
import Container from '../components/Container';
import {SettingsScreenProps} from '../types/ScreenTypes';

export default function Settings({navigation}: SettingsScreenProps) {
  return (
    <Container>
      <SettingItem
        iconName="palette"
        title="Temas"
        onPress={() => navigation.navigate('Themes')}
      />
    </Container>
  );
}
