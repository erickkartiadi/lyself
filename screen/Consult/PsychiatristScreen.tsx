import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Text, useTheme } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colorAlpha from 'color-alpha';
import BaseIcon from '../../components/atoms/BaseIcon';
import { styles } from '../../theme/styles';
import SectionTitle from '../../components/organisms/SectionTitle';
import { ConsultStackParamList } from '../../navigation/param.types';

export type PsychiatristScreenNavigationProps = NativeStackScreenProps<
  ConsultStackParamList,
  'Psychiatrist'
>;

function PsychiatristScreen({ route }: PsychiatristScreenNavigationProps) {
  const { experience, name, rating, specialty, uri } = route.params;
  const { theme } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollViewContainer, styles.section]}
    >
      <View style={{ backgroundColor: theme.colors.background }}>
        <Avatar
          source={{ uri }}
          size={100}
          rounded
          containerStyle={{ marginBottom: theme.spacing.lg }}
        />
        <View>
          <Text h2>{name}</Text>
          <Text subtitle1 style={{ color: theme.colors.grey3 }}>
            {specialty}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: theme.spacing.xl,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: theme.spacing.xl * 1.5,
            }}
          >
            <BaseIcon
              size={36}
              iconSize={24}
              iconType="ionicon"
              iconName="heart"
              backgroundColor={colorAlpha(theme.colors.primary, 0.25)}
              color={theme.colors.primary}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1>{`${rating}%`}</Text>
              <Text caption>rating</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: theme.spacing.xl * 1.5,
            }}
          >
            <BaseIcon
              size={36}
              iconSize={18}
              iconType="ionicon"
              iconName="briefcase"
              backgroundColor={colorAlpha(theme.colors.yellow, 0.25)}
              color={theme.colors.yellow}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1>{`${experience}`}</Text>
              <Text caption>experience</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <BaseIcon
              size={36}
              iconSize={24}
              iconType="ionicon"
              iconName="people"
              backgroundColor={colorAlpha(theme.colors.blue, 0.25)}
              color={theme.colors.blue}
              containerStyle={{ marginRight: theme.spacing.md }}
            />
            <View>
              <Text subtitle1>98</Text>
              <Text caption>patients</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <SectionTitle title="About doctor" />
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam odit,
          eveniet explicabo vel nemo cupiditate laudantium fugit dolor itaque
          est amet magnam laboriosam sed, ut fugiat minima modi. Magnam
          perspiciatis voluptates animi hic impedit mollitia obcaecati vero unde
          eligendi quia deserunt error doloribus ducimus ipsum dolorum tenetur
          amet, possimus molestiae vel omnis odio ullam? Molestiae, eius!
          Possimus, rem dicta reiciendis commodi, sint fuga velit fugit omnis
          natus corrupti delectus, veritatis facere consequuntur atque esse!
          Veniam recusandae libero praesentium sequi optio sunt, soluta laborum
          iste cumque, quia suscipit perferendis voluptatum. Fugit, facilis
          ullam ea ad neque libero cumque nostrum quo tempore obcaecati maiores
          natus deleniti dolore itaque velit porro? Deserunt quasi sapiente
          exercitationem modi officiis, ad iusto nesciunt placeat porro autem
          magni doloremque laborum quisquam labore impedit eligendi harum
          perspiciatis ipsa facere beatae voluptas. Similique numquam porro,
          amet et totam quis quasi soluta aut facilis nemo vitae odio minus
          alias quaerat fugiat ipsa laborum quidem reprehenderit beatae magnam.
          Placeat veritatis corporis, sequi ex est ipsam eligendi cupiditate
          illum repellendus quibusdam eaque voluptatem harum fugiat vero
          voluptates. Perspiciatis corporis dicta sint quae, earum id ratione
          blanditiis laudantium deleniti non. Harum, accusamus! Assumenda magnam
          eaque quam non eveniet dolorem fugit autem fugiat nesciunt aut in
          deserunt quas amet, architecto, aspernatur repudiandae nobis, cumque
          praesentium. Nulla laudantium ut eos quae ex assumenda molestiae
          pariatur fuga voluptates eligendi soluta quibusdam eaque nemo eveniet
          quisquam perspiciatis, delectus, fugit cumque enim suscipit porro.
          Earum consequuntur eius quasi velit, maiores ab voluptatum autem eum,
          alias mollitia animi distinctio aut facilis facere deleniti ad libero
          atque nemo, accusamus ullam laudantium excepturi quae inventore. Illum
          deleniti, odit ad temporibus, earum sint, reiciendis tempore non ea
          porro fuga rem nihil accusamus consectetur atque molestiae iste
          dolores voluptatum reprehenderit! Maiores, alias consequuntur esse
          itaque aliquid consectetur est nihil repellendus aperiam ratione
          possimus id ducimus doloremque maxime laboriosam ipsum, accusamus
          debitis vel deserunt modi nisi quibusdam voluptatem repellat officia?
          Fuga velit debitis eius at nihil aperiam voluptatibus incidunt rerum
          vitae iusto, temporibus sint pariatur quasi molestias natus error
          asperiores doloribus ad veritatis distinctio nesciunt illo. Aut nam
          minus exercitationem ipsa velit accusamus, quis quas nisi deserunt
          molestiae praesentium hic, fuga ab voluptatum sit fugit enim fugiat
          quibusdam perspiciatis cupiditate itaque asperiores nihil ducimus
          reiciendis. Nihil ipsam inventore voluptates voluptate? Voluptatum
          quis rem, consequatur, totam aut odit suscipit magnam optio beatae
          tenetur, possimus cum repudiandae ipsum! Impedit molestias, esse
          deleniti iure suscipit laudantium, totam maiores commodi consequuntur
          pariatur quos illo in sit harum ratione eum rem aspernatur tempora!
          Deleniti unde minus eos molestias repellendus doloribus nemo vero,
          iusto placeat voluptatum alias voluptatibus necessitatibus. Veniam
          exercitationem illum inventore? Nihil quis provident at dicta iure
          ullam libero? Corporis eveniet repudiandae cum vitae dolor nemo quam
          similique veritatis ullam! Porro dolores nemo et cumque, facere
          similique voluptatem non nesciunt tenetur rem consequatur quam nobis
          maiores omnis fugiat illum officiis sequi minus, amet ipsa, quae
          inventore mollitia placeat voluptatum. Ipsum iste natus, sed facere
          tempore blanditiis eligendi veniam deserunt beatae! Culpa maiores vel
          cumque at amet, et officia velit? Veritatis quo autem voluptates
          laudantium modi laboriosam aperiam recusandae, accusamus molestias
          totam nulla nam explicabo aliquam illum iure placeat quibusdam?
          Officiis aliquid corrupti velit molestiae, quae accusamus explicabo
          sapiente praesentium quis natus distinctio quas laudantium totam
          voluptatibus, voluptas adipisci veritatis ab at asperiores doloribus!
          Magnam culpa cupiditate quos non porro iusto modi optio, repellendus
          blanditiis, aut suscipit vel pariatur, fuga dolores. Ullam doloribus
          debitis, exercitationem expedita aut, earum amet placeat a eos
          voluptate, totam temporibus quos incidunt aspernatur suscipit
          dignissimos blanditiis. Corrupti ducimus porro eum eligendi sed nemo,
          dolores et assumenda natus ea, autem officiis quae explicabo similique
          dignissimos velit quibusdam deleniti non aut suscipit fuga nobis?
          Ipsum cupiditate, dolorum ut nulla vitae neque voluptates ea.
          Explicabo maxime animi nulla repellendus temporibus illum alias,
          tempora debitis ullam suscipit ut porro eum minima voluptas obcaecati
          placeat esse, iste ipsum voluptatem exercitationem at quasi deserunt
          tenetur? Dolor, aperiam? Eum sequi placeat voluptates amet libero vero
          cupiditate dolore, reprehenderit, nostrum distinctio impedit soluta!
          Blanditiis ipsum autem nulla corrupti, quas optio aspernatur aliquid,
          ab sed deserunt suscipit nemo? Error repellat vero obcaecati fuga
          natus minus debitis recusandae voluptas blanditiis eos vel dolore iure
          perferendis repudiandae, amet reiciendis dolorem eaque! Esse
          architecto sapiente soluta eius magnam qui. Consequuntur in saepe vel
          illum, nihil, aut ab maxime ipsam magni quas, nam aliquid. Temporibus
          sit commodi illo unde aperiam possimus dolorum ipsa magnam debitis
          vitae et consequuntur nemo fuga, sint, voluptatem incidunt ullam
          numquam repellendus magni veniam? Sit tenetur, accusamus voluptatem
          asperiores dolores deleniti ex, itaque qui ducimus dignissimos illo,
          non porro vitae nostrum iste necessitatibus earum laboriosam hic rerum
          eum unde? Laborum nihil quasi pariatur at, obcaecati blanditiis
          maiores debitis nesciunt hic velit saepe iusto esse dolores dolorem
          consequatur, eligendi fugiat impedit deleniti autem? Consequatur earum
          ipsa quaerat quos aperiam reprehenderit, alias distinctio tempore sit
          harum recusandae fugiat provident illum sed quia, ut repellat
          veritatis voluptatibus! Inventore, voluptates. Laudantium in
          accusantium excepturi hic animi libero nesciunt obcaecati eligendi at
          minus explicabo blanditiis harum nostrum iste deserunt quidem,
          mollitia alias! Facilis sunt fugit voluptatum quo eum? Enim in quod
          mollitia neque minus dicta modi tenetur, at cupiditate maiores nam.
          Modi laboriosam fugit aperiam exercitationem esse nihil ratione
          perspiciatis sapiente sed impedit rem quis accusamus officia aliquam
          sint omnis qui velit, cumque doloremque. Ad, itaque quis.
          Reprehenderit ipsum quos asperiores beatae suscipit enim autem magnam,
          quia accusamus similique aspernatur illo quisquam modi molestiae
          repellendus, saepe unde pariatur. Necessitatibus deleniti distinctio
          dicta nemo dolorem sit, quidem a quam fugiat itaque. Nobis quibusdam
          laborum a voluptas, sint distinctio adipisci velit nisi delectus quia
          repellendus minus esse doloribus eius quis debitis iure unde,
          asperiores, repellat cumque possimus totam. Officiis inventore quidem
          maiores asperiores hic. Eum cupiditate illo voluptas eaque impedit
          perferendis. Velit natus laboriosam dolor accusamus ducimus autem
          quaerat maxime, quibusdam eum voluptas excepturi obcaecati
          necessitatibus architecto aperiam eius nemo nesciunt exercitationem
          fugiat debitis suscipit possimus corporis ullam tenetur facilis!
          Accusamus libero deleniti cumque pariatur aliquid aperiam. Officia
          cupiditate blanditiis quas! Provident delectus voluptas assumenda
          ipsum sit voluptate asperiores hic.
        </Text>
      </View>
      <Button fullWidth>Make appointment</Button>
    </ScrollView>
  );
}

export default PsychiatristScreen;
