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
import { i18n } from "../translate/i18n";
import axios from 'axios';

const SideBarCertificate = (props) => {

    function saveCertPng() {
        // const component = document.getElementById('cert');

        htmlToImage.toPng(document.getElementById('cert'), {
            canvasWidth: 1889,
            canvasHeight: 1153,
        })
            .then(png => {
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
                {i18n.t('sideBarCert.title')}
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
                    {i18n.t('sideBarCert.enablerCert')}
                    </FormLabel>
                </FormControl>
                {/* {backE} */}
            </>}


            <VStack spacing={0} align="stretch">

                <Divider />

                <Heading as="h6" size="xs" paddingY="1em">
                    {i18n.t('sideBarCert.linkedinHeading')}
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
                    {i18n.t('sideBarCert.downloadHeading')}
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
                    {i18n.t('sideBarCert.png')}
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
                    {i18n.t('sideBarCert.pdf')}
                </Button>
            </VStack>
        </Flex>
    )
}

export default SideBarCertificate;
