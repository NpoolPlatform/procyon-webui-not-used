<template>
  <div class='earn-box'>
    <div class='earn-box-item'>
      <div>
        <span class='price'>*</span>
        <span class='unit'>USDT</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('dashboard.Column1.Total') }}</span>
    </div>

    <div class='earn-box-item'>
      <div>
        <span class='price'>*</span>
        <span class='unit'>USDT</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('dashboard.Column1.Yesterday') }}</span>
    </div>

    <div class='earn-box-item'>
      <div>
        <span class='price'>*</span>
        <span class='unit'>USDT</span>
      </div>
      <div class='hr sub-hr'></div>
      <span class='subtitle'>{{ $t('dashboard.Column1.Current') }}</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped>
.earn-box {
  display: flex;
  justify-content: center;
}

.earn-box-item {
  display: flex;
  flex-direction: column;
  padding: 0 36px;
  text-align: center;
  min-width: 240px;
  width: 30%;
}

.price {
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
}

.unit {
  color: #1ec498;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 0 2px;
  text-transform: uppercase;
}

.subtitle {
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 12px 0;
}

.sub-hr {
  margin: 0;
}
</style>
