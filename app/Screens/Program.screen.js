// Library Imports
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import { Divider, Button } from 'react-native-elements';
import { Formik } from 'formik';
import Toast from 'react-native-easy-toast';
import Toolbar from '../Components/Toolbar.component';
import { styles } from './Styles/ClientForm.style';
import axios from 'axios';
import Header from '../Components/Header';
import TileProgramForm from '../Modules/TileProgramForm.module';
import WoodProgramForm from '../Modules/WoodProgramForm.module';
import CarpetProgramForm from '../Modules/CarpetProgramForm.module';
import CountertopProgramForm from '../Modules/CountertopProgramForm.module';
import CabinetProgramForm from '../Modules/CabinetProgramForm.module';

// Class Component that will display client creation form
class Program extends Component {
    state = {
        client: null,
        user: null
    }

    timeout = null;
    scrollView = React.createRef( );

	componentDidMount( ) {
		let client = this.props.navigation.getParam('client');
		let user = this.props.navigation.getParam('user');

		this.setState({ client: client });
		this.setState({ user: user });
	}

	componentWillUnmount( ) {
		clearTimeout(this.timeout);
	}

	// Signout Function
	_signOutAsync = async( ) => {
		await AsyncStorage.clear( );
		this.props.navigation.navigate('Auth');
	};

	save = async(values, actions, program) => {
		let client = this.props.navigation.getParam('client');
        let user = this.props.navigation.getParam('user');

        values.client_id = client.id;
        
		axios.post(`${API_URL}/employee/${user.recnum}/clients/${client.id}/program/${program}`, values)
			.then((response) => {
				this.refs.toast.show('Client Information has been saved.');
			})
			.catch((error) => {
				console.error(error);
			});
    }
    
	render( ) {
		return (
			<KeyboardAvoidingView behavior='padding' enabled style={styles.background}>
				<View style={styles.row}>
					<Toolbar
						home={true}
						signOut={true}
						signOutFunc={this._signOutAsync}
						navigation={this.props.navigation} />

					<View style={styles.infoContainer}>
						<Header title="Program Information"/>

						<Divider/>

						<ScrollView style={styles.sv} contentContainerStyle={styles.svContentContainer}>
                            <Formik
                                initialValues={{...this.props.navigation.getParam('tileProgram')}}
                                onSubmit={(values, actions) => { 
                                    this.save(values, actions, "tileProgram");
                                }}>
                                {formikProps => (
                                    <TileProgramForm formik={formikProps}/>
                                )}
                            </Formik>
                            <Formik
                                initialValues={{...this.props.navigation.getParam('woodProgram')}}
                                onSubmit={(values, actions) => { 
                                    this.save(values, actions, "woodProgram");
                                }}>
                                {formikProps => (
                                    <WoodProgramForm formik={formikProps}/>
                                )}
                            </Formik>
                            <Formik
                                initialValues={{...this.props.navigation.getParam('carpetProgram')}}
                                onSubmit={(values, actions) => { 
                                    this.save(values, actions, "carpetProgram");
                                }}>
                                {formikProps => (
                                    <CarpetProgramForm formik={formikProps}/>
                                )}
                            </Formik>
                            <Formik
                                initialValues={{...this.props.navigation.getParam('countertopProgram')}}
                                onSubmit={(values, actions) => { 
                                    this.save(values, actions, "countertopProgram");
                                }}>
                                {formikProps => (
                                    <CountertopProgramForm formik={formikProps}/>
                                )}
                            </Formik>
                            <Formik
                                initialValues={{...this.props.navigation.getParam('cabinetProgram')}}
                                onSubmit={(values, actions) => { 
                                    this.save(values, actions, "cabinetProgram");
                                }}>
                                {formikProps => (
                                    <CabinetProgramForm formik={formikProps}/>
                                )}
                            </Formik>
						</ScrollView>
					</View>

					<Toast ref='toast' position='center' style={styles.toast}/>
				</View>
			</KeyboardAvoidingView>
		)
	}
}

// Props Validation
Program.propTypes = {
  navigation: PropTypes.object
}

export default Program;