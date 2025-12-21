import React, { Component } from 'react';
import { Text, View, ScrollView, Button, Alert, Modal, StyleSheet } from 'react-native';
import { Card, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { addToCart, updateProduct } from '../redux/ActionCreator';
import { baseUrl, imageUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
        products: state.products,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => ({
    addToCart: (product) => dispatch(addToCart(product)),
    updateProduct: (productId, name, description, price, image, category, brand, quantity) => dispatch(updateProduct(productId, name, description, price, image, category, brand, quantity))
})

function RenderProduct({ product, addToCart, cart, onAddStock }) {
    if (product != null) {
        const imageSource = (product.image && (product.image.startsWith('file://') || product.image.startsWith('http'))) 
            ? { uri: product.image } 
            : { uri: imageUrl + product.imageId + '.jpg' };

        const stock = product.quantity !== undefined ? parseInt(product.quantity) : 0;
        
        const cartItem = cart ? cart.find(c => c.id === product.id) : null;
        const currentCartQuantity = cartItem ? cartItem.quantity : 0;
        
        const isOutOfStock = stock === 0;
        const isMaxStockReached = currentCartQuantity >= stock;

        return (
            <Card>
                <Card.Title>{product.name}</Card.Title>
                <Card.Divider />
                <Card.Image source={imageSource} style={{ resizeMode: 'center', height: 300 }} />
                <Text style={{ margin: 10 }}>
                    {product.description}
                </Text>
                
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ fontWeight: 'bold', width: 100 }}>Serial No:</Text>
                    <Text>{product.serialNumber}</Text>
                </View>
                
                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ fontWeight: 'bold', width: 100 }}>Performance:</Text>
                    <Text style={{ flex: 1 }}>{product.performance}</Text>
                </View>

                <View style={{ flexDirection: 'row', margin: 10 }}>
                    <Text style={{ fontWeight: 'bold', width: 100 }}>Specs:</Text>
                    <Text style={{ flex: 1 }}>{product.specs}</Text>
                </View>

                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#512DA8' }}>
                        ${product.price}
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: isOutOfStock ? 'red' : 'green' }}>
                        {isOutOfStock ? 'Out of Stock' : `In Stock: ${stock}`}
                    </Text>
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Button
                        title={isOutOfStock ? "Out of Stock" : (isMaxStockReached ? "Max Stock Reached" : "Add to Cart")}
                        onPress={() => {
                            if (isMaxStockReached) {
                                Alert.alert('Limit Reached', 'Cannot add more than available stock');
                                return;
                            }
                            addToCart(product);
                            Alert.alert('Added to Cart', product.name + ' added to cart successfully!');
                        }}
                        color="#512DA8"
                        disabled={isOutOfStock || isMaxStockReached}
                    />
                </View>
                <Button
                    title="Add Stock"
                    onPress={onAddStock}
                    color="#28a745"
                />
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            stockToAdd: ''
        };
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }

    handleAddStock = () => {
        const productId = this.props.route.params.productId;
        const product = this.props.products.products.filter(product => product.id === productId)[0];
        const currentStock = parseInt(product.quantity || 0);
        const addAmount = parseInt(this.state.stockToAdd);

        if (isNaN(addAmount) || addAmount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid positive number');
            return;
        }

        const newQuantity = currentStock + addAmount;
        
        // Use image or imageId logic similar to MenuComponent
        const imageToUse = product.image || product.imageId;

        this.props.updateProduct(
            product.id,
            product.name,
            product.description,
            product.price,
            imageToUse,
            product.category,
            product.brand,
            newQuantity.toString()
        );
        
        this.setState({ showModal: false, stockToAdd: '' });
    }

    render() {
        const productId = this.props.route.params.productId;
        const product = this.props.products.products.filter(product => product.id === productId)[0];
        return (
            <ScrollView>
                <RenderProduct 
                    product={product} 
                    addToCart={this.props.addToCart} 
                    cart={this.props.cart} 
                    onAddStock={this.toggleModal}
                />
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add Stock</Text>
                            <Input
                                placeholder='Quantity to add'
                                leftIcon={<Icon type='material-community' name='cube-plus' size={24} color='black' />}
                                onChangeText={(value) => this.setState({ stockToAdd: value })}
                                value={this.state.stockToAdd}
                                keyboardType='numeric'
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                <Button
                                    title="Cancel"
                                    onPress={this.toggleModal}
                                    color="gray"
                                />
                                <Button
                                    title="Add"
                                    onPress={this.handleAddStock}
                                    color="#512DA8"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
