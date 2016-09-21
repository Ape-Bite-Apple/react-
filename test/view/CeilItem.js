'use strict';
import React, {Component,PureComponent, PropTypes} from 'react';
import {
    Image,
    ListView,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
    View,
    ScrollView,
} from 'react-native';

let {width, height} = Dimensions.get('window');
export default class CeilItem extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            flag:false,
            delete:false,
        }
        this.hide=this.hide.bind(this);
        this.show=this.show.bind(this);
    };

    change(flag){
        this.setState({flag:flag});
    }

    delete(){
        this.setState({delete:true});
    }

    hide(){
        let centerPart_right = 0;
        let rightPart_width = 0;
        return (<View style={styles.Item}>
            <View style={styles.leftPart}>
            </View>
            <View style={[styles.centerPart, {marginRight:centerPart_right}]}>
            </View>
            <View style={[styles.rightPart,{width:rightPart_width,position:'absolute', right:0}]}>
            </View>
        </View>);
    }
    show(){
        let id=this.props.id;
        let onChildHanlder=this.props.onChildHanlder;
        let centerPart_right =  70;
        let rightPart_width = 60;
        return (<View style={styles.Item}>
            <View style={styles.leftPart}>
            </View>
            <View style={[styles.centerPart, {marginRight:centerPart_right}]}>
            </View>
            <View style={[styles.rightPart,{width:rightPart_width,position:'absolute', right:0},{justifyContent:'center', alignItems:'center'}]}>
                <TouchableOpacity onPress={()=>{onChildHanlder(id)}}>
                    <Text style={[styles.textStyle]}>
                        del
                    </Text>
                </TouchableOpacity>
            </View>
        </View>);
    }

    render() {
        console.log("CeilItem son render");
        if(this.state.delete){
            return null;
        }
        if(!this.state.flag){
            return this.hide();
        }else{
            return this.show();
        }
    };
}

const styles = StyleSheet.create({
    Item: {
        flexDirection: 'row',
        width: width,
        height: width * 0.4,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    top: {
        flexDirection: 'row',
    },
    leftPart: {
        width:60,
        height: width * 0.4,
        backgroundColor:'#BF3EFF'
    },
    centerPart: {
        width:250,
        height: width * 0.4,
        backgroundColor:'#B03060',
        marginRight:0,
    },
    rightPart: {
        width:0,
        height: width * 0.4,
        backgroundColor:'#90EE90'
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    button: {
        width: width / 2 - 20,
        height: 40,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
