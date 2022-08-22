import { Icon } from '@rneui/base';
import { Avatar, Text, useTheme } from '@rneui/themed';
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
              size="medium"
              rounded
              containerStyle={{ marginRight: theme.spacing.xl }}
              source={{
                uri: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                h4
                h4Style={{
                  color: theme.colors.white,
                  marginTop: theme.spacing.xs * -1,
                  marginBottom: theme.spacing.xs,
                }}
              >
                Dr. Mona Lisa
              </Text>
              <Text
                caption
                style={{
                  color: theme.colors.white,
                }}
              >
                Children Psychiatry{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.background,
                borderRadius: 100,
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.lg,
                marginTop: theme.spacing.xl,
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
