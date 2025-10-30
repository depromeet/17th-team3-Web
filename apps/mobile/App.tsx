import { useRef } from 'react';

import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const WEB_APP_URL = process.env.EXPO_PUBLIC_WEB_URL;

const App = () => {
  const webViewRef = useRef<WebView>(null);

  const handleShouldStartLoadWithRequest = (request: any) => {
    const { url } = request;

    // 웹앱 URL, 카카오 로그인 관련 웹뷰 처리
    if (
      url.startsWith(WEB_APP_URL) ||
      url.includes('kauth.kakao.com') ||
      url.includes('accounts.kakao.com')
    ) {
      return true;
    }

    // 그 외 외부 링크는 기본 브라우저에서 처리
    Linking.openURL(url);
    return false;
  };

  const handleWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView load error:', nativeEvent);

    if (webViewRef.current) {
      webViewRef.current.stopLoading?.();

      // 에러 페이지로 이동
      const errorUrl = `${WEB_APP_URL}/error`;

      webViewRef.current.reload?.();
      webViewRef.current.injectJavaScript?.(`
        window.location.href = "${errorUrl}";
        true;
      `);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: WEB_APP_URL }}
          style={styles.webview}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          keyboardDisplayRequiresUserAction={false}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled={true}
          sharedCookiesEnabled={true}
          incognito={false}
          cacheEnabled={true}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // TODO: 변경 필요!
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
