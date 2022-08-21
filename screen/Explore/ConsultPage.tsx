import { Avatar, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BaseCard from '../../components/BaseCard';
import BaseSearchBar from '../../components/BaseSearchBar';
import PsychiatristAvatar, {
  PsychiatristDataProp,
} from '../../components/PsychiatristAvatar';
import SectionTitle from '../../components/SectionTitle';
import ViewSeparator from '../../components/ViewSeparator';
import { psychiatristData } from '../../constant';
import { styles } from '../../theme';

const renderPsychiatristAvatar = ({ item }: { item: PsychiatristDataProp }) => (
  <PsychiatristAvatar
    name={item.name}
    experience={item.experience}
    uri={item.uri}
  />
);
function ConsultPage() {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <BaseSearchBar placeholder="Find a psychiatrist" />
      <View style={styles.containerSection}>
        <SectionTitle title="My Schedule" showRightButton />
        <BaseCard cardStyle={{ backgroundColor: theme.colors.primary }}>
          <Avatar
            size={80}
            rounded
            source={{
              uri: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          />
        </BaseCard>
        <SectionTitle title="Top psychiatrist" showRightButton />
        <FlatList
          horizontal
          ItemSeparatorComponent={ViewSeparator}
          showsHorizontalScrollIndicator={false}
          style={styles.flatListContainer}
          contentContainerStyle={styles.flatList}
          data={psychiatristData}
          renderItem={renderPsychiatristAvatar}
          keyExtractor={(item: PsychiatristDataProp) => item.name}
        />
      </View>
    </ScrollView>
  );
}
export default ConsultPage;
