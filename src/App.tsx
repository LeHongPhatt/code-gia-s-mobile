import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PortalProvider } from '@gorhom/portal';
import { CallPhone, SafeAreaStatusBar } from 'components';
import { CartProvider } from 'context';
import i18n from 'i18n';
import moment from 'moment';
import 'moment/locale/vi';
import { Navigator } from 'navigation';
import React, { Suspense, useRef } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { configStore } from 'store/createStore';
import { BaseStyle } from 'theme';
import { momentConfig } from 'utils';
const { store, persistor } = configStore();
import { PersistGate } from 'redux-persist/integration/react';
moment.updateLocale('vi', momentConfig);
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const App = () => {
  const modalCallPhone = useRef(null);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaStatusBar backgroundColor="transparent" />
      <Provider store={store}>
        <GestureHandlerRootView style={BaseStyle.flex1}>
          <PortalProvider>
            <PaperProvider theme={theme}>
              <I18nextProvider i18n={i18n}>
                <Suspense fallback={null}>
                  <BottomSheetModalProvider>
                    <PersistGate loading={null} persistor={persistor}>
                      <CartProvider>
                        <Navigator />
                        <Toast />
                      </CartProvider>
                    </PersistGate>
                  </BottomSheetModalProvider>
                </Suspense>
              </I18nextProvider>
            </PaperProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </Provider>
      <CallPhone ref={modalCallPhone} />
    </SafeAreaProvider>
  );
};

export default App;
