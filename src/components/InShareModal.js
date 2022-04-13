import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
    Text,
    createStandaloneToast
} from "@chakra-ui/react"
import { TiSocialLinkedin } from 'react-icons/ti';
import { openSignInWindow } from "./Popup";
import { useLocation } from "react-router-dom";
import * as htmlToImage from 'html-to-image';
const axios = require('axios');


export function InShareModal(props) {

    const [linkedinLink, setLinkedinLink] = React.useState('');
    const [post, setPost] = React.useState(false);
    const [hasParams, setHasParams] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = createStandaloneToast();
    const search = useLocation().search;

    
    
    React.useEffect(() => {
        axios.get('https://linke-st-server.herokuapp.com/home').then(resp => setLinkedinLink(resp.data));
        if (search) {
            const code = new URLSearchParams(search).get('code');
            const state = new URLSearchParams(search).get('state');
            postToken(code, state);
            setTimeout(() => {
                axios.get('https://linke-st-server.herokuapp.com/token').then(resp => setPost(resp.data))
            }, 5000);
                
        }
    }, []);

    React.useEffect(() => {
        if(post) {
            toast({
                title: 'Oba!',
                description: 'Seu cerficado foi postado.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
    }, [post])

    const share = () => {
        const component = document.getElementById('cert');

        htmlToImage.toJpeg(component, {
            canvasWidth: 1889,
            canvasHeight: 1153,
        })
        .then(img => {
            postImage(img, props.cert_type)}).then(r => console.log(r));
            
    };

    async function postToken(code, state) {           
        try {
          await axios.post('https://linke-st-server.herokuapp.com/token',
           {
            code,
            state
          })
        } catch (error) {
          console.log(error);
        }
    }

    async function postImage(img, certType) {

        const level = certType === 'participante' ? localStorage.getItem('pLevel') : localStorage.getItem('mLevel');
        
                
        try {
          await axios.post('https://linke-st-server.herokuapp.com/image',
           {
            img,
            certType,
            level
          })
        } catch (error) {
          console.log(error);
        }
      console.log('oi')
      }


    return (
        <>
            <Button
                colorScheme="blue"
                size="sm"
                mt={4}
                variant="ghost"
                onClick={onOpen}
                width="100%" justifyContent="flex-start"
                leftIcon={<TiSocialLinkedin />}
            >
                Publicar no feed
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        <Text >
                            Uma janela do seu navegador será aberta
                            para você fazer login no LinkedIn e autorizar
                            este app a fazer postagens em seu nome no LinkedIn.
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Voltar
                        </Button>
                        <a href={linkedinLink}>
                        <Button variant="ghost" colorScheme="blue" onClick={() => {
                            share();
                        }}>
                            Publicar no feed</Button>
                            </a>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}