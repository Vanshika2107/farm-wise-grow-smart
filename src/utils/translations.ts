
export type Language = 'en' | 'te' | 'hi';

export const translations = {
  en: {
    // Language Selection
    selectLanguage: 'Select Language',
    selectLanguageDesc: 'Choose your preferred language to continue',
    english: 'English',
    telugu: 'తెలుగు',
    hindi: 'हिंदी',
    continue: 'Continue',
    
    // Header
    appName: 'FarmWise',
    tagline: 'Grow Smart',
    description: 'AI-powered farming recommendations for better yields and sustainability',
    
    // Form
    tellUsAboutFarm: 'Tell us about your farm',
    analyzeConditions: "We'll analyze your conditions and recommend the best crops and fertilizers",
    soilType: 'Soil Type',
    selectSoilType: 'Select your soil type',
    previousCrop: 'Previous Crop',
    whatDidYouGrow: 'What did you grow last?',
    budget: 'Budget for Inputs (₹)',
    budgetPlaceholder: 'e.g. 50000',
    state: 'State',
    selectState: 'Select your state',
    growingSeason: 'Growing Season',
    selectSeason: 'Select growing season',
    analyzing: 'Analyzing Farm Conditions...',
    getRecommendations: 'Get Smart Recommendations',
    
    // Tabs
    analysis: 'Analysis',
    shop: 'Shop',
    newAnalysis: 'New Analysis',
    newFarmAnalysis: 'New Farm Analysis',
    startFresh: 'Start a fresh analysis with new parameters'
  },
  te: {
    // Language Selection
    selectLanguage: 'భాష ఎంచుకోండి',
    selectLanguageDesc: 'కొనసాగించడానికి మీ ఇష్టమైన భాషను ఎంచుకోండి',
    english: 'English',
    telugu: 'తెలుగు',
    hindi: 'हिंदी',
    continue: 'కొనసాగించు',
    
    // Header
    appName: 'ఫార్మ్‌వైజ్',
    tagline: 'తెలివిగా పండించండి',
    description: 'మెరుగైన దిగుబడి మరియు స్థిరత్వం కోసం AI-శక్తితో కూడిన వ్యవసాయ సిఫార్సులు',
    
    // Form
    tellUsAboutFarm: 'మీ వ్యవసాయ భూమి గురించి చెప్పండి',
    analyzeConditions: 'మేము మీ పరిస్థితులను విశ్లేషించి ఉత్తమ పంటలు మరియు ఎరువులను సిఫార్సు చేస్తాము',
    soilType: 'మట్టి రకం',
    selectSoilType: 'మీ మట్టి రకాన్ని ఎంచుకోండి',
    previousCrop: 'మునుపటి పంట',
    whatDidYouGrow: 'మీరు చివరిగా ఏమి పండించారు?',
    budget: 'ఇన్‌పుట్‌ల కోసం బడ్జెట్ (₹)',
    budgetPlaceholder: 'ఉదా. 50000',
    state: 'రాష్ట్రం',
    selectState: 'మీ రాష్ట్రాన్ని ఎంచుకోండి',
    growingSeason: 'పెరుగుతున్న సీజన్',
    selectSeason: 'పెరుగుతున్న సీజన్‌ను ఎంచుకోండి',
    analyzing: 'వ్యవసాయ పరిస్థితులను విశ్లేషిస్తోంది...',
    getRecommendations: 'స్మార్ట్ సిఫార్సులు పొందండి',
    
    // Tabs
    analysis: 'విశ్లేషణ',
    shop: 'షాప్',
    newAnalysis: 'కొత్త విశ్లేషణ',
    newFarmAnalysis: 'కొత్త వ్యవసాయ విశ్లేషణ',
    startFresh: 'కొత్త పారామితులతో కొత్త విశ్లేషణ ప్రారంభించండి'
  },
  hi: {
    // Language Selection
    selectLanguage: 'भाषा चुनें',
    selectLanguageDesc: 'जारी रखने के लिए अपनी पसंदीदा भाषा चुनें',
    english: 'English',
    telugu: 'తెలుగు',
    hindi: 'हिंदी',
    continue: 'जारी रखें',
    
    // Header
    appName: 'फार्मवाइज',
    tagline: 'स्मार्ट तरीके से उगाएं',
    description: 'बेहतर पैदावार और स्थिरता के लिए AI-संचालित खेती की सिफारिशें',
    
    // Form
    tellUsAboutFarm: 'अपने खेत के बारे में बताएं',
    analyzeConditions: 'हम आपकी स्थितियों का विश्लेषण करेंगे और सर्वोत्तम फसलों और उर्वरकों की सिफारिश करेंगे',
    soilType: 'मिट्टी का प्रकार',
    selectSoilType: 'अपनी मिट्टी का प्रकार चुनें',
    previousCrop: 'पिछली फसल',
    whatDidYouGrow: 'आपने पिछली बार क्या उगाया था?',
    budget: 'इनपुट के लिए बजट (₹)',
    budgetPlaceholder: 'जैसे 50000',
    state: 'राज्य',
    selectState: 'अपना राज्य चुनें',
    growingSeason: 'बढ़ते मौसम',
    selectSeason: 'बढ़ते मौसम का चयन करें',
    analyzing: 'खेत की स्थितियों का विश्लेषण कर रहे हैं...',
    getRecommendations: 'स्मार्ट सिफारिशें प्राप्त करें',
    
    // Tabs
    analysis: 'विश्लेषण',
    shop: 'दुकान',
    newAnalysis: 'नया विश्लेषण',
    newFarmAnalysis: 'नया फार्म विश्लेषण',
    startFresh: 'नए मापदंडों के साथ एक नया विश्लेषण शुरू करें'
  }
};

export const getTranslation = (key: keyof typeof translations.en, language: Language) => {
  return translations[language][key] || translations.en[key];
};
