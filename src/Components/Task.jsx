import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../common/Colors';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("ToDo.db");

const Task = ({ task, reload, navigation }) => {

    const deleteTask = () => {
        const query = `DELETE FROM Task WHERE id = ${task.id}`;
        const params = [];
        db.transaction(tx => {
            tx.executeSql(query, params, (err, success) => {
                if (err._error) {
                    console.log("Error" + error)
                }
                reload();
            });
        })
    };

    const colorsList = {
        1: colors.error,
        2: colors.warning,
        3: colors.light
    }

    const priorityList = {
        1: 'ALTA',
        2: 'MEDIA',
        3: 'BAJA'
    };

    return (
        <>
            <View style={styles.task} onPress={() => setShowModal(true)}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                    <View
                        style={[styles.assigment, { backgroundColor: colorsList[task.priority] }]}
                    >
                        <Text style={styles.assigmentText}>
                            {priorityList[task.priority]}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold' }}>Categoría: </Text>
                        <Text style={styles.category}>{task.name}</Text>
                    </View>
                </View>
                <View style={[styles.row, { marginTop: 10 }]}>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Titulo: </Text>
                            <Text style={styles.title}>{task.title}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Descripción: </Text>
                        </View>
                        <Text style={styles.title}>{task.description}</Text>
                        <View style={[styles.row, { justifyContent: 'flex-end' }]}>
                            <TouchableOpacity
                                style={{ backgroundColor: colors.light, padding: 7, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}
                                onPress={() => navigation.navigate("updatetask", {id: task.id})}
                            >
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Editar</Text>
                                <Icon icon={faEdit} style={{ color: '#FFF', marginLeft: 5 }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: colors.error, padding: 7, flexDirection: 'row', alignItems: 'center', marginLeft: 10, borderRadius: 10 }}
                                onPress={deleteTask}
                            >
                                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Eliminar</Text>
                                <Icon icon={faTrashAlt} style={{ color: '#FFF', marginLeft: 5 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default Task;

const styles = StyleSheet.create({
    task: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        padding: 10
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    assigment: {
        width: 70,
        height: 24,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        opacity: 0.5
    },
    assigmentText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 17,
    },
    column: {
        flexDirection: 'column'
    }
})