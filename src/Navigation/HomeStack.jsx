import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home';
import HomeCategory from '../Components/HomeCategory';
import AddTask from '../Components/AddTask';
import UpdateTask from '../Components/UpdateTask';
import { colors } from '../common/Colors';

const HomeStack = createStackNavigator();

const Navigation = () => {

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="home"
                component={Home}
                options={{
                    title: 'To-Do',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTintColor: '#fff'
                }}
            />
            <HomeStack.Screen
                name="categories"
                component={HomeCategory}
                options={{
                    title: 'Categorias',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTintColor: '#fff'
                }}
            />
            <HomeStack.Screen
                name="addtask"
                component={AddTask}
                options={{
                    title: 'Nueva tarea',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTintColor: '#fff'
                }}
            />
            <HomeStack.Screen
                name="updatetask"
                component={UpdateTask}
                options={{
                    title: 'Actualizar Tarea',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTintColor: '#fff'
                }}
            />
        </HomeStack.Navigator>
    )
}

export default Navigation;