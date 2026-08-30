import re

# 1. Update App.tsx safe merging
with open("src/App.tsx", "r", encoding="utf-8") as f:
    app_code = f.read()

# Make sure App.tsx uses safe deep merge when reading localStorage
app_code = app_code.replace(
    'return { ...DEFAULT_ADMOB_INPUTS, ...JSON.parse(saved) };',
    '''const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_ADMOB_INPUTS,
            ...parsed,
            adFormats: {
              ...DEFAULT_ADMOB_INPUTS.adFormats,
              ...(parsed?.adFormats || {}),
              rewardedVideo: { ...DEFAULT_ADMOB_INPUTS.adFormats.rewardedVideo, ...(parsed?.adFormats?.rewardedVideo || {}) },
              interstitial: { ...DEFAULT_ADMOB_INPUTS.adFormats.interstitial, ...(parsed?.adFormats?.interstitial || {}) },
              appOpen: { ...DEFAULT_ADMOB_INPUTS.adFormats.appOpen, ...(parsed?.adFormats?.appOpen || {}) },
              rewardedInterstitial: { ...DEFAULT_ADMOB_INPUTS.adFormats.rewardedInterstitial, ...(parsed?.adFormats?.rewardedInterstitial || {}) },
              native: { ...DEFAULT_ADMOB_INPUTS.adFormats.native, ...(parsed?.adFormats?.native || {}) },
              banner: { ...DEFAULT_ADMOB_INPUTS.adFormats.banner, ...(parsed?.adFormats?.banner || {}) },
            },
            geoDistribution: { ...DEFAULT_ADMOB_INPUTS.geoDistribution, ...(parsed?.geoDistribution || {}) },
            platformSplit: { ...DEFAULT_ADMOB_INPUTS.platformSplit, ...(parsed?.platformSplit || {}) },
          };'''
)

app_code = app_code.replace(
    'return { ...DEFAULT_ADSENSE_INPUTS, ...JSON.parse(saved) };',
    '''const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_ADSENSE_INPUTS,
            ...parsed,
            selectedUnits: {
              ...DEFAULT_ADSENSE_INPUTS.selectedUnits,
              ...(parsed?.selectedUnits || {}),
            },
            geoDistribution: { ...DEFAULT_ADSENSE_INPUTS.geoDistribution, ...(parsed?.geoDistribution || {}) },
            deviceDistribution: { ...DEFAULT_ADSENSE_INPUTS.deviceDistribution, ...(parsed?.deviceDistribution || {}) },
          };'''
)

with open("src/App.tsx", "w", encoding="utf-8") as f:
    f.write(app_code)

print("Patched App.tsx deep merge")
