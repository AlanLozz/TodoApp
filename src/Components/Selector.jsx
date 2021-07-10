import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../common/Colors';

const Selector = ({ setSelection, selection }) => {
    const [showModal, setShowModal] = useState(false);

    const setOption = (n) => {
        setSelection(n)
        setShowModal(false);
    };

    const ModalPriority = () => {
        return (
            <Modal
                transparent
                animationType="fade"
                visible={showModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={[styles.option, {backgroundColor: colors.error, marginBottom: 10}]} onPress={() => setOption(1)}>
                            <Text style={styles.text}>
                                Prioridad Alta
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option, {backgroundColor: colors.warning, marginBottom: 10}]} onPress={() => setOption(2)}>
                            <Text style={styles.text}>
                                Prioridad Media
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option, {backgroundColor: colors.secondaryLight}]} onPress={() => setOption(3)}>
                            <Text style={styles.text}>Prioridad Baja</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.btnCancelar}>
                            <Text style={styles.textCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <>
            <ModalPriority />
            <Text style={styles.title}>Prioridad: </Text>
            <TouchableOpacity style={styles.selector} onPress={() => setShowModal(true)}>
                <Text style={styles.selectorText}>
                    { selection === 0 ? 'Seleccionar' : selection === 1 ? 'Prioridad Alta' : selection === 2 ? 'Prioridad Media' : selection === 3 ? 'Prioridad Baja' : null }
                </Text>
                <Icon icon={faSortDown} style={styles.icon} />
            </TouchableOpacity>
        </>
    )
}

export default Selector;

const styles = StyleSheet.create({
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        borderColor: colors.light,
        borderWidth: 1.5,
        width: '100%',
        height: 50,
        marginTop: 10
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    selectorText: {
        fontSize: 16
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        elevation: 20
    },
    option: {
        padding: 15,
        width: '100%',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    textCancelar: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.error
    },  
    btnCancelar: {
        width: '100%',
        height: 50,
        borderColor: colors.error,
        borderWidth: 1.5,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})
