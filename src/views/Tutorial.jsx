import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { Box, HStack, Icon, Flex, } from "native-base";
import { Feather} from '@expo/vector-icons';
import Slider from "../components/slider";
import minhaImagem from '../../assets/images/ratos.jpg';

export default function Tutorial(){    
    return(
    
        <View style={styles.container}>
                <ImageBackground
                    source={minhaImagem}
                    style={styles.imageBackground}
                />

                <Box position='absolute' w='100%' p='7' flex={1}>
                    <Flex w="100%"justify="flex-start">                    
                        <Icon
                            as={Feather}
                            name="lock"
                            size={7}
                            color="#FE5000"
                        />
                    </Flex>                    
                </Box>

                <Box background="#FFF" position='absolute' bottom='0%'  w='100%' h="40%" p='7' flex={1} borderTopLeftRadius="5%" borderTopRightRadius="5%"> 
                    <Slider/>
                </Box>
            

                
        </View>
     
      
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
  });
