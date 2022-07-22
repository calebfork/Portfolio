import React from 'react';
import * as GroupServiceApi from '../apis/GroupServiceApi.js';
import * as UserServiceApi from '../apis/UserServiceApi.js';
import * as CustomCode from '../components.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as Utils from '../utils';
import {
  ButtonSolid,
  CircleImage,
  FieldSearchBarFull,
  Icon,
  RadioButton,
  RadioButtonGroup,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';

const JoingroupwithsearchScreen = props => {
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const turnIntoArray = item => {
    let arr = [];
    if (item) arr.push(item);
    return arr;
  };

  const notfiicationPopupBackend = (errorDescription, teamName) => {
    const alertStyle = errorDescription
      ? CustomCode.s.containerError
      : CustomCode.s.containerSuccess;
    const title = errorDescription
      ? 'The request failed'
      : 'Successfully joined ' + teamName;

    CustomCode.Notifier.showNotification({
      title: title,
      description: errorDescription,
      duration: 3000,
      showAnimationDuration: 500,
      Component: CustomCode.CustomErrorNotification,
      componentProps: {
        containerStyle: alertStyle,
      },
      showEasing: CustomCode.Easing.bounce,
      hideOnPress: false,
    });
  };

  const changeRadioGroupValue = listData => {
    setRadioButtonGroupValue(listData['objectId']);
    setPICKED_GROUP_NAME(listData['name']);
  };

  const validateGroupIsPicked = str => {
    if (str === ' ') return true;
    return false;
  };

  const getDomain = async () => {
    // Type the code for the body of your function or hook here.
    // Functions can be triggered via Button/Touchable actions.
    // Hooks are run per ReactJS rules
    return AsyncStorage.getItem('@domain');
  };
  const errorNotifierRef = CustomCode.useRef();
  const { theme } = props;
  const { navigation } = props;

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  const {
    isLoading: screenLoading,
    data: screenData,
    error: screenError,
  } = UserServiceApi.useGetUserDomainGET({
    userId: Constants['USER_OBJECT_ID'],
  });

  const [PICKED_GROUP_NAME, setPICKED_GROUP_NAME] = React.useState('');
  const [radioButtonGroupValue, setRadioButtonGroupValue] =
    React.useState(undefined);
  const [searchBarValue, setSearchBarValue] = React.useState(undefined);
  if (screenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (screenError) {
    return null;
  }

  if (!screenData) {
    return null;
  }

  return (
    <ScreenContainer
      style={styles.screen}
      scrollable={false}
      hasSafeArea={true}
    >
      <Utils.CustomCodeErrorBoundary>
        <CustomCode.KeyboardDismiss>
          <View style={styles.ViewQb} pointerEvents={'auto'}>
            <View style={styles.ViewIo} pointerEvents={'auto'}>
              <View style={styles.ViewJw} pointerEvents={'auto'}>
                <Touchable
                  onPress={() => {
                    try {
                      navigation.navigate('JoiningOrCreatingATeamScreen');
                      setGlobalVariableValue({
                        key: 'ERROR_SEARCH_GROUP',
                        value: '',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <Icon
                    name={'AntDesign/left'}
                    color={theme.colors.strong}
                    size={20}
                  />
                </Touchable>

                <View style={styles.ViewQk} pointerEvents={'auto'}>
                  <Icon
                    style={styles.IconIO}
                    name={'AntDesign/team'}
                    size={30}
                    color={theme.colors.strong}
                  />
                  <Text style={[styles.TextQf, { color: theme.colors.strong }]}>
                    {'Join a Team'}
                  </Text>
                </View>
                <Icon
                  style={styles.IconCb}
                  name={'AntDesign/left'}
                  color={theme.colors.strong}
                  size={20}
                />
              </View>

              <View style={styles.ViewfN} pointerEvents={'auto'}>
                <View
                  style={[
                    styles.ViewJL,
                    {
                      backgroundColor: theme.colors.custom_rgb225_233_238,
                      borderRadius: 12,
                    },
                  ]}
                  pointerEvents={'auto'}
                >
                  <FieldSearchBarFull
                    onChange={searchBarValue => {
                      try {
                        setSearchBarValue(searchBarValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={styles.FieldSearchBarFullSM}
                    value={searchBarValue}
                    placeholder={'Search contacts...'}
                  />
                </View>
              </View>

              <ScrollView
                contentContainerStyle={styles.ScrollView_36Content}
                showsVerticalScrollIndicator={true}
                bounces={true}
              >
                <GroupServiceApi.FetchGetGroupsGET
                  groupDomain={screenData?.domain}
                  groupName={searchBarValue}
                >
                  {({ loading, error, data, doFetch }) => {
                    const fetchData = data;
                    if (!fetchData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <View>
                          <Image
                                  source={('assets\images\NoTeamPlaceholder.png')}
                                />
                            <Image
                        />
                        </View>
                      );
                    }

                    return (
                      <View style={styles.ViewIX} pointerEvents={'auto'}>
                        <RadioButtonGroup
                          onValueChange={radioButtonGroupValue => {
                            try {
                              setRadioButtonGroupValue(radioButtonGroupValue);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          value={radioButtonGroupValue}
                        >
                          <FlatList
                            data={fetchData}
                            renderItem={({ item }) => {
                              const listData = item;
                              return (
                                <Utils.CustomCodeErrorBoundary>
                                  <CustomCode.TouchableItem
                                    style={{ borderRadius: 8 }}
                                    underlayColor="#DDF1FF"
                                    onPress={() =>
                                      changeRadioGroupValue(listData)
                                    }
                                  >
                                    <View
                                      style={styles.View_0h}
                                      pointerEvents={'none'}
                                    >
                                      <CircleImage
                                        source={{
                                          uri: listData && listData['logo'],
                                        }}
                                        size={60}
                                      />
                                      <Text
                                        style={[
                                          styles.TextZh,
                                          { color: theme.colors.strong },
                                        ]}
                                      >
                                        {listData?.name}
                                      </Text>
                                      <RadioButton
                                        value={listData?.objectId}
                                        color={theme.colors.custom_rgb46_58_89}
                                        unselectedColor={
                                          theme.colors.custom_rgb46_58_89
                                        }
                                        size={24}
                                        selectedIcon={'FontAwesome/check'}
                                      />
                                    </View>
                                  </CustomCode.TouchableItem>
                                </Utils.CustomCodeErrorBoundary>
                              );
                            }}
                            style={styles.FlatListv7}
                            numColumns={1}
                          />
                        </RadioButtonGroup>
                      </View>
                    );
                  }}
                </GroupServiceApi.FetchGetGroupsGET>
              </ScrollView>
            </View>

            <View style={styles.ViewiK} pointerEvents={'auto'}>
              <ButtonSolid
                onPress={async () => {
                  try {
                    const joinGroupJson = await UserServiceApi.joinGroupPOST(
                      Constants,
                      {
                        groupId: radioButtonGroupValue,
                        userId: Constants['USER_OBJECT_ID'],
                      }
                    );
                    const ERROR_MESSAGE = joinGroupJson.message;
                    notfiicationPopupBackend(ERROR_MESSAGE, PICKED_GROUP_NAME);
                    if (ERROR_MESSAGE) {
                      return;
                    }
                    setGlobalVariableValue({
                      key: 'CURRENT_GROUP_ID',
                      value: radioButtonGroupValue,
                    });
                    navigation.navigate('HomePageFeedNewScreen');
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={[
                  styles.ButtonSolidgA,
                  {
                    backgroundColor: theme.colors.custom_rgb254_197_2,
                    color: theme.colors.strong,
                  },
                ]}
                title={"Let's go"}
              />
            </View>
          </View>
        </CustomCode.KeyboardDismiss>
      </Utils.CustomCodeErrorBoundary>
      <Utils.CustomCodeErrorBoundary>
        <CustomCode.NotifierRoot ref={errorNotifierRef} />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  IconIO: {
    marginRight: 5,
  },
  TextQf: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 18,
  },
  ViewQk: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  IconCb: {
    opacity: 0,
  },
  ViewJw: {
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '5%',
  },
  FieldSearchBarFullSM: {
    marginLeft: 10,
  },
  ViewJL: {
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '80%',
  },
  ViewfN: {
    justifyContent: 'center',
    marginTop: '6%',
    marginBottom: 10,
  },
  TextZh: {
    flex: 1,
    textAlign: 'center',
  },
  View_0h: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
  FlatListv7: {
    width: '100%',
  },
  ViewIX: {
    width: '80%',
  },
  FetchuG: {
    minHeight: 40,
  },
  ScrollView_36Content: {
    alignItems: 'center',
  },
  ViewIo: {
    width: '100%',
    height: '80%',
  },
  ButtonSolidgA: {
    borderRadius: 8,
    fontFamily: 'System',
    fontWeight: '500',
    textAlign: 'center',
    width: '80%',
  },
  ViewiK: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10%',
    marginRight: '10%',
  },
  ViewQb: {
    width: '100%',
    height: '100%',
  },
  screen: {
    width: '100%',
    height: '100%',
  },
});

export default withTheme(JoingroupwithsearchScreen);
