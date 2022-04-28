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
import { i18n } from "../translate/i18n";
const axios = require('axios');


export function InShareModal(props) {

    const [linkedinLink, setLinkedinLink] = React.useState('');
    const [post, setPost] = React.useState(false);
    const [hasParams, setHasParams] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = createStandaloneToast();
    const search = useLocation().search;

    
    
    React.useEffect(() => {
        // 'https://linke-st-server.herokuapp.com/home'
        axios.get('http://localhost:3001/home').then(resp => setLinkedinLink(resp.data));
        if (search) {
            const code = new URLSearchParams(search).get('code');
            const state = new URLSearchParams(search).get('state');
            postToken(code, state);
            // postCert();
            setTimeout(() => {
// 'https://linke-st-server.herokuapp.com/token'
                axios.get('http://localhost:3001/token').then(resp => setPost(resp.data))
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
            // 'https://linke-st-server.herokuapp.com/token'
          await axios.post('http://localhost:3001/token',
           {
            code,
            state
          })
        } catch (error) {
          console.log(error);
        }
    }

    async function postCert() {           
        try {
            // 'https://linke-st-server.herokuapp.com/token'
          await axios.post('http://localhost:3001/postCert',
           {
            
          })
        } catch (error) {
          console.log(error);
        }
    }



    async function postImage(img, certType) {

        const level = certType === 'participante' ? localStorage.getItem('pLevel') : localStorage.getItem('mLevel');
        
                
        try {
            // 'https://linke-st-server.herokuapp.com/image'
          await axios.post('http://localhost:3001/image',
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
                {i18n.t('inShareModal.button1')}
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    {/* <ModalCloseButton /> */}
                    <ModalBody>
                        <Text >
                            {i18n.t('inShareModal.message')}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            {i18n.t('inShareModal.button2')}
                        </Button>
                        <a href={linkedinLink}>
                        <Button variant="ghost" colorScheme="blue" onClick={() => {
                            share();
                        }}>
                            {i18n.t('inShareModal.button1')}</Button>
                            </a>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}