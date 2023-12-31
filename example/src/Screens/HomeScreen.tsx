import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackParamList } from './Screens.types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import PayButtonView, {
  ColorStyle,
  Edges,
  Locale,
  TapCurrencyCode,
  Theme,
  type Config,
  AuthorizeType,
  Scope,
  PayButtonType,
} from 'pay-button-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

function HomeScreen({ navigation }: Props) {
  const [config, setConfigState] = useState<Config>({
    buttonType: PayButtonType.Benefit,
    merchant: {
      id: '',
    },
    transaction: {
      authentication: true,
      authorize: {
        type: AuthorizeType.Void,
        time: 12,
      },
      paymentAgreement: {
        id: '',
        contract: { id: '' },
      },
      reference: '',
      metadata: {},
    },
    order: {
      reference: '',
      amount: 1,
      currency: TapCurrencyCode.SAR,
      description: '',
      id: '',
      metadata: {},
    },
    invoice: {
      id: 'Map to authenticate.reference.invoice',
    },
    post: {
      url: 'Map to authenticate.reference.post',
    },
    operator: {
      publicKey: 'pk_test_6jdl4Qo0FYOSXmrZTR1U5EHp',
      hashString: '',
    },
    customer: {
      editable: true,
      id: '',
      name: [
        {
          first: 'Tap',
          lang: Locale.en,
          middle: 'Company',
          last: 'Payments',
        },
      ],
      contact: {
        phone: {
          number: '88888888',
          countryCode: '+965',
        },
        email: 'tappayments@tap.company',
      },
    },
    interface: {
      loader: true,
      locale: Locale.en,
      theme: Theme.dark,
      edges: Edges.curved,
      colorStyle: ColorStyle.colored,
      powered: true,
    },
    scope: Scope.Charge,
  });

  const [response, setResponse] = useState<String>('');

  React.useEffect(() => {
    setResponse('');
    setResponse(`config${JSON.stringify(config, null, 2)}`);
  }, [config]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PayButtonView
          onSuccess={(tokenValue) => {
            setResponse(
              `${response} \n =====onSuccessStart==== \n ${JSON.stringify(
                tokenValue,
                null,
                2
              )} \n =====onSuccessEnd===== \n`
            );
          }}
          style={{ width: '100%' }}
          config={config}
          onReady={() => {
            setResponse(
              `${response} \n =====onReady==== \n onReady \n =====onReady===== \n`
            );
          }}
          onCanceled={() => {
            setResponse(
              `${response} \n =====onCanceled==== \n onCanceled \n =====onCanceled===== \n`
            );
          }}
          onClicked={() => {
            setResponse(
              `${response} \n =====onClicked==== \n onClicked \n =====onClicked===== \n`
            );
          }}
          onChargeCreated={(binIdentification: Object) => {
            setResponse(
              `${response} \n =====onChargeCreated==== \n ${JSON.stringify(
                binIdentification,
                null,
                2
              )} \n =====onChargeCreated===== \n`
            );
          }}
          onOrderCreated={(binIdentification: Object) => {
            setResponse(
              `${response} \n =====onOrderCreated==== \n ${JSON.stringify(
                binIdentification,
                null,
                2
              )} \n =====onOrderCreated===== \n`
            );
          }}
          onError={(error: object) => {
            setResponse(
              `${response} \n =====onErrorStart==== \n ${JSON.stringify(
                error,
                null,
                2
              )} \n =====onErrorEnd===== \n`
            );
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ConfigScreen', {
              config,
              setConfig: setConfigState,
            });
          }}
        >
          <Text style={{ color: 'black' }}>Config SDK</Text>
        </TouchableOpacity>
        <ScrollView>
          <Text style={{ color: 'black' }}>{response}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
