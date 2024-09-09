export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        mainColor: ' #228be6',
        lightBlue: ' #5684AE',
        darkBlue: '#0F4C81',
        lightOrange: ' #FFE4C8',
        darkOrange: '#F9BE81',
        titleColor: '#E4F6ED',
        lightGreen: '#E0FAE9',
      },
      height: {
        headerHeight: '90px',
        contentHeight: `calc( 100vh - 70px)`,
        mainHeight: `calc( 100vh - 120px)`,
      },
    },
  },
  plugins: [],
};
