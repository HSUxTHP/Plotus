import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchProducts, fetchPromotions, fetchPartners } from '../redux/ActionCreator';
import { baseUrl, imageUrl,partnerImageUrl, promotionImageUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        products: state.products,
        promotions: state.promotions,
        partners: state.partners
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
    fetchPromotions: () => dispatch(fetchPromotions()),
    fetchPartners: () => dispatch(fetchPartners())
})







class Home extends Component {

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Sales Dashboard</Text>
                </View>
                
                <View style={styles.gridContainer}>
                    <View style={styles.gridItem}>
                        <Button
                            title="New Order"
                            icon={<Icon name='cart-plus' type='font-awesome' color='white' size={40} />}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.props.navigation.navigate('Cart')}
                        />
                    </View>
                    <View style={styles.gridItem}>
                        <Button
                            title="Products"
                            icon={<Icon name='list' type='font-awesome' color='white' size={40} />}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.props.navigation.navigate('Menu')}
                        />
                    </View>
                    <View style={styles.gridItem}>
                        <Button
                            title="History"
                            icon={<Icon name='history' type='font-awesome' color='white' size={40} />}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.props.navigation.navigate('Order')}
                        />
                    </View>
                    <View style={styles.gridItem}>
                        <Button
                            title="Partners"
                            icon={<Icon name='users' type='font-awesome' color='white' size={40} />}
                            buttonStyle={styles.button}
                            titleStyle={styles.buttonTitle}
                            onPress={() => this.props.navigation.navigate('Partner')}
                        />
                    </View>
                </View>

                <Card>
                    <Card.Title>Quick Stats</Card.Title>
                    <Card.Divider/>
                    <View style={styles.statsRow}>
                        <Text>Total Products:</Text>
                        <Text style={{fontWeight: 'bold'}}>{this.props.products.products.length}</Text>
                    </View>
                    <View style={styles.statsRow}>
                        <Text>Total Partners:</Text>
                        <Text style={{fontWeight: 'bold'}}>{this.props.partners.partners.length}</Text>
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        backgroundColor: '#f5f5f5',
        flexGrow: 1
    },
    headerContainer: {
        padding: 20,
        backgroundColor: '#fff',
        marginBottom: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#512DA8'
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 5
    },
    gridItem: {
        width: '45%',
        margin: 5
    },
    button: {
        backgroundColor: '#512DA8',
        height: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5
    },
    buttonTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
