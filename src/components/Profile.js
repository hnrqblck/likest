import React from "react";

import { withRouter } from 'react-router-dom';

import {
    ChakraProvider,
    Flex,
    Text,
    Box,
    Button
} from '@chakra-ui/react';

import UserSession from '../components/UserSession';

import {
    strateegiaProjects,
    // strateegiaMissions,
    // strateegiaContents,
    // strateegiaConvergencePoints,
    // strateegiaCheckPoints,
    // strateegiaComments
} from '../api/StrateegiaData';

class Profile extends React.PureComponent {
    constructor() {
        super()
        this.state = {
            stData: []
        };
        this.full_name = UserSession.getName()

        this.handleClick = this.handleClick.bind(this)

        this.getStData = this.getStData.bind(this)

        this.getStData(UserSession.getToken())
    }

    async getStData(access_token) {
        try {
            const projects = await strateegiaProjects({ token: access_token });
            this.state.stData = projects;
            console.log(this.state.stData)
        } catch (e) {
            return e;
        }
    };

    handleClick() {

        UserSession.removeToken()
        UserSession.removeId()
        UserSession.removeName()

        this.props.history.push("/login");
    };

    render() {

        return (
            <ChakraProvider>
                {!UserSession.getToken() ? (

                    this.props.history.push("/login")

                ) : (
                <Flex width="full" height="100vh" alignContent="center" alignItems="center" justifyContent="center">

                    <Flex flexDirection="column" justifyContent="space-between">
                        <Text fontSize="2xl" paddingTop="0.4em" color="black">
                            Olá, {this.full_name}.
                        </Text>
                        <Box textAlign="center">
                            {/* <Text>{props.email} logged in!</Text> */}
                            <Button
                                width="full"
                                mt={4}
                                onClick={this.handleClick}>
                                Sign out
                            </Button>
                        </Box>

                    </Flex>
                </Flex>
                )}
            </ChakraProvider>
        );
    }
}

export default withRouter(Profile);
