import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from '@react-navigation/stack';



export type NavigationParamList {
    OnBoard: undefined;
    Home: undefined;
}


export type ScreenProps<T extends keyof NavigationParamList> {
    navigation: StackNavigationProp<NavigationParamList, T>;
    route: RouteProp<NavigationParamList, T>;
}