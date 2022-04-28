import React from "react";

import {
    Flex,
    Text,
} from '@chakra-ui/react';
import { i18n } from "../translate/i18n";
class SideBarLoader extends React.Component {

    render() {
        return (
            < Flex textAlign="left" flexDirection="column" alignItems="left" paddingTop="1em" width="14.5em">
                <Text fontSize="sm">
                    {i18n.t('sideBarLoader.message')}
                </Text>
            </Flex>
        )
    }
}

export default SideBarLoader;