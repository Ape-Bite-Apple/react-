import React, { Component ,PureComponent,PropTypes} from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    StyleSheet,
    Platform,
    Dimensions,
    Image,
    ScrollView,
    TouchableHighlight,
    AsyncStorage
} from 'react-native';


import CeilItem from './CeilItem'
let {width, height} = Dimensions.get('window');
var show=false;
var count = 0;
var del = 0;

export default class SomeItem extends Component {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._show = this._show.bind(this);
        this.onChildHanlder=this.onChildHanlder.bind(this);
        this.reflist=[];
        this.id = 0;
        this.state = {
            list: [],
        };
    };

    render() {
        console.log("SomeItem father render");
        return (<ScrollView>
                <View style={{width: width, height: 200,backgroundColor: '#FF00FF'}}>

                </View>
                <View style={{backgroundColor: 'white'}}>
                    {this.state.list}
                </View>
                <View style={{flexDirection:'row', width: width,height:45,alignItems:'center', justifyContent:'space-around'}}>
                    <TouchableHighlight style={styles.button} onPress={this._onPress} underlayColor='blue'
                                        activeOpacity={0.5}>
                        <View>
                            <Text style={styles.textStyle}>
                                add
                            </Text>
                        </View>

                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this._show} underlayColor='blue'
                                        activeOpacity={0.5}>
                        <View>
                            <Text style={styles.textStyle}>
                                show
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    };

    _onPress() {
        if(show){/*显示删除时 不能添加*/
           return ;
        }
        let arr = this.state.list;
        arr.push(this._renderItem());
        this.setState({
            list: arr,
        });
    };
    _renderItem() {
        count = this.id+1;
        this.id = count;
        return (<CeilItem ref={(component)=>{
                this.reflist.push(component)
            }}
                          id={count}
                          onChildHanlder={this.onChildHanlder}
            >
            </CeilItem>
        );
    }

   /*改变item布局*/
    _show(){
        show = show?false:true;
        for(let i=0;i<this.reflist.length;i++){
            this.reflist[i].change(show);
        }
    }
    onChildHanlder(inputId){
        let len = this.reflist.length;
        for(let i=0;i<len;i++){
            let id=this.reflist[i].props.id;
            if(inputId==id){
                del++;
                console.log("delete i: ",i);
                this.reflist[i].delete();
            }
        }
        /*全部删除后才可以添加*/
        show = del==count?false:show;
    }
    // console.log("show len: " + this.reflist.length);
    // console.log(this.reflist);
    // console.log("this.state.list len: ",this.state.list.length);
    // this.reflist[i].delete();
    // console.log(this.reflist);
    // console.log("this.state.list len_: ",this.state.list.length);
    // this.state.list.splice(i,1);
    //  this.reflist.splice(i,1);
    // let len_ = this.reflist.length;
    // console.log("first len: ",len);
    // console.log("second len_: ",len_);
    // if(len_!=len){
    //     this.setState({
    //         list : this.state.list,
    //     });
    // }




}


const styles = StyleSheet.create({
    Item: {
        flexDirection: 'row',
        width: width,
        height: width * 0.4,
        backgroundColor: 'black',
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
