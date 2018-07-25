import React from 'react';
import { Text, View, Animated, ScrollView, TouchableHighlight} from 'react-native';

const AnimatedTouchableHighlight = Animated.createAnimatedComponent(TouchableHighlight)

export default class App extends React.Component {
  state = {
    scrollOffset: new Animated.Value(0)
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{ width: '100%', height: 65 }} /> {/*White top header*/}
        <Animated.View
            style={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: this.state.scrollOffset.interpolate({ //Controls the height of the 'currently playing' area and the top of the scrollview.
                inputRange: [0, 300], //Ratio of input:output must be 1:-1
                outputRange: [300, 0],
                extrapolate: 'clamp'
              }),
              overflow: 'visible',
            }}
          >
            <View style={{
              position: 'absolute', 
              height: 330, 
              width: '100%', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#666666'
            }}>
              {/*Insert the 'currently playing' area here, the height here must be fixed to acheive the effect desired.*/}
              <TouchableHighlight onPress={() => {}}>
                <Text 
                  style={{
                    fontSize: 28, 
                    color: 'white',
                    
                  }}
                >
                  Currently Playing Here
                </Text>
              </TouchableHighlight>
            </View>
          </Animated.View>
        <ScrollView
          style={{
            width: '100%',
          }}
          onScroll={Animated.event(
            [{ nativeEvent: {
                contentOffset: {
                  y: this.state.scrollOffset // Get the scroll offset of the scrollview
                }
              }
            }]
          )}
          scrollEventThrottle={1}
        >
        <Animated.View //This height-offsets the views inside the scroll.
            style={{
              width: '100%',
              height: this.state.scrollOffset.interpolate({
                inputRange: [0, 300], // Ratio of values must be 1:1
                outputRange: [0, 300], // The purpose of the interpolation here is just to clamp the values.
                extrapolate: 'clamp'
              }),
            }}/>
          <View style={{ 
            width: '100%', 
            height: 1200, 
            backgroundColor: '#353535',
            marginTop: 30, // This is half the height of the shuffle button.
            alignItems: 'center',
          }}>
            {/*You place your content that you want in the scrollview in here.*/}
            <AnimatedTouchableHighlight 
              style={{
                zIndex: 5, 
                transform: [{
                  translateY: this.state.scrollOffset.interpolate({
                    inputRange: [0, 300, 600], //This is the height offset for the shuffle button.
                    outputRange: [-30, -30, 270], //The first output range is constant : [0, 300, ...]:[-30, -30, ...], the final ratio is x*2:(x  - heightOfButton/2) x is the previous number in the inputRange.
                  }),
                }],
                borderRadius: 30, 
                overflow: 'hidden'
              }} 
            onPress={() => {}}
            >
              <Animated.View style={{ // This is the shuffle button.
                width: 300, 
                height: 60, 
                backgroundColor: 'green',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{color: 'white', fontSize: 24}}>Shuffle Play</Text>
              </Animated.View>
            </AnimatedTouchableHighlight>
              {/*The content*/}
            <View style={{backgroundColor: 'black', height: 30, marginBottom: 30, width: '100%'}}>
              <Text style={{color: 'white'}}>Content</Text>
            </View>
            <View style={{backgroundColor: 'black', height: 30, marginBottom: 30, width: '100%'}}>
              <Text style={{color: 'white'}}>Content</Text>
            </View>
            <View style={{backgroundColor: 'black', height: 30, marginBottom: 30, width: '100%'}}>
              <Text style={{color: 'white'}}>Content</Text>
            </View>
          </View>
        </ScrollView>
        <View style={{width: '100%', height: 65}} /> {/*Footer*/}
      </View>
    );
  }
}