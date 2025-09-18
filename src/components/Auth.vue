<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script setup>
import { onMounted, defineComponent, getCurrentInstance } from 'vue';
import * as firebaseui from 'firebaseui';
import {GoogleAuthProvider, EmailAuthProvider} from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';

onMounted(() => {
  const instance = getCurrentInstance();
  const firebaseAuth = instance?.appContext.config.globalProperties.$firebaseAuth;
  const ui = new firebaseui.auth.AuthUI(firebaseAuth);
  const uiConfig = {
    signInSuccessUrl: '/', // URL to redirect to after a successful sign-in
    signInOptions: [
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        providerName: 'Google',
        // For emulator, disable One Tap and set custom parameters if needed
        customParameters: {
          // Example: prompt: 'select_account'
        }
      },
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        providerName: 'Email',
        // For emulator, you may want to enable email link sign-in for testing
        signInMethod: 'password'
      }
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE, // Avoids popup issues with emulators
    // Optionally, you can set tosUrl and privacyPolicyUrl to localhost/test URLs for emulator
  };
  // The start method will wait for the DOM to be loaded
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>

<script>
export default defineComponent({
  name: 'AuthWidget'
});
</script>