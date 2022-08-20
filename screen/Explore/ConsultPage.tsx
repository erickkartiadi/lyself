import React from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
  return (
    <ScrollView>
      <BaseSearchBar placeholder="Find a psychiatrist" />
      <View style={styles.containerSection}>
        <SectionTitle title="My Schedule" />
        <SectionTitle title="Top psychiatrist" showRightButton />
        <View
          style={[
            styles.noContainerOffset,
            {
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
          ]}
        >
          <FlatList
            horizontal
            ItemSeparatorComponent={ViewSeparator}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
            data={psychiatristData}
            renderItem={renderPsychiatristAvatar}
            keyExtractor={(item: PsychiatristDataProp) => item.name}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default ConsultPage;
