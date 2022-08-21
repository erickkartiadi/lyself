import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BaseCard from '../../components/BaseCard';
import BaseSearchBar from '../../components/BaseSearchBar';
import SectionTitle from '../../components/SectionTitle';
import { styles } from '../../theme';

function ConsultPage() {
  const { theme } = useTheme();

  return (
    <ScrollView>
      <BaseSearchBar placeholder="Find a psychiatrist" />
      <View style={styles.containerSection}>
        <SectionTitle title="My Schedule" showRightButton />
        <BaseCard cardStyle={{ backgroundColor: theme.colors.primary }}>
          <Text bold h1 style={{ color: theme.colors.white }}>
            {' '}
            Dr. Joseph Niles{' '}
          </Text>
          <Text h3 style={{ color: theme.colors.white }}>
            {' '}
            Children Psychiatry{' '}
          </Text>
          {/* <Avatar
            size={80}
            rounded
            source={{
              uri: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
          /> */}
        </BaseCard>
        {/* <SectionTitle title="Top psychiatrist" showRightButton />
        <FlatList
          horizontal
          ItemSeparatorComponent={ViewSeparator}
          showsHorizontalScrollIndicator={false}
          style={styles.flatListContainer}
          contentContainerStyle={styles.flatList}
          data={psychiatristData}
          renderItem={renderPsychiatristAvatar}
          keyExtractor={(item: PsychiatristDataProp) => item.name}
        /> */}
      </View>
    </ScrollView>
  );
}
export default ConsultPage;
