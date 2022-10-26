import { Button, Icon, useTheme } from '@rneui/themed';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as React from 'react';

import { useLoginWithGoogle } from '../../services/api/auth/auth.hooks';
import layout from '../../styles/layout';
import spacing from '../../styles/spacing';
import { SIZING } from '../../theme/theme';
import useStyles from '../../utils/hooks/useStyles';

function GoogleSignInButton() {
  const { theme } = useTheme();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Constants.manifest?.extra?.firebaseAuthGoogleClientId,
    expoClientId: Constants.manifest?.extra?.firebaseAuthGoogleExpoClientId,
    iosClientId: Constants.manifest?.extra?.firebaseAuthGoogleIosClientId,
    androidClientId: Constants.manifest?.extra?.firebaseAuthGoogleAndroidClientId,
  });

  const loginWithGoogle = useLoginWithGoogle();

  const styles = useStyles();
  React.useEffect(() => {
    if (response?.type === 'success') {
      loginWithGoogle.mutate(response.params.id_token);
    }
  }, [response]);

  const handleLoginWithGoogle = () => {
    promptAsync();
  };

  return (
    <Button
      onPress={handleLoginWithGoogle}
      type="outline"
      buttonStyle={[spacing.py_xl, styles.borderGrey3]}
      containerStyle={spacing.mb_xl}
      titleStyle={[spacing.ml_xl, styles.textBlack]}
    >
      <Icon
        containerStyle={[
          layout.position_absolute,
          {
            left: SIZING['4xl'],
          },
        ]}
        type="ionicon"
        name="logo-google"
        color={theme.colors.google}
      />
      CONTINUE WITH GOOGLE
    </Button>
  );
}

export default GoogleSignInButton;
