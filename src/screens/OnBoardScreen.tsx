import React from 'react'
import { FlatListProps, NativeSyntheticEvent } from 'react-native';
import { NativeScrollEvent } from 'react-native';
import { 
    View, 
    Text, 
    Image, 
    SafeAreaView, 
    Dimensions, 
    FlatList,
    StyleSheet,
    StatusBar,
    ViewStyle,
    TouchableOpacity,
    TextStyle, 
} from 'react-native'
import { ScreenProps  } from './types';



const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#282534', white: '#fff'};
const slides = [
    {
      id: '1',
      image: require('../images/image1.png'),
      title: 'Best Digital Solution',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '2',
      image: require('../images/image2.png'),
      title: 'Achieve Your Goals',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: '3',
      image: require('../images/image3.png'),
      title: 'Increase Your Value',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];
  

interface StyleProps {
    title: ViewStyle;
    subtitle: ViewStyle;
    indicator: ViewStyle;
    btnView: ViewStyle;
    btnStyle: ViewStyle;
}

interface SlideProps {
    slide: {
        id: string;
        image: any;
        title: string;
        subtitle: string;
    }
}

interface ButtonProps {
    title: string;
    onPress?: ()  => void;
    btnStyle?: ViewStyle;
    textStyle?: TextStyle;
}


const OnBoardScreen: React.FC<ScreenProps<'OnBoard'>> = ({ navigation }): React.ReactElement => {
    const [ currentIndicatorIndex, setCurrentIndicatorIndex] = React.useState(0);
    const flatRef = React.useRef<FlatList>(null);

    const Slide: React.FC<SlideProps> = ({ slide }): React.ReactElement => {
        return ( 
        <View style={{ alignItems: 'center' }}>
            <Image source={slide.image} style={{flex: 1, height: '75%', width, resizeMode: 'contain'  }} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </View>
        )
    }


    const Button: React.FC<ButtonProps> = ({ title, onPress = () => {console.log('TODO')}, btnStyle = {}, textStyle = {}}): React.ReactElement => {
        return <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.btnStyle, btnStyle]} >
            <Text style={[{ fontSize: 18, color: COLORS.primary, fontWeight: 'bold' }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    }

    const Footer: React.FC = (): React.ReactElement => {
        return (
            <View style={{ height: height * .25, padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                    {
                        slides.map((_, index) => {
                            return <View  key={index} style={[styles.indicator, index === currentIndicatorIndex && {
                                width: 20,
                                backgroundColor: COLORS.white
                            }
                        ]} />
                        })
                    }
                </View>

                {
                currentIndicatorIndex !== slides.length - 1 
                ?
                    <View style={styles.btnView}>
                        <Button title='Skip' 
                        onPress={skipSlides}
                        textStyle={{ color: COLORS.white}} 
                        btnStyle={{ backgroundColor: COLORS.primary, borderWidth: 1, borderColor: COLORS.white }} 
                        />
                        <View style={{ width: 15 }} />
                        <Button title='Next' onPress={nextSlide} />
                    </View>
                : <Button title="Get Started" onPress={() => navigation.navigate('Home')} />
              }
            </View>
        );
    }

    const onUpdateScreen = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const x = event.nativeEvent.contentOffset.x;
        setCurrentIndicatorIndex(Math.round(x / width));
    }

    const nextSlide = () => {
        const nextIndex = currentIndicatorIndex + 1;
        if(nextIndex >= slides.length){ return; }
        flatRef?.current?.scrollToIndex({index: nextIndex});
        setCurrentIndicatorIndex(nextIndex);
    }


    const skipSlides = () => {
        const lastIndex = slides.length - 1;
        flatRef.current.scrollToIndex({ index: lastIndex});
        setCurrentIndicatorIndex(lastIndex);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar backgroundColor={COLORS.primary} />
            <FlatList 
              ref={flatRef}
              data={slides}
              onMomentumScrollEnd={onUpdateScreen}
              horizontal
              contentContainerStyle={{ height: height * .75}}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              renderItem={({item}) =>  <Slide slide={item} />}
            />
            <Footer />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create<StyleProps>({
    title: { 
        fontSize: 22, 
        fontWeight: 'bold', 
        color: COLORS.white, 
        marginTop: 10
    },
    subtitle: { 
        fontSize: 13, 
        marginTop: 10, 
        maxWidth: '70%', 
        textAlign: 'center', 
        lineHeight: 23,  
        color: COLORS.white
    },
    indicator: {
        height: 2.5,
        width: 10,
        borderRadius: 2,
        backgroundColor: 'grey',
        marginHorizontal: 3
    },
    btnStyle: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default OnBoardScreen;
