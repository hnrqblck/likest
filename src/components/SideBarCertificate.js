import React from "react";
import * as htmlToImage from 'html-to-image';
import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';
import {
    Flex,
    Text,
    Button,
    VStack,
    Heading,
    Divider,
    Switch,
    FormControl,
    FormLabel
} from '@chakra-ui/react';
import { TiSocialLinkedin } from 'react-icons/ti';
import { IoMdImage } from 'react-icons/io';
import { AiFillFileImage } from 'react-icons/ai';
import { InAddModal } from "./InAddModal";
import { InShareModal } from "./InShareModal";
import axios from 'axios';

const SideBarCertificate = (props) => {

    const [linkedinLink, setLinkedinLink] = React.useState('');
    const [img, setImg] = React.useState('');

    
    React.useEffect(() => {
        axios.get('http://localhost:3001/home').then(resp => setLinkedinLink(resp.data));
    }, [img])

    async function postImage(img) {
                
        try {
          await axios.post('http://localhost:3001/image',
        //   {
        //    Headers: {
        //         'Access-Control-Allow-Origin' : '*',
        //         'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //    } 
        //   },
           {
            img,
          })
        } catch (error) {
          console.log(error);
        }
      
      }

    function saveCertPng() {
        const component = document.getElementById('cert');

        htmlToImage.toPng(component, {
            canvasWidth: 1889,
            canvasHeight: 1153,
        })
            .then(png => {
                postImage(png);
                setImg(png)
                saveAs(png, 'Certificado_Strateegia.png');
            });
    }



    function saveCertPdf() {
        const component = document.getElementById('cert');
        const pdf_file = new jsPDF({
            hotfixes: ["px_scaling"],
            orientation: "landscape",
            unit: "px",
            format: [1889, 1153]
        });
        if (pdf_file) {
            htmlToImage.toPng(component, {
                canvasWidth: 1889,
                canvasHeight: 1153,
                pixelRatio: 1
            })
                .then(img => {
                    pdf_file.addImage(img, 'PNG', 0, 0);
                    pdf_file.save('Certificado_Strateegia.pdf');
                });
        }
    }

    return (
        < Flex textAlign="left" flexDirection="column" alignItems="left" width="13em" paddingTop="1em">
            <Text fontSize="sm" marginBottom="1em">
                Geramos o certificado baseado nas suas estatísticas de uso da plataforma strateegia.digital.
            </Text>
            <br />

            {props.has_mentorship === true && <>
                <FormControl display="flex" alignItems="center" marginBottom="1em">
                    {props.cert_type === 'participante' ? 
                    (
                    <Switch
                        id="modo-habilitador"
                        colorScheme="blue"
                        onChange={(e) => props.handleCertTypeUpdate()}

                    />
                    ):(
                        <Switch
                        defaultChecked
                        id="modo-habilitador"
                        colorScheme="blue"
                        onChange={(e) => props.handleCertTypeUpdate()}

                    />  
                    )
                }
                    <FormLabel htmlFor="modo-habilitador" mb="0" marginLeft="0.5em" fontSize="sm">
                        Certificado Habilitador
                    </FormLabel>
                </FormControl>
                {/* {backE} */}
            </>}


            <VStack spacing={0} align="stretch">

                <Divider />

                <Heading as="h6" size="xs" paddingY="1em">
                    Compartilhar no LinkedIn
                </Heading>

                <InAddModal
                    cert_type={props.cert_type}
                    cert_level_participante={props.cert_level.cert_level_participante}
                    cert_level_mentor={props.cert_level.cert_level_mentor}
                    issue_date={props.issue_date}
                />

                <InShareModal
                    
                    cert_type={props.cert_type}
                    cert_level_participante={props.cert_level.cert_level_participante}
                    cert_level_mentor={props.cert_level.cert_level_mentor}
                    issue_date={props.issue_date}
                />

                <Divider paddingTop="1em" />

                <Heading as="h6" size="xs" paddingY="1em">
                    Baixar certificado
                </Heading>

                <Button
                    colorScheme="blue"
                    size="sm"
                    mt={4}
                    variant="ghost"
                    onClick={saveCertPng}
                    width="12.3em"
                    justifyContent="flex-start"
                    leftIcon={<IoMdImage />}
                >
                    Arquivo PNG
                </Button>

                <Button
                    alignContent="start"
                    colorScheme="blue"
                    size="sm"
                    mt={4}
                    variant="ghost"
                    onClick={saveCertPdf}
                    width="12.3em" 
                    justifyContent="flex-start"
                    leftIcon={<AiFillFileImage />}
                >
                    Arquivo PDF
                </Button>
            </VStack>
        </Flex>
    )
}

export default SideBarCertificate;
