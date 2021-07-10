import React, { useState, useRef } from 'react';
import { Text, View, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faList, faInfo } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../common/Colors';

const Fab = ({nav}) => {

    const [open, setOpen] = useState(false);

    const toggleAnimation = useRef(new Animated.Value(0)).current;

    const startAnimation = () => {
        const toValue = open ? 0 : 1;

        Animated.timing(toggleAnimation, {
            toValue,
            duration: 50,
            useNativeDriver: false
        }).start();

        setOpen(!open);
    };

    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 30,
            right: 30,
            alignItems: 'center',
        },
        icon: {
            color: 'white',
            position: 'absolute'
        },
        menu: {
            backgroundColor: colors.primary,
            width: 60,
            height: 60,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{
                rotate: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg']
                })
            }]
        },
        secondary: {
            backgroundColor: colors.extraLight,
            width: 50,
            height: 50,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center'
        },
        two: {
            transform: [{
                translateY: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, -10]
                })
            }]
        },
        three: {
            transform: [{
                translateY: toggleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, -20]
                })
            }]
        },
        text: {
            width: 80,
            position: 'relative',
            left: -80,
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 10,
            textAlign: 'center'
        }
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => nav.navigate("addtask")}>
                <Animated.View style={[styles.secondary, styles.three]}>
                    <Icon icon={faList} style={styles.icon} />
                    <Text style={[styles.text, open ? null : {display: 'none'}]}>Tarea</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => nav.navigate('categories')}>
                <Animated.View style={[styles.secondary, styles.two]}>
                    <Icon icon={faInfo} style={styles.icon} />
                    <Text style={[styles.text, open ? null : {display: 'none'}]}>Categoria</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => startAnimation()}>
                <Animated.View style={[styles.menu]} >
                    <Icon icon={faPlus} style={styles.icon} />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Fab;