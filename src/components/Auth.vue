<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script setup>
import { onMounted, defineComponent, getCurrentInstance } from 'vue';
import * as firebaseui from 'firebaseui';
import {GoogleAuthProvider} from 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import { inject } from 'vue';

const firebaseAuth = inject('auth');
const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);
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
      }
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE, // Avoids popup issues with emulators
    // Optionally, you can set tosUrl and privacyPolicyUrl to localhost/test URLs for emulator
  };
onMounted(() => {
  // The start method will wait for the DOM to be loaded
  ui.start('#firebaseui-auth-container', uiConfig);
});
</script>