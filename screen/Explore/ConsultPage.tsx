import { Icon } from '@rneui/base';
import { Avatar, Text, useTheme } from '@rneui/themed';
import React, { useContext } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BaseCard from '../../components/BaseCard';
import BaseSearchBar from '../../components/BaseSearchBar';
import SectionTitle from '../../components/SectionTitle';
import { styles } from '../../theme';
import { ThemeModeContext } from '../../theme/ThemeModeContext';

function ConsultPage() {
  const { theme } = useTheme();
  const { isDarkMode } = useContext(ThemeModeContext);

  return (
    <ScrollView>
      <BaseSearchBar placeholder="Find a psychiatrist" />
      <View style={styles.containerSection}>
        <SectionTitle title="My Schedule" showRightButton />
        <BaseCard
          cardStyle={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar
              size={60}
              rounded
              avatarStyle={{ borderRadius: theme.spacing.md }}
              containerStyle={{ marginRight: theme.spacing.xl }}
              source={{
                uri: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
            />
            <View style={{ flex: 1 }}>
              <Text h4 bold h4Style={{ color: theme.colors.white }}>
                Dr. Mona Lisa
              </Text>
              <Text
                subtitle1
                style={{
                  color: isDarkMode
                    ? 'rgba(0, 0, 0, 0.75)'
                    : 'rgba(255, 255, 255, 0.75)',
                }}
              >
                Children Psychiatry{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: theme.spacing.xl,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: isDarkMode
                  ? 'rgba(0, 0, 0, 0.5)'
                  : 'rgba(255, 255, 255, 0.5)',
                borderRadius: theme.spacing.md,
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.lg,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Icon
                type="ionicon"
                name="time-outline"
                containerStyle={{ marginRight: theme.spacing.sm }}
              />
              <Text
                caption
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginBottom: 1,
                }}
              >
                Tuesday, 22 August at 9:25 - 11:00 AM
              </Text>
            </View>
          </View>
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
