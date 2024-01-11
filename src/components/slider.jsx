import  React,{useState} from "react";
import { NativeBaseProvider, Box, Text } from 'native-base';
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from '@react-navigation/native';


const slides = [
    {
        key:'1',
        title: "Pet.Ly",
        text:"Cuide melhor do seu melhor amigo"
    },
    {
        key:'2',
        title: "Tudo em um só lugar",
        text:"gerencie vacinas, banhos, passeios e muito mais"
    },
    {
        key:'3',
        title: "Recursos essenciais ao seu alcance.",
        text:"Mantenha-se organizado(a) e nunca perca um compromisso importante."
    },
];
export default function Slider(){

    const navigation = useNavigation();

    const[showHome, setShowhome] =useState(false);
    function renderSlides({item}){
    return(
        <NativeBaseProvider>
            <Box alignItems="center" position="bottom" padding={4} w="100%" >
            <Text>{item.title}</Text>
            <Text>{item.text}</Text>
            </Box>
        
        </NativeBaseProvider>
    )
    }
    if(showHome==true){
        return <Text>entrou na home</Text>
    }else{
        return(
                <AppIntroSlider
            
            renderItem={renderSlides}
            data={slides}
            activeDotStyle={{
                backgroundColor: "#FE5000",
                width:30,
                heigth:10
            }}
            renderNextButton={()=> <Text style={{ paddingTop:50, color:'blue'}}>Próximo</Text>}
            renderDoneButton={()=> <Text style={{ paddingTop:50,}}>Continuar</Text>}
            onDone={() => navigation.navigate('TelaLogin')}
            />
            
        )
    }
   
}