import { IconName } from 'assets';
import { IconApp, ImageCus, TextCus, TouchCus } from 'components';
import { useAuth } from 'hooks';
import { NavigationService, Routes } from 'navigation';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';
import { Colors } from 'theme';
import { IIntroSilde } from 'types';
import { slidesIntro } from 'utils';
import styles from './styles';

const Intro = () => {
  const { onShowFirstIntro } = useAuth();

  const [activeDot, setActiveDot] = useState(0);
  const sliderIntro = useRef<AppIntroSlider>(null);

  const _renderItem = ({ item }) => {
    const { image, subtitle, title } = item as IIntroSilde;
    return (
      <View style={styles.wrapperIntro}>
        <View style={styles.haflFlex} />
        <View style={styles.contentImage}>
          <ImageCus
            source={image}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.viewContent}>
          <TextCus style={[styles.title]} useI18n heading1 main mb-12>
            {title}
          </TextCus>
          <TextCus style={[styles.subtitle]} useI18n>{subtitle}</TextCus>
        </View>
      </View>
    );
  };
  return (
    <AppIntroSlider
      ref={sliderIntro}
      renderItem={_renderItem}
      data={slidesIntro}
      dotStyle={styles.dot}
      activeDotStyle={styles.dotActive}
      renderPagination={() => {
        return (
          <View style={styles.pagination}>
            <View style={styles.contentDot}>
              {slidesIntro.map((_, index: number) => {
                return (
                  <View
                    style={[
                      styles.dot,
                      activeDot === index && styles.dotActive,
                    ]}
                    key={index}
                  />
                );
              })}
            </View>
            <TouchCus
              style={[styles.buttonContainer]}
              bg-main
              onPress={() => {
                if (activeDot < slidesIntro.length - 1) {
                  sliderIntro.current?.goToSlide(activeDot + 1, true);
                  return;
                }
                onShowFirstIntro();
                NavigationService.navigate(Routes.InputPhone);
              }}>
              <TextCus style={[styles.textWhite,styles.mr8]} useI18n>
                continue
              </TextCus>
              <IconApp
                name={IconName.ChevronRight}
                size={16}
                color={Colors.white}
              />
            </TouchCus>
          </View>
        );
      }}
      onSlideChange={(index: number) => {
        setActiveDot(index);
      }}
      bottomButton={true}
      showSkipButton={true}
    />
  );
};

export default Intro;
