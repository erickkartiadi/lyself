import { Button, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PsychiatristAvatar, {
  PsychiatristDataProp,
} from '../../components/PsychiatristAvatar';
import ViewSeparator from '../../components/ViewSeparator';
import { psychiatristData } from '../../constant';
import { styles } from '../../theme';
import { comingSoonToast } from '../../utils/comingSoonToast';

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
      <View style={styles.containerSection}>
        <Text style={{ marginBottom: theme.spacing.xl }}>
          <Text h1>Find trustworthy</Text>
          <Text h1 style={{ color: theme.colors.primary }}>
            {'\n'}Psychiatrist
          </Text>
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.xl,
            alignItems: 'center',
          }}
        >
          <Text h4>Top-rated psychiatrist</Text>
          <Button
            type="clear"
            title="See all"
            iconPosition="right"
            onPress={comingSoonToast}
            icon={{
              name: 'chevron-forward',
              type: 'ionicon',
              size: 21,
              color: theme.colors.primary,
            }}
            buttonStyle={{
              padding: 0,
              margin: 0,
              paddingHorizontal: 0,
              paddingEnd: 8,
            }}
            radius={99}
          />
        </View>
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
