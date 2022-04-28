import React from "react";

import {
    Flex,
    Text,
} from '@chakra-ui/react';
import { i18n } from "../translate/i18n";

class SideBarLinkedIn extends React.Component {

    render() {
        return (
            < Flex textAlign="left" flexDirection="column" alignItems="left" paddingTop="1em" width="14.5em">
                <Text>
                    {i18n.t('sideBarLinkedin.message')}
                </Text>
            </Flex>
        )
    }
}

export default SideBarLinkedIn;