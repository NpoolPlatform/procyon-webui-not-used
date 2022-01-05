<template>
  <div id="main">
    <div class="content faq">
      <div id="hero">
        <h1>{{ $t('faq.A') }} &amp; {{ $t('faq.B') }}</h1>
        <h2>
          {{ $t('faq.C') }}
          <a href="mailto:support@procyon.vip">{{ $t('faq.Contact') }}</a
          >{{ $t('faq.ContactComma') }}
        </h2>
        <h2>
          {{ $t('faq.Contactt')
          }}<a href="https://lin.ee/g4JEj66"
            ><img
              src="https://scdn.line-apps.com/n/line_add_friends/btn/ja.png"
              alt="友だち追加"
              height="36"
              border="0"
              style="margin-left: 8px; vertical-align: text-top"
          /></a>
        </h2>
      </div>

      <h2>{{ $t('faq.Header1.Title') }}</h2>

      <h3>{{ $t('faq.Header1.Q6') }}</h3>

      <p>{{ $t('faq.Header1.A6') }}</p>

      <h3>{{ $t('faq.Header1.Q7') }}</h3>

      <p>{{ $t('faq.Header1.A7') }}</p>

      <h2>{{ $t('faq.Header2.Title') }}</h2>

      <h3>{{ $t('faq.Header2.Q1') }}</h3>

      <p>{{ $t('faq.Header2.A1') }}</p>
      <p>{{ $t('faq.Header2.A11') }}</p>

      <h3>{{ $t('faq.Header2.Q2') }}</h3>

      <p>{{ $t('faq.Header2.A2') }}</p>

      <h3>{{ $t('faq.Header2.Q3') }}</h3>

      <p>
        {{ $t('faq.Header2.A3') }}
        <a href="mailto:support@procyon.vip">support@procyon.vip</a>
        {{ $t('faq.Header2.A4') }}
      </p>

      <h2>{{ $t('faq.Header3.Title') }}</h2>

      <h3>{{ $t('faq.Header3.Q1') }}</h3>

      <p>{{ $t('faq.Header3.A1') }}</p>

      <h3>{{ $t('faq.Header3.Q2') }}</h3>

      <p>
        {{ $t('faq.Header3.A2') }}
        <a href="mailto:support@procyon.vip">support@procyon.vip</a
        >{{ $t('faq.Header3.A22') }}
      </p>

      <h3>{{ $t('faq.Header3.Q3') }}</h3>

      <p>{{ $t('faq.Header3.A3') }}</p>

      <h2>{{ $t('faq.Header4.Title') }}</h2>

      <h3>{{ $t('faq.Header4.Q1') }}</h3>

      <p>{{ $t('faq.Header4.A1') }}</p>

      <p>{{ $t('faq.Header4.A2') }}</p>
      <ul>
        <li>{{ $t('faq.Header4.A3') }}</li>
        <li>{{ $t('faq.Header4.A4') }}</li>
        <li>{{ $t('faq.Header4.A5') }}</li>
      </ul>

      <h3>{{ $t('faq.Header4.Q2') }}</h3>

      <p>{{ $t('faq.Header4.A5') }}</p>

      <p>{{ $t('faq.Header4.A6') }}</p>

      <h3>{{ $t('faq.Header4.Q3') }}</h3>

      <p>{{ $t('faq.Header4.A7') }}</p>

      <p>{{ $t('faq.Header4.A8') }}</p>

      <p>{{ $t('faq.Header4.A9') }}</p>

      <p>{{ $t('faq.Header4.A10') }}</p>

      <h3>{{ $t('faq.Header4.Q4') }}</h3>

      <p>{{ $t('faq.Header4.A111') }}</p>
      <p>{{ $t('faq.Header4.A112') }}</p>
      <p>{{ $t('faq.Header4.A113') }}</p>
      <p>{{ $t('faq.Header4.A114') }}</p>
      <p>{{ $t('faq.Header4.A115') }}</p>
      <p>{{ $t('faq.Header4.A116') }}</p>
      <p>{{ $t('faq.Header4.A117') }}</p>
      <p>{{ $t('faq.Header4.A118') }}</p>
      <p>{{ $t('faq.Header4.A119') }}</p>
      <p>{{ $t('faq.Header4.A120') }}</p>
      <p>{{ $t('faq.Header4.A121') }}</p>
      <p>{{ $t('faq.Header4.A122') }}</p>

      <h3>{{ $t('faq.Header4.Q5') }}</h3>

      <p>{{ $t('faq.Header4.A12') }}</p>

      <h3>{{ $t('faq.Header4.Q6') }}</h3>

      <p>{{ $t('faq.Header4.A13') }}</p>

      <h2>{{ $t('faq.Header5.Title') }}</h2>

      <h3>{{ $t('faq.Header5.Q1') }}</h3>

      <p>{{ $t('faq.Header5.A1') }}</p>

      <p>{{ $t('faq.Header5.A2') }}</p>

      <h3>{{ $t('faq.Header5.Q2') }}</h3>

      <p>{{ $t('faq.Header5.A3') }}</p>

      <h3>{{ $t('faq.Header5.Q3') }}</h3>

      <p>{{ $t('faq.Header5.A4') }}</p>

      <p>{{ $t('faq.Header5.A5') }}</p>

      <h3>{{ $t('faq.Header5.Q4') }}</h3>

      <p>{{ $t('faq.Header5.A6') }}</p>

      <h3>{{ $t('faq.Header5.Q5') }}</h3>

      <p>{{ $t('faq.Header5.A7') }}</p>

      <h3>{{ $t('faq.Header5.Q6') }}</h3>

      <p>{{ $t('faq.Header5.A8') }}</p>

      <div class="hr"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.faq h2:not(#hero h2) {
  margin: 96px 0 36px 0;
  line-height: 1;
}

.faq h2:not(#hero h2):first-of-type {
  margin: 36px 0;
}

.faq h3 {
  background: linear-gradient(to right, #e1eeef 0, #e4f4f0 100%);
  background-clip: border-box;
  font-size: 24px;
  font-weight: 400;
  margin: 48px auto 12px;
  position: relative;
  padding: 0 0 12px;
  text-transform: unset;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.faq h3::before {
  color: #1ec498;
  content: '\2727'; /*hollow star*/
  /* content: "\2726"; /*filled star*/
  /* content: "\21e2"; /*dashed arrow*/
  display: inline-block;
  position: absolute;
  top: 0;
  left: -20px;
  font-size: 20px;
  -webkit-text-fill-color: #1ec498;
}

.faq h3:not([class])::after {
  opacity: 0.5;
}
</style>
