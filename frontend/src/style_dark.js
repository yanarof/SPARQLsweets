const styles = {
  //boxWidth: "xl:max-w-[1280px] w-full",
  initialColorMode: "light",
  colors: {
    text: "black",
    background: "white",
    primary: "#1408e6",
    inverseText: "blue",
    modes: {
      dark: {
        text: "white",
        background: "#282c34",
        primary: "#8fceff",
        inverseText: "green",
      },
    },
  },

  boxWidth: "xl:max-w-[1900px] w-full",

  heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-primary xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-poppins font-normal text-dimPrimary text-[18px] leading-[30.8px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-10 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionBox: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
